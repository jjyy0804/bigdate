import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { GeoAltFill, StarFill} from 'react-bootstrap-icons';
import { KakaoMap, MapMarker } from 'react-kakao-maps';

const { kakao } = window




const PlaceView = (props) => {
  const placeId = props.match.params.id;
  const courses = ['코스1', '코스2', '코스3'];
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('myMap');
    
    // 마커를 표시하는 장소의 좌표
    const place = {x: 127.026699584636, y: 37.5038954232782};
    
    // options 객체의 center 속성 값을 장소의 좌표로 변경
    const options = {
      center: new kakao.maps.LatLng(place.y, place.x),
      level: 3,
    };
    
    const map = new kakao.maps.Map(container, options);

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
    
    displayMarker(place);
  }, []);
  
  /**
  const [place, setPlace] = useState(null);

  useEffect(() => {
    // URL 파라미터 값 추출
    const placeId = props.match.params.id;

    // API 요청을 통한 데이터 로딩
    axios.get(`/api/places/${placeId}`)
      .then(response => {
        // 데이터 받아와서 state에 저장
        setPlace(response.data);
      })
      .catch(error => {
        console.error('Failed to load place data:', error);
      });
  }, [props.match.params.id]);

  if (!place) {
    return <div>Loading...</div>;
  }
*/
  // 로딩이 완료되면 데이터를 화면에 렌더링
  return (
    <div className="background-container">
      
      <div className="overlay-container">

      <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        borderBottom: '1px solid gray'
        }}>장소명 <StarFill style={{color:'orange',marginBottom:'5px'}}/>(별점)

        </div>
        <div className='tag' style={{margin:'20px 20px'}}> # 분위기</div>
        <div style={{display:'flex',paddingLeft:'60px'}}>
          <div>
            <img src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA3MTNfMjQ0%2FMDAxNTk0NTk2NTMxNjEz.BjeY1Nu9Q1reG3abVH3sAYT56NnlKAn8SXsmqAGg2NMg.RhsxJE5q2cJdL0MeInr_lXGfIllbdzgU0tUT-b894gEg.JPEG.goldbeer07%2F1594596517864.jpg&type=a340' 
            style={{
             
            }}/></div>
          <div>
            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              padding:'10px'}}>
                <GeoAltFill style={{color:'#3163C9',fontSize:'20px'}}/>
                주소</div>

            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>
                음식카테고리</div>

            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>번호</div>


            <div style=
            {{borderBottom :'1px solid gray', 
              width:'300px',
              marginLeft:'50px',
              marginTop:'30px',
              padding:'10px'}}>url</div>
          </div>
          
        </div>
        
        <div style=
        {{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>

        <div
        id="myMap"
        style={{
          width: '700px',
          height: '400px',
          margin:'30px'
        }}>
     </div>
        </div>

        <div style={{
        fontWeight:"bold",
        fontSize:"large",
        marginRight:"40px",
        marginLeft:"40px",
        borderBottom: '1px solid gray'
        }}>장소명을 포함한 추천 코스 

        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection: 'column'}}>
          {courses.map((course, index) => (
            <div key={index} style={{borderColor:'gray',borderStyle:'solid',borderWidth:'1px',borderRadius:'5px',width:'700px',height:'100px',marginTop:'20px'}}>
              {course}
            </div>
          ))}
        </div>

        <div style={{
        fontWeight:"bold",
        fontSize:"large",
        margin:'10px 40px',
        borderBottom: '1px solid gray'
        }}>리뷰

        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style=
          {{borderColor:'gray',
            borderStyle:'solid',
            borderWidth:'1px',
            borderRadius:'20px',
            width:'700px',
            height:'100px',
            marginTop:'20px'}}>
            코스1 map함수 써서
            
          </div>
        </div>

        
     
     </div>
   </div>

  );
};

export default PlaceView;
