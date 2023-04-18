import React, { useState } from 'react';
import "./RegisterPost.css";
import { PlusSquare} from 'react-bootstrap-icons';
import PlaceForm from '../components/form/PlaceForm';


function RegistPost() {

  const [inputVal, setInputVal] = useState(''); // 입력창의 값을 상태로 관리
  const [showTextArea, setShowTextArea] = useState(false);
  const [info, setInfo] = useState('');
  const [courseTitle,setCourseTitle] = useState('');
  const [placeReviews, setPlaceReviews] = useState([]); // PlaceReview 배열 상태 선언

  // 입력창의 값이 변경될 때마다 서버에 데이터를 요청하여 placeholder에 값을 표시하는 함수
  const updatePlaceholder = () => {
    // 서버에 데이터 조회 요청
    fetch(`/api/data?inputVal=${inputVal}`) // 서버의 데이터 조회 API 엔드포인트와 입력값 전달
      .then(response => response.json()) // 서버로부터 응답 받고 JSON 형식으로 변환
      .then(data => {
        // 서버로부터 받은 응답을 이용하여 placeholder에 값을 표시
        const placeholderText = `조회 결과: ${data.data}`; // 응답 데이터에 따라 표시할 텍스트를 조작
        setInputVal(placeholderText); // 상태 값 업데이트
      })
      .catch(error => console.error('서버 요청 에러:', error));
  };

   // placeData 값을 서버로 보내는 함수
   const sendPlaceDataToServer = (placeData) => {
    // placeData를 서버로 보내는 로직 구현
    console.log('Sending place data to server:', placeData);
  };


  // "장소 추가" 버튼 클릭 시 textarea 표시 여부를 토글하는 함수
  const toggleTextArea = () => {
    setShowTextArea(!showTextArea);
  };

  const aa=()=>{
    console.log(placeReviews);
  }

  
 // 자식 컴포넌트에서 호출될 콜백 함수
 const handleAddPlace = (placeData) => {

   // placeData를 서버로 보내는 함수 호출
   sendPlaceDataToServer(placeData);

   setPlaceReviews([...placeReviews, placeData]); // 새로운 장소 정보를 배열에 추가
};

  const [placeForms, setPlaceForms] = useState([]); // PlaceForm 컴포넌트들의 배열을 상태로 관리

  const add = () => {
    setPlaceForms([...placeForms, <PlaceForm key={placeForms.length + 1} />]); // PlaceForm 컴포넌트를 배열에 추가
  };

  //리뷰 수정
  const handleEditReview = (index, updatedReview) => {
    // placeReviews 배열 복사
    const updatedPlaceReviews = [...placeReviews];
  
   // 특정 인덱스의 리뷰 정보를 복사하여 업데이트
   updatedPlaceReviews[index] = { ...updatedPlaceReviews[index], ...updatedReview };
  
    // 변경된 배열을 상태로 설정
    setPlaceReviews(updatedPlaceReviews);
 
    
  };

  return (
    
    <div className="background-container">
      
      <div className="overlay-container">

      <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        borderBottom: '1px solid gray'
        }}>코스 등록
      </div>

        <div style={{margin:"20px 40px"}}> 
          코스 제목<input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
          style={{marginLeft:"5px"}} />
        </div>
       
       
        {/* 배열에 있는 PlaceForm 컴포넌트들을 렌더링 */}
        {placeForms.map((placeForm,index) => (
          <PlaceForm key={placeForm.id} id={placeForm.id}
            onAddPlace={handleAddPlace} onEditReview={() => handleEditReview(index)}  />
            
        ))}
         

        <div className='form_add'>
          <button onClick={add} style={{backgroundColor:"white"}}>
            <PlusSquare style={{fontSize:'30px',color:"#1E90FF",marginTop:"50px"}}/>
          </button>
        </div>    

        <div style={{fontWeight:"bold",fontSize:"large",marginLeft:"40px",marginRight:"40px",borderBottom: '1px solid gray'}}>코스 설명</div>
        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}  >
        <textarea
              style={{marginTop:"30px"}}
              rows={3}
              cols={90}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="코스 설명을 입력하세요"
        />
        </div>
         <div className='form_add'>
          <button 
            onClick={aa}
            style={{color:"white",
            backgroundColor:"#1E90FF",
            borderRadius:"10px",
            fontSize:"small",
            width:"80px",
            height:"30px",
            marginTop:"20px",
          }}>
              등록
          </button>
        </div>  
        

        </div>
      </div>
    
  );
};


export default RegistPost
