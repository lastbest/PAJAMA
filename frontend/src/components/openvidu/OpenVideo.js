/*
index.html 에 있는 div id=emo 이거 필요합니다
ㄴ손 모션인식 시 움짤 출력하는 곳입니다

app.js에 이미지 경로 수정해야합니다(drawResult(hand))
 */
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import "./OpenVideo.css";
import UserVideoComponent from "./UserVideoComponent";
import Messages from "./Messages";
import FadeInOut from "../common/FadeInOut";
import Modal from 'react-bootstrap/Modal';

import html2canvas from "html2canvas";
import * as tf from "@tensorflow/tfjs";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as handdetection from "@tensorflow-models/hand-pose-detection";
tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

var publisher;
//모션캡처 온오프
let tracking = true;
// function toggleTraking() {
//   if (tracking) tracking = false;
//   else tracking = true;
// }

let emo = document.querySelector("#emo");
let video = document.querySelector("#video");

let detector, camera, stats;
let startInferenceTime,
  numInferences = 0;
let inferenceTimeSum = 0,
  lastPanelUpdate = 0;

//손가락 뒤집기 코드
let test_hand = 0; //손등 : 1, 손바닥 : 2, 손 안펴져있으면 : 0
let hand_timer = 0; //손 뒤집을때가지 시간
let hand_flip_cnt = 0; //손뒤집은횟수
let firework_timer = 0;

const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}; // 각 keypoint(손가락)을 이어주는 연결을 표현하기 위함

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isMobile() {
  //mobile인지 확인
  return isAndroid() || isiOS();
}

const OPENVIDU_SERVER_URL = "https://i7c203.p.ssafy.io:8447";
const OPENVIDU_SERVER_SECRET = "PAZAMA";

class OpenVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      messages: [],
      message: "",
      show: false,
      show2: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }
  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }
  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }
  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: "messages__item--operator",
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: "chat",
    });

    this.setState({
      message: "",
    });
  }

  sendmessageByEnter(e) {
    if (e.key === "Enter") {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: "messages__item--operator",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: "chat",
      });

      this.setState({
        message: "",
      });
    }
  }

  toggleShow() {

    if (this.state.show === false) {
      this.setState({show:true})
    } else {
      this.setState({show:false})
    }
  };


  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });
        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: "messages__item--visitor",
                },
              ],
            });
          }
        });
        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    publisher = undefined;
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const messages = this.state.messages;

    function cake1Show() {
      const cake1 = document.getElementById("cake1");
      const heart = document.getElementById("heart");
      const maincontainer = document.getElementById("main-container");
    
  
      if (cake1.style.display === "none") {
        cake1.style.display = "";
        heart.style.display = "";
        maincontainer.style.gridTemplateColumns = "15% 50% 15%"
        maincontainer.style.gridTemplateRows = "repeat(3, 33%)"

      } else {
        cake1.style.display = "none";
        heart.style.display = "none";
        maincontainer.style.gridTemplateColumns = "repeat(3, 25%)"
        maincontainer.style.gridTemplateRows = "repeat(2, 50%)"
      }
    }

    //오픈비두 필터
    function textOverlay() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "timeoverlay valignment=bottom halignment=right font-desc='Sans, 20'",
        })
        .then(() => {
          console.log("time added!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function higherPitch() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "pitch pitch=2",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function lowerPitch() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "pitch pitch=0.7",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function showHat() {
      publisher.stream.applyFilter("FaceOverlayFilter").then((filter) => {
        filter.execMethod("setOverlayedImage", {
          uri: "https://cdn.pixabay.com/photo/2013/07/12/14/14/derby-148046_960_720.png",
          offsetXPercent: "-0.2F",
          offsetYPercent: "-0.8F",
          widthPercent: "1.3F",
          heightPercent: "1.0F",
        });
      });
    }

    function filterTest() {
      publisher.stream
        .applyFilter("GStreamerFilter", {
          command: "bulge",
        })
        .then(() => {
          console.log("picth adjusted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function removeFilters() {
      publisher.stream
        .removeFilter()
        .then(() => {
          console.log("Filters removed");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
      <div>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="/pazamafont.png"
                alt="pajama logo"
                style={{"width":"200px", "height":"100px"}}
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="joinbtn"
                    name="commit"
                    type="submit"
                    value="참여하기"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div className="partyroom">
            <div className="header">
              <img src="/pazamafont.png" alt="logo" width="150px" height="75px"></img>
              <button className="navbtn" onClick={cake1Show}><img src="/birthday-cake.png" alt="logo" width="60px" height="60px"></img></button>
              <button className="navbtn" id="tstartbutton" onClick={this.takepicture}><img src="/camera.png" alt="logo" width="60px" height="60px"></img></button>
              <button className="navbtn"><img src="/music.png" alt="logo" width="60px" height="60px"></img></button>

            </div>
            <div id="session" className="main-session">
              <div id="main-container" className="main-container">
                {this.state.mainStreamManager !== undefined ? (
                  <div id="main-video" className="main-video">
                    <UserVideoComponent
                      streamManager={this.state.mainStreamManager}
                    />
                    {/* <input
                      className="btn btn-large btn-success"
                      type="button"
                      id="buttonSwitchCamera"
                      onClick={this.switchCamera}
                      value="Switch Camera"
                    /> */}
                  </div>
                ) : null}
  
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="stream-video"
                    id = "stream-video"
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}

                <img id="cake1" className="cake" src="/cake1.png" style={{"display":"none"}} alt="cake1"></img>
                <img id="heart" className="candle" src="/heart.png" style={{ display: "none",}} alt="heart" />
              </div>

              <div>
              {/* 하트초 */}
              <div className="text-center">
                <FadeInOut show={this.state.show2} duration={500}>
                  <img
                    id="heartfire"
                    src="/fire.gif"
                    style={{
                      width: "100px",
                      height: "100px",
                      "margin-left": "0px",
                      "margin-top": "-1050px",
                    }}
                    alt="fire"
                  />
                </FadeInOut>
              </div>
            </div>
            </div>
            <div className="main-footer">
              <div className="footer">
                {this.state.videostate === undefined || this.state.videostate
                  ? (this.state.videostate = true)
                  : (this.state.videostate = this.state.videostate)}
                <button
                  className="cam-btn"
                  id="buttonTurnCamera"
                  onClick={() => {
                    this.state.publisher.publishVideo(!this.state.videostate);
                    this.setState({ videostate: !this.state.videostate });
                  }}
                >{this.state.videostate ? <img className="camoff" src="/videocamoff.png"/> : <img className="camon" src="/videocamon.png"/> }</button>

                {this.state.audiostate === undefined || this.state.audiostate
                  ? (this.state.audiostate = true)
                  : (this.state.audiostate = this.state.audiostate)}
                <button
                  className="mic-btn"
                  id="buttonTurnAudio"
                  onClick={() => {
                    this.state.publisher.publishAudio(!this.state.audiostate);
                    this.setState({ audiostate: !this.state.audiostate });
                  }}
                >{this.state.audiostate ? <img className="micoff" src="/micoff.png"/> : <img className="micon" src="/micon.png"/>}</button>
                <button className="chatbtn" onClick={this.toggleShow}><img className="chat" src="chat.png" /></button>
                <buton id="buttonLeaveSession" onClick={this.leaveSession}><img className="leave" src="/shutdown.png"/></buton>
              </div>
            </div>
          </div>
        ) : null}
        {/* <div class="canvas-wrapper"></div> */}
        
        <Modal show={this.state.show} className="chatmodal" onHide={this.toggleShow}>
            <div>
              <div className="chatbox__support chatbox--active">
                <div style={{"text-align":"center"}}>
                  <img src="/pazamafont.png" alt="logo" width="80px" height="40px"></img>
                </div>

                <div className="chatbox__messages" ref="chatoutput">
                  <Messages messages={messages} />
                </div>

                <div className="chatbox__footer">
                  <input
                    id="chat_message"
                    className="chat_message"
                    type="text"
                    placeholder="메세지를 작성하세요."
                    onChange={this.handleChatMessageChange}
                    onKeyPress={this.sendmessageByEnter}
                    value={this.state.message}
                  />
                  <button
                    className="chatbox__send--footer"
                    onClick={this.sendmessageByClick}
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
        </Modal>
        
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        customSessionId: sessionId,
        kurentoOptions: {
          allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"],
        },
      });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      // var data = {};
      var data = JSON.stringify({
        kurentoOptions: {
          allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"],
        },
      });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  componentDidUpdate() {
    if (this.state.session === undefined);
    else apps();
  }

  //캡처기능
  takepicture() {
    const targetvideo = document.getElementById("session")
    // const targetvideo = document.querySelector("#localUser").querySelector("video");
    html2canvas(targetvideo).then((xcanvas) => {
      const canvdata = xcanvas.toDataURL("image/png");
      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 200);
      photo.setAttribute("height", 100);
      document.body.appendChild(photo);
    });
  }
}

//카메라 클래스
//class camera
class Camera {
  constructor() {
    // const luser = document.querySelector("#localUser");
    //   this.video = luser.querySelector("video");
    this.video = document.querySelector("video");

    // this.video = document.getElementById("video"); //video id를 가진 HTML code의 element 가져옴
    this.canvas = document.getElementById("output");
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   */
  static async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }

    const $size = { width: 640, height: 480 }; //desktop용 사이즈
    const $m_size = { width: 360, height: 270 }; //mobile용 사이즈
    const videoConfig = {
      audio: false,
      video: {
        facingMode: "user",
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        width: isMobile() ? $m_size.width : $size.width,
        height: isMobile() ? $m_size.height : $size.height,
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    const camera = new Camera();
    camera.video.srcObject = stream; //Webcam의 live stream을 video id 가진 HTML 코드의 video element에 할당

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(video);
      };
    });

    camera.video.play();

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    //canvas는 나중에 detection result를 그리는데 사용 됨
    camera.canvas.width = videoWidth; //videoWidth와 일치시켜 detection result가 video cam 위에 맵핑되도록 함
    camera.canvas.height = videoHeight;
    const canvasContainer = document.querySelector(".canvas-wrapper");
    canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`; //css 부분도 video cam과 같은 크기로 할당

    // Because the image from camera is mirrored, need to flip horizontally.
    //기본적으로 camera가 mirroring 되어있으므로 horizontal flipping 함
    camera.ctx.translate(camera.video.videoWidth, 0);
    camera.ctx.scale(-1, 1);

    return camera;
  }

  //웹알티씨  비디오가 있으므로 비디오 그릴필요 없음!
  drawCtx() {
    // this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints on the video.
   * @param hands A list of hands to render.
   */
  drawResults(hands) {
    // Sort by right to left hands.
    hands.sort((hand1, hand2) => {
      if (hand1.handedness < hand2.handedness) return 1;
      if (hand1.handedness > hand2.handedness) return -1;
      return 0;
    });

    // Pad hands to clear empty scatter GL plots.
    while (hands.length < 2) hands.push({});

    //내 비디오를 캔버스에 안 그리므로 잔상이 자꾸남아서 클리어
    this.clearCtx();

    for (let i = 0; i < hands.length; ++i) {
      this.drawResult(hands[i]); //detection된 모든 hand 모두에 대해
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param hand A hand with keypoints to render.
   * @param ctxt Scatter GL context to render 3D keypoints to.
   */
  drawResult(hand) {
    if (hand.keypoints != null) {
      this.drawKeypoints(hand.keypoints, hand.handedness);
      const emo_type = this.drawEmoticon(hand.keypoints); //keypoints를 parsing해서 emo_type을 반환한다.

      if (emo_type == "v") {
        //v포즈 취할 경우
        emo.innerHTML = '<img src="/v.jpg" width="300" height="300">';
      } else if (emo_type == "heart") {
        //손꾸락하트
        emo.innerHTML = '<img src="/heart.gif" width="300" height="300">';
      } else if (emo_type == "test") {
        emo.innerHTML = '<img src="/test.gif" width="300" height="300">';
        // console.log("emo test" + firework_timer);
      } else if (firework_timer > 0) {
        // console.log("emo ft" + firework_timer);
        emo.innerHTML = '<img src="/test.gif" width="300" height="300">';
      } else {
        //이외일 경우 아무것도 보여주지 않음
      }
    }
  }
  drawEmoticon(keypoints) {
    //손 모양 코드 y축, 위에서 아래로 값 커짐
    const keypointsArray = keypoints;

    const thumb_tip = keypointsArray[4].y;
    const thumb_ip = keypointsArray[3].y;
    const thumb_mcp = keypointsArray[2].y;
    const index_finger_tip = keypointsArray[8].y;
    const index_finger_pip = keypointsArray[6].y;
    const index_finger_mcp = keypointsArray[5].y;
    const middle_finger_tip = keypointsArray[12].y;
    const middle_finger_pip = keypointsArray[10].y;
    const ring_finger_tip = keypointsArray[16].y;
    const ring_finger_pip = keypointsArray[14].y;
    const pinky_finger_tip = keypointsArray[20].y;
    const pinky_finger_pip = keypointsArray[18].y;

    if (
      index_finger_tip < index_finger_pip &&
      middle_finger_tip < middle_finger_pip &&
      ring_finger_tip > middle_finger_pip &&
      pinky_finger_tip > middle_finger_pip &&
      thumb_tip < ring_finger_tip
    ) {
      return this.hand_motion(keypoints, "1"); //v
    } else if (
      thumb_tip < thumb_mcp &&
      index_finger_tip < index_finger_pip &&
      index_finger_pip < index_finger_mcp &&
      middle_finger_tip > middle_finger_pip &&
      ring_finger_tip > ring_finger_pip &&
      pinky_finger_tip > pinky_finger_pip
    ) {
      return this.hand_motion(keypoints, "2"); //손꾸락 하트
    } else if (
      thumb_tip < thumb_ip &&
      index_finger_tip < index_finger_pip &&
      middle_finger_tip < middle_finger_pip &&
      ring_finger_tip < ring_finger_pip &&
      pinky_finger_tip < pinky_finger_pip
    ) {
      return this.hand_motion(keypoints, "3"); //손 펴진거
    } else {
      return "none";
    }
  }

  hand_motion(keypoints, type) {
    //손 모양 코드 x축
    const keypointsArray = keypoints;
    // for x axis
    const thumb_ip = keypointsArray[3].x;
    const thumb_tip = keypointsArray[4].x;
    const index_finger_mcp = keypointsArray[5].x;
    const index_finger_pip = keypointsArray[6].x;
    const index_finger_tip = keypointsArray[8].x;
    const middle_finger_tip = keypointsArray[12].x;
    const pinky_finger_pip = keypointsArray[18].x;
    const pinky_finger_tip = keypointsArray[20].x;

    // if (hand_flip_cnt != 0 || hand_timer != 0) console.log(hand_flip_cnt + " " + hand_timer);
    if (hand_flip_cnt >= 10) {
      hand_timer = 0;
      test_hand = 0;
      hand_flip_cnt = 0;
      firework_timer = 100; //이거 양수이면 불꽃놀이 계속 보입니다
      console.log("flip cnt" + firework_timer);
      return "test";
    }

    if (
      //type 1 start
      (thumb_tip > index_finger_tip && thumb_tip < pinky_finger_pip) ||
      (thumb_tip < index_finger_tip && thumb_tip > pinky_finger_pip)
    ) {
      if (type == "1") {
        return "v";
      }
    } //type 1 end
    else if (
      //type 2 start
      (thumb_tip > index_finger_tip &&
        thumb_tip < index_finger_mcp &&
        thumb_ip - index_finger_pip < 20) ||
      (thumb_tip < index_finger_tip &&
        thumb_tip > index_finger_mcp &&
        index_finger_pip - thumb_ip < 20)
    ) {
      if (type == "2") {
        return "heart";
      }
    } //type 2 end
    else if (
      //손바닥 펴져있을때
      //type 3 start
      (thumb_tip < middle_finger_tip && middle_finger_tip < pinky_finger_tip) ||
      (thumb_tip > middle_finger_tip && middle_finger_tip > pinky_finger_tip)
    ) {
      return this.hand_turn(keypoints, "palm");
    } //type 3 end
    else {
      //이더저도아닐때
      // if (firework_timer > 0) return "test";
      return "none";
    }
  }
  hand_turn(keypoints, check) {
    const keypointsArray = keypoints;
    const timer_limit = 30;

    const thumb_ip = keypointsArray[3].x;
    const middle_finger_pip = keypointsArray[10].x;
    const pinky_finger_pip = keypointsArray[18].x;

    //손바닥
    if (
      check == "palm" &&
      thumb_ip < middle_finger_pip &&
      middle_finger_pip < pinky_finger_pip
    ) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 1;
      } else if (test_hand == 2 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt++;
        test_hand = 1;
      }
    }

    //손등
    if (
      check == "palm" &&
      thumb_ip > middle_finger_pip &&
      middle_finger_pip > pinky_finger_pip
    ) {
      if (test_hand == 0) {
        hand_timer = timer_limit;
        test_hand = 2;
      } else if (test_hand == 1 && hand_timer > 0) {
        hand_timer = timer_limit;
        hand_flip_cnt++;
        test_hand = 2;
      }
    }
    return "none";
  }

  //이거 쓰는거 맞음???????????
  is_up_or_down(keypoints, is_up) {
    //손 모양 코드 x축
    const keypointsArray = keypoints;
    // for x axis
    const wrist = keypointsArray[0].x;
    const index_finger_pip = keypointsArray[6].x;
    const index_finger_tip = keypointsArray[8].x;
    const ring_finger_pip = keypointsArray[14].x;
    const ring_finger_tip = keypointsArray[16].x;

    if (
      (wrist > index_finger_pip &&
        index_finger_tip > index_finger_pip &&
        ring_finger_tip > ring_finger_pip) ||
      (wrist < index_finger_pip &&
        index_finger_tip < index_finger_pip &&
        ring_finger_tip < ring_finger_pip)
    ) {
      if (is_up == true) {
        console.log("x축, true");
        console.log("index_finger_tip : " + index_finger_tip);
        console.log("index_finger_pip : " + index_finger_pip);
        return "up";
      } else {
        console.log("x축, false");
        console.log("index_finger_tip : " + index_finger_tip);
        console.log("index_finger_pip : " + index_finger_pip);
        return "down";
      }
    } else {
      return "none";
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   * @param handedness Label of hand (either Left or Right).
   */
  drawKeypoints(keypoints, handedness) {
    const keypointsArray = keypoints;
    this.ctx.fillStyle = handedness === "Left" ? "Red" : "Blue"; //왼손, 오른손에 따라 색 구분
    this.ctx.strokeStyle = "White"; //keypoints를 이어주는 색을 흰색으로
    this.ctx.lineWidth = 2;

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i].x;
      const x = keypointsArray[i].y;
      this.drawPoint(x - 2, y - 2, 3);
    }

    const fingers = Object.keys(fingerLookupIndices);
    for (let i = 0; i < fingers.length; i++) {
      const finger = fingers[i];
      const points = fingerLookupIndices[finger].map((idx) => keypoints[idx]); //기준 keypoint와 연결된 keypoint들을 맵핑
      this.drawPath(points, false);
    }
  }

  drawPath(points, closePath) {
    //hand keypoints끼리 연결된 경우 연결(path)을 시각화
    const region = new Path2D();
    region.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point.x, point.y); //points[0]과 연결된 points[1:]의 path를 그림
    }
    if (closePath) {
      region.closePath();
    }
    this.ctx.stroke(region);
  }

  drawPoint(y, x, r) {
    // hand keypoint(Point)을 시각화
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

async function createDetector() {
  const hands = handdetection.SupportedModels.MediaPipeHands; //MediaPipe에서 제공하는 hand pose detection model 사용
  return handdetection.createDetector(hands, {
    runtime: "tfjs", //runtime을 tfjs로 설정함에 따라 webGL을 default로 사용함
    modelType: "full", //full(큰 모델) or lite(작은 모델)
    maxHands: 1, // or 2~10 : detect 할 손의 개수
  });
}

async function renderResult() {
  if (camera.video.readyState < 2) {
    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(video);
      };
    });
  }

  let hands = null;

  if (detector != null) {
    try {
      hands = await detector.estimateHands(camera.video, {
        flipHorizontal: false, //hand pose detection 결과를 hands에 반환
      });
    } catch (error) {
      detector.dispose(); //detector에 대한 tensor memory를 없앰
      detector = null;
      alert(error);
    }
  }

  //손바닥 뒤집기 타이머
  if (hand_timer > 0) {
    hand_timer--;
  } else if (hand_timer <= 0) {
    test_hand = 0;
    hand_flip_cnt = 0;
    hand_timer = 0;
  }
  if (firework_timer > 0) {
    firework_timer--;
    console.log("ft>0" + firework_timer);
    if (firework_timer == 0) {
      emo.innerHTML = "<p></p>";
    }
  }

  // camera.drawCtx();

  if (hands && hands.length > 0 && tracking) {
    camera.drawResults(hands); //detection 결과인 hands를 인자로 결과를 visualize 하는 drawResults 실행
  } else {
    camera.clearCtx();
  }
}

async function renderPrediction() {
  await renderResult();

  let rafId = requestAnimationFrame(renderPrediction); //실시간으로 renderPrediction을 계속 실행
}

async function apps() {
  const tfcanvas = document.createElement("canvas");
  tfcanvas.setAttribute("id", "output");
  // tfcanvas.style.cssText = "display:none;";
  // document.body.appendChild(tfcanvas);

  //   const canvwrapper = document.createElement("div");
  //   canvwrapper.setAttribute("class", "canvas-wrapper");
  //   document.body.appendChild(canvwrapper);
  document.querySelector(".canvas-wrapper").appendChild(tfcanvas);
  // document.querySelector("#layout").appendChild(tfcanvas);

  camera = await Camera.setupCamera(); //webcam 셋팅
  console.log(tf.getBackend());
  detector = await createDetector(); //hand pose detection model 셋팅
  console.log(tf.getBackend()); //사용되는 TensorFlow.js backend 확인
  renderPrediction(); //detection을 통한 result를 draw
}

export default OpenVideo;
