import React, { useEffect, useState } from 'react'
import "./Home.css"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {hotspots} from '../HotspotData';
import axios from 'axios';
import { Ref } from 'semantic-ui-react';


/** 
axios(
  {
    url: 'http://3.38.34.39:8080/places',
    method: 'get'
  }
).then(function (response) {
  console.log(response.data)
});
*/
/** 
axios.get('http://서버의-IP-주소:포트/api/data')
  .then(response => {
    // 서버로부터 받은 데이터 처리
    console.log(response.data);
  })
  .catch(error => {
    // 에러 처리
    console.error(error);
  });

  */


function Home() {



  return (
  <div>
    
      <div className='main_img'>
        <img width="100%"  src="/images/main_img.png" alt="Example" />
      </div>
      <div className='main_img_tag'>
        <span># 실시간 추천</span>
        <span># 데이트 코스</span>
        <span># 편리한</span>
      </div>
    

    <div className='recommand_category'>
      <div>#실시간 혼잡도 top5</div>  
        
      <div className='card-container'>
      {hotspots.map((hotspot) => (
        <span key={hotspot.hotspot_id}>
              <Link to={{pathname:`/hotspots/${hotspot.hotspot_id}`,state: { hotspot_name: hotspot.hotspot_name }}}>
              <Card style={{ width: '13rem',height:'12rem' }}>
                <Card.Img variant="top" src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${hotspot.hotspot_name}.jpg`} />
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' ,fontSize:'15px'}}>{hotspot.hotspot_name}</Card.Title>
   
                </Card.Body>
              </Card>
              </Link>
            </span>
          ))}
      </div>

      <div>#실시간 혼잡도 top5</div>  
        
        <div className='card-container'>
            {Array(5).fill().map((_, index) => (
              <span key={index}>
                <Card style={{ width: '13rem',height:'12rem' }}>
                  <Card.Img variant="top" src="https://data.seoul.go.kr/SeoulRtd/images/hotspot/동대문 관광특구.jpg" />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold' ,fontSize:'15px'}}>지역이름</Card.Title>
                    
                  </Card.Body>
                </Card>
              </span>
            ))}
        </div>

        <div>#실시간 혼잡도 top5</div>  
        
      <div className='card-container'>
          {Array(5).fill().map((_, index) => (
            <span  key={index}>
              <Card style={{ width: '13rem' ,height:'12rem'}}>
                <Card.Img variant="top" src="https://data.seoul.go.kr/SeoulRtd/images/hotspot/동대문 관광특구.jpg" />
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' ,fontSize:'15px'}}>지역이름</Card.Title>
            
                </Card.Body>
              </Card>
            </span>
          ))}
      </div>

       <div>#실시간 혼잡도 top5</div>  
        
      <div className='card-container'>
          {Array(5).fill().map((_, index) => (
            <span  key={index}>
              <Card style={{ width: '13rem',height:'12rem'}}>
                <Card.Img variant="top" src="https://data.seoul.go.kr/SeoulRtd/images/hotspot/동대문 관광특구.jpg" />
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' ,fontSize:'15px'}}>지역이름</Card.Title>
      
                </Card.Body>
              </Card>
            </span>
          ))}
      </div>

       <div>#실시간 혼잡도 top5</div>  
        
      <div className='card-container'>
          {Array(5).fill().map((_, index) => (
            <span key={index}>
              <Card style={{ width: '13rem',height:'12rem' }}>
                <Card.Img variant="top" src="https://data.seoul.go.kr/SeoulRtd/images/hotspot/동대문 관광특구.jpg" />
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold' ,fontSize:'15px'}}>지역이름</Card.Title>
                </Card.Body>
              </Card>
            </span>
          ))}
      </div> 
    </div>
    
 </div>
    
  )
}

export default Home;

