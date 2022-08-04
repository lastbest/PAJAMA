import React, { useState } from 'react';
import NavBar from '../components/nav/NavBar';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";
import './CreatePartyPage.css';
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";


const CreateBtn = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledBtn = styled.button`
    text-align:center;
    width: 200px;
    height: 70px;
    border: none;
    border-radius: 15px;
    font-size: 25px;
    font-weight: bold;
    font-family:'BRITANIC';
    outline: none;
    cursor: pointer;
    background: #FD7A99;
    &:hover {
        background: #FFA4BD;
    }
    margin: 2rem;
`

const CreateFormBlock = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(6, 1fr);
    margin-top: 2rem;
    margin-left: 5rem;
    h5 {
        margin: 0;
        color: black;
        font-family:"oldpicture";
        padding-bottom: 0.5rem;
    }
    .item1 {
        grid-column-start:1;
        grid-column-end:3;
    }
    .item2 {
        grid-column-start:4;
        grid-column-end:7;
    }
    .item3 {
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:2;
    }
    .item4 {
        grid-column-start:1;
        grid-column-end:7;
        grid-row-start:3;
        grid-row-end:5;
    }
    .item5 {
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:5;
        grid-row-end:7;
    }
    .item6 {
        grid-column-start:4;
        grid-column-end:7;
        grid-row-start:5;
        grid-row-end:7;
    }
`;

const StyledInput = styled.input`
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ffe9ef;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    outline: none;
    width: 100%;
    display: flex;
    background-color: #FDF1F3;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid #fd7a99;
    }
`;

const StyledTextArea = styled.textarea`
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ffe9ef;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    outline: none;
    width: 100%;
    display: flex;
    background-color: #FDF1F3;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid #fd7a99;
    }
    margin-bottom:2rem;
`;

const Pinkbox = styled.div`
    padding: 2rem;
    width: 100%;
    height:80%;
    background: #FDF1F3;
    border-radius: 10px;
`;


const CreatePartyPage = () => {
    const [partyName, setPartyName] = useState('')
    const [partyContent, setPartyContent] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [backImg, setBackImg] = useState(null)
    const [cakeImg, setCakeImg] = useState(null)
    const [candleImg, setCandleImg] = useState(null)
    const [info, setInfo] = useState({partyName:'', partyContent:'',startDate: null, backImg:'', cakeImg:'', candleImg:''})
    return (
        <>
        <NavBar></NavBar>
        <div class="container">
            <CreateFormBlock>
                <div class="item1">
                    <h5>파티 이름</h5>
                    <StyledInput onInput={(e)=>{
                        setPartyName(e.target.value)
                    }}
                    autoComplete="partyname"
                    name="partyname"
                    placeholder=" PARTY NAME"
                    />
                </div>
                <div class='item2'>
                    <h5>날짜 선택</h5>
                    <DatePicker
                        className='pointer'
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="yyyy/MM/dd eee, aa h:mm"
                        locale={ko}
                        minDate={new Date()}
                        customInput={
                        <Form.Control as="textarea" rows={1} style={{width:"250px"}}/>
                        }
                    />
                </div>
                <div class='item3'>
                    <h5>파티 내용</h5>
                    <StyledTextArea onInput={(e)=>{
                        setPartyContent(e.target.value)
                    }}
                    autoComplete="partydetail"
                    name="partydetail"
                    placeholder=" PARTY DETAIL"
                    />
                </div>
                <div class="item4">
                    <h5>배경 선택</h5>
                    <Pinkbox className='d-flex justify-content-around'>
                        <input 
                        type="radio" name="back"
                        id="back0" className='input-hidden'
                        />
                        <label className='itemBox' for="back0">
                                <img className='pointer' src='/frame1.png' style={{'width':'250px'}} onClick={()=>{
                                    setBackImg(0)
                                }}></img>
                                <FiCheckCircle id='itemImg' className='backCheckIcon'/>
                        </label>

                        <input 
                        type="radio" name="back"
                        id="back1" className='input-hidden'
                        />
                        <label className='itemBox' for="back1">
                                <img className='pointer' src='/frame2.png' style={{'width':'250px'}} onClick={()=>{
                                    setBackImg(1)
                                }}></img>
                                <FiCheckCircle id='itemImg' className='backCheckIcon'/>
                        </label>

                        <input 
                        type="radio" name="back"
                        id="back2" className='input-hidden'
                        />
                        <label className='itemBox' for="back2">
                                <img className='pointer' src='/frame3.png' style={{'width':'250px'}} onClick={()=>{
                                    setBackImg(2)
                                }}></img>
                                <FiCheckCircle id='itemImg' className='backCheckIcon'/>
                        </label>
                    </Pinkbox>
                </div>
                <div class="item5">
                    <h5>케이크 선택</h5>
                    <Pinkbox className='d-flex justify-content-between'>
                        <input 
                        type="radio" name="cake"
                        id="cake0" className='input-hidden'
                        />
                        <label className='itemBox' for="cake0">
                            <img className='pointer' src='/cake1.png' style={{'width':'160px'}} onClick={()=>{
                                setCakeImg(0)
                            }}></img>
                            <FiCheckCircle id='itemImg' className='cake0CheckIcon' />
                        </label>

                        <input 
                        type="radio" name="cake"
                        id="cake1" className='input-hidden'
                        />
                        <label className='itemBox' for="cake1">
                            <img className='pointer' src='/cake2.png' style={{'width':'160px'}} onClick={()=>{
                                setCakeImg(1)
                            }}></img>
                            <FiCheckCircle id='itemImg' className='cake1CheckIcon' />
                        </label>
                    </Pinkbox>
                </div>
                <div class="item6">
                    <h5>초 선택</h5>
                    <Pinkbox className='d-flex justify-content-around align-items-center'>
                        <input 
                        type="radio" name="candle"
                        id="candle0" className='input-hidden'
                        />
                        <label className='itemBox' for="candle0">
                            <img className='pointer' src='/iloveyou.png' style={{'width':'100px', 'height':'130px'}} onClick={()=>{
                                setCandleImg(0)
                            }}></img>
                            <FiCheckCircle id='itemImg' className='candle0CheckIcon' />
                        </label>

                        <input 
                        type="radio" name="candle"
                        id="candle1" className='input-hidden'
                        />
                        <label className='itemBox' for="candle1">
                            <img className='pointer' src='/heart.png' style={{'width':'100px', 'height':'130px'}} onClick={()=>{
                                setCandleImg(1)
                            }}></img>
                            <FiCheckCircle id='itemImg' className='candle1CheckIcon' />
                        </label>

                        <input 
                        type="radio" name="candle"
                        id="candle2" className='input-hidden'
                        />
                        <label className='itemBox' for="candle2">
                            <img className='pointer' src='/18th.png' style={{'width':'100px', 'height':'130px'}} onClick={()=>{
                                setCandleImg(2)
                            }}></img>
                            <FiCheckCircle id='itemImg' className='candle2CheckIcon' />
                        </label>
                    </Pinkbox>
                </div>
            </CreateFormBlock>
        </div>
        <div class="container">
        </div>
        <CreateBtn>
            {/* <a href='/room'> */}
                <StyledBtn onClick={()=>{
                setInfo(info.partyName=partyName);
                setInfo(info.partyContent=partyContent);
                setInfo(info.backImg=backImg);
                setInfo(info.cakeImg=cakeImg);
                setInfo(info.candleImg=candleImg);
                setInfo(info.startDate=startDate);
                axios({
                    url:"https://i7c203.p.ssafy.io:8082",
                    method: 'post',
                    data: info
                })
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                    console.log(info)
                })
            }}>CREATE PARTY</StyledBtn>
            {/* </a> */}
        </CreateBtn>
        </>
    )
};

export default CreatePartyPage;