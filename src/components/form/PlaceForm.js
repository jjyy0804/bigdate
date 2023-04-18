import React, { useState } from 'react';
import RegistPost from '../../pages/RegisterPost';

// PlaceForm 컴포넌트 정의
const PlaceForm = ({onAddPlace,onEditReview,index}) => {
const [placeName,setPlaceName] = useState('');
const [avg_score,setAvg_Score] = useState('1');
const [review_info,setReview_Info] = useState('');
const [expense,setExpense] = useState('');
const [showTextArea, setShowTextArea] = useState(false);
 


 // 입력값을 사용하여 handleAddPlace 함수 호출
 const handleFormSubmit = () => {
    const placeData = {
      placeName,
      avg_score,
      review_info,
      expense
    };
    // 입력값을 인자로 handleAddPlace 함수 호출
    onAddPlace(placeData);
  };

 // PlaceForm 컴포넌트에서 handleReviewEdit 함수 호출 시 updatedReview 객체 전달
  const handleReviewEdit = (index) => {
   
    };

const toggleTextArea = () => {
    setShowTextArea(!showTextArea);
  };

  return (
    <div className='place_add' style={{marginLeft:"40px"}} >
          장소 검색
         <input
         style={{marginLeft:"5px"}}

          type="text"
          id="myInput"
          name="myInput"
          value={placeName}
          onChange={e => setPlaceName(e.target.value)} // 입력창의 값이 변경될 때마다 상태 값 업데이트
          placeholder={placeName} // 상태 값으로 placeholder에 값을 설정
        />
        <button  onClick={toggleTextArea} 
                 style={{
                    marginLeft:"5px",
                    color:"white",
                    backgroundColor:"#1E90FF",
                    borderRadius:"10px",
                    fontSize:"small",
                    width:"80px",
                    height:"30px"}}>
                        리뷰 추가
        </button>
          <div>
          {showTextArea && (
            <div>
              <div style={{marginLeft:"40px"}}>
              평점   <select
                        style={{marginTop:"15px",width:"70px"}}
                        value={avg_score}
                        onChange={(e) => setAvg_Score(e.target.value)}
                      >
                  
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"15px"}} >
              <textarea
                rows={3}
                cols={90}
                value={review_info}
                onChange={(e) => setReview_Info(e.target.value)}
                placeholder="리뷰를 입력하세요"
              />
              </div>
            <div style={{marginRight:"90px",display: "flex", justifyContent: "flex-end"}}>
              <div style={{marginTop:"15px"}}>
                총 지출 금액 :
              <input
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                placeholder="금액을 입력하세요"
              /> 원
            </div>
            </div>
            </div>
         )}
        </div>
        <button onClick={handleFormSubmit}>등록</button>
        <button onClick={() => handleReviewEdit(index)}>수정</button>
        </div>
  );
};

export default PlaceForm;
