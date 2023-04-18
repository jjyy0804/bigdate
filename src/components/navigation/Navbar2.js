import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-modal';
import axios from 'axios';
import { useState,useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import NaverLogin from 'react-naver-login';

import './Navbar2.css';
import '../login/LoginModal.css';

Modal.setAppElement('#root');

const Navbar2=() =>{
  {/**모달 띄우기 상태 */}
  const [modalIsOpen, setModalIsOpen] = useState(false);


  {/**로그인 상태 */}
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');
  }, []);

  {/**모달이 오픈되었을 때 모달 오픈 상태 true로 셋팅 */}
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  {/**모달이 닫혔을 때 모달 오픈 상태 false로 셋팅 */}
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  {/**로그인 시 */}
  const handleLogin = () =>{
    localStorage.setItem("isLoggedIn",'true')
    setIsLoggedIn(true);
    console.log(isLoggedIn);
   
  };

  {/**로그아웃 시 */}
  const handleLogout = () => {
    console.log(isLoggedIn);
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
    {/* axios로 서버에 logout 요청하기?  */}
  };

  {/**카카오 로그인 성공 시 */}
  const onSuccess_kakao = (response) => {
    handleLogin();

    console.log(response);
    console.log(response.profile.properties.nickname);
    console.log(response.profile.kakao_account.email);
    console.log( response.profile.id);
   
    

    {/* axios로 서버에 nickname,email,id post하기*/}

    handleModalClose();

  };

  


  {/**네이버 로그인 성공 시 */}
  const onSuccess_naver = (response) => {
    
    handleLogin();

    console.log(response);
    console.log(response.nickname);
    console.log(response.email);
    console.log(response.id);
 

    {/* axios로 서버에 nickname,email,id post하기*/}

    handleModalClose();

  };


  
  return (
    <>
    
      <Navbar collapseOnSelect className='navbar'>
        <Container id='content'>
          <Navbar.Brand href='/' id='logo'>
            그때 그때
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/post'>커뮤니티</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='/mypage'>마이페이지</Nav.Link>
             
              <Nav.Link onClick={() => {
                handleLogout()
                  if (isLoggedIn) {
                    handleModalClose();
                  } else {
                    handleModalOpen();
                  }
                }}>
                   {isLoggedIn ? (
                    <button>로그아웃</button>
                  ) : (
                    <button>로그인</button>
                  )}
                              
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*로그인 모달창 */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} 
    style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', //모달창 제외한 화면 어둡게
          },
        content: {
          width: '25%', // 모달 내용의 가로 크기
          height: '30%', // 모달 내용의 세로 크기
          margin: 'auto', // 모달 내용을 가운데로 정렬하기 위한 margin
          borderRadius:'20px' //모달창 테두리 

        },
       
      }}>

   
      <div className='login'>
         로그인
      </div>

      
      <div className='login_button'>

      <div>
      <KakaoLogin
        token="65f698fdd616a8aeadad8c119ff3c154"
        onSuccess={onSuccess_kakao}
        onFail={(err) => console.log(err)}
        useLoginForm={false}
        render={(props) => (
            <img className='login_img' src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F996E15375C3D83CA20" alt="kakao login"  
             onClick={() => {
              props.onClick();
          
            }}/>    
        )}
      />
      </div>
    

      <div>

      <NaverLogin
       
       clientId="UqGcO60CQWJbUf5O9imw"
       callbackUrl="http://localhost:3000"
       onSuccess={onSuccess_naver}
       onFailure={(err) => console.log(err)}
       render={(props) =>(
          
                <img className='login_img'src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F995B4C375C3D83CA26' alt="naver login"
                onClick={() => {
                  props.onClick();
             
                }}/>    
        )}
      />
    
      </div>  

    

      <div className='closebutton'>
      <button onClick={handleModalClose}>닫기</button>
      </div>

      </div>

    </Modal>
    </>
  );
}

export default Navbar2;
