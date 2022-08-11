import './Music.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import songs from './songs.js'
import { ImPlay3, ImPause2, ImBackward2, ImForward3 } from "react-icons/im";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Music() {
  let [genre, setGenre] = useState(null)
 
        


  return (
    <div className="App">
        <Container>
          <Row>
            <Col className='lb-wrap'>
              <div className='lb-text'>
              <p>Hiphop</p>
              </div>
              <div className='lb-image'>
                <img onClick={()=>{
                  setGenre('hiphop')
                }} src='/18th.png'></img>
              </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Cyworld</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('cyworld')
        }} src='/18th.jpg'></img>
            </div>
            </Col>
          </Row>
          <Row>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Birthday</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('birthday')
        }} src='/18th.jpg'></img>
            </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Indie</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('independent')
        }} src='/18th.jpg'></img>
            </div>
            </Col>
          </Row>
          <Row>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Dance</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('dance')
        }} src='/18th.jpg'></img>
            </div>
            </Col>
            <Col className='lb-wrap'>
            <div className='lb-text'>
              <p>Jazz</p>
            </div>
            <div className='lb-image'>
              <img onClick={()=>{
          setGenre('jazz')
        }} src='/18th.jpg'></img>
            </div>
            </Col>
          </Row>
        </Container>
      {
        genre ? <Player genre={genre}/> : null
      }

    </div>
  );
}

function Player(props) {
  const videoList = songs[props.genre]
  const [idx, setIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(true)
  useEffect(()=>{
    if (isPlay) {
      document
        .querySelector('#ytVideo')
        .contentWindow.postMessage(
          '{"event":"command","func":"' + 'playVideo' + '","args":""}',
          '*',
        );
    } else {
      document
        .querySelector('#ytVideo')
        .contentWindow.postMessage(
          '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
          '*',
        );
    }
  }, [isPlay])
  const isPlayVideo = () => {
    setIsPlay(!isPlay)
  };

  return (
    <div className="Player">
      <iframe
          id='ytVideo'
          width='800px'
          height='500px'
          src={`https://www.youtube.com/embed/${videoList[idx]}?autoplay=1&mute=0&autohide='2'&modestbranding=1&enablejsapi=1&version=3&playerapiid=ytplayer`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
      ></iframe>
      <div>
        <ImBackward2 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx-1+videoList.length)%videoList.length)
          setIsPlay(true)
        }}></ImBackward2>

        {
          isPlay ? <ImPause2 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPause2> :
          <ImPlay3 size="24" className='Btn' style={{'margin':'10px'}} onClick={()=>{
            isPlayVideo()
          }}></ImPlay3>
        }

        <ImForward3 className='Btn' size="24" style={{'margin':'10px'}} onClick={()=>{
          setIdx((idx+1)%videoList.length)
          setIsPlay(true)
        }}></ImForward3>
      </div>
    </div>
  );
}

export default Music;


