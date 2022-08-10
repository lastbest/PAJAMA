import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useEffect, useState } from "react";
import "./OpenVideo.css";
import UserVideoComponent from "./UserVideoComponent";
import Messages from "./Messages";
import FadeInOut from "../common/FadeInOut";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { connect, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount, testReducer } from "../../counterSlice";

import html2canvas from "html2canvas";
import * as tf from "@tensorflow/tfjs";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as handdetection from "@tensorflow-models/hand-pose-detection";
tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

//rtk 관련코드
const mapStateToProps = (state) => ({
  count: state.counter.value,
});
const mapDispatchToProps = { increment, decrement, incrementByAmount, testReducer };
var tsession;

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

//카메라 클래스
//class camera
class Camera extends Component {
  // mySession = undefined;
  constructor(props) {
    super(props);
    // const luser = document.querySelector("#localUser");
    //   this.video = luser.querySelector("video");
    this.video = document.querySelector("video");
    console.log("컨스트럭터실행");

    // this.video = document.getElementById("video"); //video id를 가진 HTML code의 element 가져옴
    this.canvas = document.getElementById("output");
    this.ctx = this.canvas.getContext("2d");
    // this.mySession = this.props.count;
    // this.mySession = this.props.count;
    // this.drawResults = this.drawResults.bind(this);
    // this.drawResult = this.drawResult.bind(this);
    // renderResult = renderResult.bind(this);
    // renderPrediction = renderPrediction(this);
  }

  componentDidMount() {
    apps();
    console.log("mount========================");
    console.log(this.props.count);
    this.mySession = this.props.count;
    // this.mySession = 10;
    tsession = this.props.count;
    this.state = {
      ts: 10,
    };
    console.log(this.state);
  }
  componentDidUpdate() {
    console.log("update========================");
    console.log(this.props.count);
    this.mySession = this.props.count;
    // this.state
    this.setState({
      stest: "123",
    });
    console.log(this.state);
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   */
  static async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
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
  drawResults = (hands) => {
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
  };

  /**
   * Draw the keypoints on the video.
   * @param hand A hand with keypoints to render.
   * @param ctxt Scatter GL context to render 3D keypoints to.
   */
  drawResult = (hand) => {
    if (hand.keypoints != null) {
      this.drawKeypoints(hand.keypoints, hand.handedness);
      const emo_type = this.drawEmoticon(hand.keypoints); //keypoints를 parsing해서 emo_type을 반환한다.

      if (emo_type == "v") {
        //v포즈 취할 경우
        // const counts = useSelector((state) => state.counter);
        // const { count } = this.props;
        // let testser = this.props.count;
        // const mySession = this.props.count;
        // console.log(this.mySession);
        // console.log(this.props.count);
        // console.log(session_render);
        console.log(this.state);
        emo.innerHTML = '<img src="/v.jpg" width="300" height="300">';
      } else if (emo_type == "heart") {
        //손꾸락하트
        console.log("하또");
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
  };
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
    if (check == "palm" && thumb_ip < middle_finger_pip && middle_finger_pip < pinky_finger_pip) {
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
    if (check == "palm" && thumb_ip > middle_finger_pip && middle_finger_pip > pinky_finger_pip) {
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

  render() {
    return <div>{/* <h1>Count is {this.props.count}</h1> */}</div>;
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
  //굳이 이렇게 안하고 index.html에 만들어놓고 display: none할래요
  // const tfcanvas = document.createElement("canvas");
  // tfcanvas.setAttribute("id", "output");
  // document.querySelector(".canvas-wrapper").appendChild(tfcanvas);

  console.log("apps실행");
  camera = await Camera.setupCamera(); //webcam 셋팅
  console.log(tf.getBackend());
  detector = await createDetector(); //hand pose detection model 셋팅
  console.log(tf.getBackend()); //사용되는 TensorFlow.js backend 확인
  renderPrediction(); //detection을 통한 result를 draw
}

// apps();

// export default Camera;
export default connect(mapStateToProps, mapDispatchToProps)(Camera);
