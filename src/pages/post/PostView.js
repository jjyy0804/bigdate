import React, { useEffect, useState } from 'react';
import { getPostByNo } from '../post/PostList';
import { CircleFill, GeoAltFill, GeoFill, HandThumbsUp,Heart, StarFill, } from 'react-bootstrap-icons';
const { kakao } = window;

const places = [
  { name: "음식점 A", category: "한식", rating: 4.5, location: "서울시 강남구" },
  { name: "음식점 B", category: "양식", rating: 4.0, location: "서울시 마포구" },
  { name: "음식점 C", category: "중식", rating: 3.5, location: "서울시 송파구" }
];
const PostView = ({ history, location, match }) => {
  const [ data, setData ] = useState({});

  const { course_id } = match.params;

/**코스 상세 정보 조회 axio get  course id로*/
/**코스 댓글 조회 axio get */
/** 
  useEffect(() => {
    setData(getPostByNo(course_id));
  }, []);
  */
  useEffect(() => {

  
    setData(getPostByNo(course_id));
     

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

  return (
    <>
     

      <div className="post-view-wrapper">
        {
          data ? (
            <>
            <div className='background-container'>
            <div className="overlay-container">
            <div style={{
              fontWeight:"bold",
              fontSize:"large",
              marginRight:"40px",
              marginLeft:"40px",
              paddingTop:'40px',
              borderBottom: '1px solid gray'
              }}>{data.course_name}</div>


        <div style={{ display: 'flex' }}>
               <div
                    id="myMap"
                    style={{ 
                      width: '400px',
                      height: '400px',
                      margin:'30px',
                      zIndex:0
                    }}>
                </div>

                {/**map함수로 코스에 해당하는 장소 넣기 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                {places.map((place, index) => (
                  <div key={index} style={{marginTop:'30px'}}>
                    <div style={{display:'flex'}}>
                      <div className='placeNum' style={{backgroundColor:'#1e90ff',margin:'0px',color:'white',paddingLeft:'7px'}}>{index + 1}</div>
                      <div style={{marginLeft:'10px'}}>{place.name}</div>
                    </div>
                    <div style={{display:'flex',marginTop:'7px'}}>
                      <div style={{marginLeft:'5px',fontSize:'11px'}}><CircleFill style={{fontSize:'5px',color:'#1e90ff',marginRight:'20px'}}/>{place.category}</div>
                      <div style={{marginLeft:'10px',fontSize:'11px'}}><StarFill style={{color:'orange',marginBottom:'5px'}}/>
                       {place.rating}</div>
                    </div>
                    <div style={{marginLeft:'5px',marginTop:'7px',fontSize:'11px'}}><CircleFill style={{fontSize:'5px',color:'#1e90ff',marginRight:'20px'}}/><GeoAltFill style={{color:'gray',fontSize:'10px'}}/>
                    {place.location}</div>
                  </div>
                ))}
                <div style={{marginTop:'50px',display:'flex',justifyContent:'center',borderTop:'1px solid gray'}}>
                  1인 예상 금액 : 예상금액 원</div>
              </div>

              

         </div>
              

         <div style={{
              fontWeight:"bold",
              fontSize:"large",
              marginRight:"40px",
              marginLeft:"40px",
              paddingTop:'40px',
              borderBottom: '1px solid gray'
              }}>코스 설명
        </div>
        <div style={{marginLeft:'40px',fontSize:'12px'}}>course_info</div>



        <div style={{
              fontWeight:"bold",
              fontSize:"large",
              marginRight:"40px",
              marginLeft:"40px",
              paddingTop:'40px',
              borderBottom: '1px solid gray'
              }}>코스 상세보기
        </div>
       {/**map함수로 코스에 해당하는 장소 넣기 */}
       <div style={{ display: 'flex', flexDirection: 'column' }}>
                {places.map((place, index) => (
                  <div key={index} style={{marginTop:'30px',marginLeft:'40px'}}>
                    <div style={{display:'flex',marginBottom:'10px'}}>
                      <div className='placeNum' style={{backgroundColor:'#1e90ff',margin:'0px',color:'white',paddingLeft:'7px'}}>{index + 1}</div>
                      <div style={{marginLeft:'10px'}}>{place.name}</div>
                    </div>
                    <div style={{display:'flex'}}>
                      <img src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTJfMjA3%2FMDAxNjc2MTc5OTg0MDE0.g1Z0SFnEjBUrJGcR0Zeubwvv8PIVs5wcLqAhHsdugIMg.i1Cjf1o1eT7dwlMAKnFibEdf1n8bUI8SaHtI69DeEi8g.JPEG.parkhs11%2FIMG_3559.jpg&type=a340' style={{width:'150px', borderRadius:'10px'}}></img>
                      <div style={{display:'block',marginLeft:'20px'}}>
                      <div><GeoAltFill style={{color:'#3163C9',fontSize:'20px'}}/> {place.location} <StarFill style={{color:'orange',marginBottom:'5px'}}/>
                       {place.rating}</div>
                    
                      <div style={{border:'1px solid gray', borderRadius:'10px',width:'500px',height:'100px',marginTop:'10px'}}>장소에 대한 리뷰</div>
                      </div>
                    </div>
                    
                    
                  </div>
                ))}
                
              </div>

        
        <div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
          <div style={{border: '1px solid gray',padding:'10px'}}>
              <HandThumbsUp style={{fontSize:'20px'}}/>
          </div>
          <div style={{border: '1px solid gray',padding:'10px',marginLeft:'20px'}}>
              <Heart style={{fontSize:'20px'}}/>
          </div>
        </div>


        <div style={{
              fontWeight:"bold",
              fontSize:"large",
              marginRight:"40px",
              marginLeft:"40px",
              paddingTop:'40px',
              borderBottom: '1px solid gray'
              }}>댓글
        </div>
        <div style={{marginLeft:'40px',fontSize:'12px'}}>댓글리스트</div>
        <div><textarea placeholder='댓글을 입력하세요' style={{marginLeft:'80px',width:'600px'}}></textarea></div>
        
              </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록으로 돌아가기</button>
      </div>
    </>
  )
}

export default PostView;