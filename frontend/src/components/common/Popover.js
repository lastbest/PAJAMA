import React from 'react';
import { Popover, OverlayTrigger, Image } from 'react-bootstrap';
import "./Popover.css"



const popover = (
    <Popover className="popover">
        <img src="/frame1.png" className='frame'></img>
        <div className="bar">
            <p className='text5'>최대 5장까지 저장할 수 있습니다.</p>
            <button className="downloadbtn"><img className='download' src="/download.png" alt="download"/></button>
            <button className="trashbtn"><img className='trash' src="/trash.png" alt="trash"/></button>
        </div>
    </Popover>
 );

 const popover2 = (
    <Popover className="popover2">
        <button className="voicebtn"><img className='voice1' src="/arrow-up.png" alt="voice1"/></button>
        <button className="voicebtn"><img className='voice2' src="/down-arrow.png" alt="voice2"/></button>
        <button className="voicebtn"><img className='voice3' src="/mic2.png" alt="voice3"/></button>
        <button className="voicebtn"><img className='voice4' src="/voiceoff.png" alt="voice4"/></button>
    </Popover>
 );

const PopoverPage = () => {
     return (
        <>
        <div className='mainpage'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Image className="capture" src="/pazamalogo.png" alt="capture" style={{width:'150px',height:"75px"}}/>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="top" overlay={popover2}>
                <Image className="voice" src="/voice.png" alt="voice" style={{width:'75px',height:"75px"}}/>
            </OverlayTrigger>
        </div>
        </>
     );
    }

export default PopoverPage;