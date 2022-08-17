import React from "react";
import NavBar from "../components/nav/NavBar";

const GuidePage = () => {
    return (
        <>
        <NavBar></NavBar>
        <div className="contaienr" style={{"display":"flex", "justifyContent":"center", "margin":"50px"}}>
            <img src="/backimg2.png" alt="guide"  style={{width:'80%'}}></img>
        </div>
        </>
    )
};

export default GuidePage;