import React from 'react'
import { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../components/menu/Menu';
import ListGroup from 'react-bootstrap/ListGroup';
import { PersonCircle } from 'react-bootstrap-icons';
import './Mypage.css'



function Mypage() {



  return (
    <div>
      <div style={{display:'flex'}}>
      <div style={{width:'250px',margin:'30px 30px'}}>
         <ListGroup defaultActiveKey='/mypage'>
          <ListGroup.Item action href='/mypage'>
            마이페이지
          </ListGroup.Item>
          <ListGroup.Item action href='/courses'>
            내 코스 목록
          </ListGroup.Item>
          <ListGroup.Item action href='/scraps'>
           내 찜 목록
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className='background-container' id='mypage_background'>
       <div className='overlay-container'>

       <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        height:'50px',
        borderBottom: '1px solid gray'
        }}>내 정보
      </div>
      <div style={{display:'flex'}}>
      <PersonCircle fontSize={100} style={{margin:'60px 50px'}}color='gray'/>
     <div style={{margin:"40px 20px"}}>
      <div  style={{marginBottom: "10px"}}> 아이디 : 이주영</div>
      <div  style={{marginBottom: "10px"}}> 닉네임 : 이주영</div>
      <div  style={{marginBottom: "10px"}}> 이메일 : jjyy0804@naver.com</div>
      <div  style={{marginBottom: "10px"}}> 가입일자 : 2023-04-13</div>
      <div  style={{marginBottom: "10px"}}> 내 취향 : 로맨틱한 <button  style={{
                                                                color:"#1E90FF",
                                                                backgroundColor:'white',
                                                                border:'solid',
                                                                borderColor:'#1E90FF',
                                                                borderRadius:'10px',
                                                                borderWidth:'0.5px'
                                                            }}>수정</button></div>
      </div>
      </div>
      <div style={{margin:"50px 50px"}}>
       <button 
       style={{
                color:"red",
                backgroundColor:'white',
                border:'solid',
                borderColor:'red',
                borderRadius:'10px',
                borderWidth:'0.5px'
               }}
       > 
       회원탈퇴
       </button>
      </div>

    </div>    
      </div>
      </div>

    </div>
    
  )
}

export default Mypage;