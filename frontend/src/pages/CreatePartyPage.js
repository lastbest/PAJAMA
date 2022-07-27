import React, { useState } from 'react';
import NavBar from '../components/nav/NavBar';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";
import './CreatePartyPage.css';

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

const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
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
    );
  };

const CreatePartyPage = () => {
    return (
        <>
        <NavBar></NavBar>
        <div class="container">
            <CreateFormBlock>
                <div class="item1">
                    <h5>파티 이름</h5>
                    <StyledInput
                    autoComplete="partyname"
                    name="partyname"
                    placeholder=" PARTY NAME"
                    />
                </div>
                <div class='item2'>
                    <h5>날짜 선택</h5>
                    <DatePickerComponent />
                </div>
                <div class='item3'>
                    <h5>파티 내용</h5>
                    <StyledTextArea
                    autoComplete="partydetail"
                    name="partydetail"
                    placeholder=" PARTY DETAIL"
                    />
                </div>
                <div class="item4">
                    <h5>배경 선택</h5>
                    <Pinkbox />
                </div>
                <div class="item5">
                    <h5>케이크 선택</h5>
                    <Pinkbox />
                </div>
                <div class="item6">
                    <h5>초 선택</h5>
                    <Pinkbox />
                </div>
            </CreateFormBlock>
        </div>
        <div class="container">
        </div>
        <CreateBtn>
            <a href='/room'><StyledBtn>CREATE PARTY</StyledBtn></a>
        </CreateBtn>
        </>
    )
};

export default CreatePartyPage;