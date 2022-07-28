import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../components/nav/NavBar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

const FeedPage = () => {
    let [selected, setSelected] = useState(null)
    return (
        <div>
            <NavBar />
            <SelectPicture /><br></br>
            <FeedAdd />
        </div>
    )
};

function SelectPicture () {
    return (
        <div>
            <h2 className='text-center m-4'>사진 선택하기</h2>
            <div className='container text-center'>
                <img 
                className='m-2 w-25'
                src='https://img.etoday.co.kr/pto_db/2016/05/20160517052708_871885_540_536.JPG'></img>
                <img 
                className='m-2 w-25'
                src='https://img.etoday.co.kr/pto_db/2016/05/20160517052708_871885_540_536.JPG'></img>
                <img
                className='m-2 w-25' 
                src='https://img.etoday.co.kr/pto_db/2016/05/20160517052708_871885_540_536.JPG'></img>
            </div>
            <div className='container text-center mb-4 mt-4'>
                <Button variant="primary" size='lg'>선택완료</Button>{' '}
            </div>
        </div>
    )
}

function FeedAdd () {
    return (
        <div>
            <h2 className='text-center m-4'>피드 추가하기</h2>
            <Carousel className='container w-25' variant='dark' interval={null}>
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/frame1.jpg"
                        alt="First slide"
                    />
                    </Carousel.Item >
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/frame2.jpg"
                        alt="Second slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/frame3.jpg"
                        alt="Third slide"
                    />
                    </Carousel.Item>
            </Carousel>
            <div className='container text-center mb-4 mt-4'>
                <Button size='lg' variant="primary">피드 추가</Button>{' '}
            </div>
        </div>
    )
}


export default FeedPage;