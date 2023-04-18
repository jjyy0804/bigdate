import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import xml2js from 'xml2js';
import { useState } from 'react';
import { getPostByNo } from '../HotspotData';
import './HotspotView.css';
import { ThermometerHalf ,Sun,Cloudy,Wind} from 'react-bootstrap-icons';

import 'pure-react-carousel/dist/react-carousel.es.css';
import EbayCarousel from '../components/carousel/EbayCarousel';


  // 장소 목록 데이터를 가지고 있는 places 배열을 정의
  const places = [
    { id: 1, name: '장소1', image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTFfNjkg%2FMDAxNjc4NTM1NTE3NTEy.QobP1bSQAdM4wFZUQFLxpacrsqq8qf8JqqUbvRWBSAAg.SpPSqIqB53mA1yz_lbHrbT2N8KysYQzKuyyYM1ECQTEg.JPEG.m31004%2FIMG_2517.JPG&type=a340' },
    { id: 2, name: '장소2', image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MTdfODQg%2FMDAxNjUwMTQ4MzY0NDkz.JpLJOeViPJ9hzfT5PKGZq90otIkcoiashiN73TsF5L0g.V7S969MXYChO7Blwr5zfaT8biJVtb8aQ5GvMo0GDu8Qg.JPEG.ejin07%2F1650148364713.jpg&type=a340' },
    { id: 3, name: '장소3', image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDVfMjYz%2FMDAxNjc1NTgzOTU3MDU0.NnDboOwdi4CmCrfTRh6GEil7LLebRBskAPWvqXn2uJ8g.Y2afKCCjdQ2dRsDDoW15OE83jdfOnyyx7jIGq4xWUfEg.JPEG.qerten%2F20230205%25A3%25DF135426.jpg&type=a340' },
    { id: 4, name: '장소4', image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDVfMjYz%2FMDAxNjc1NTgzOTU3MDU0.NnDboOwdi4CmCrfTRh6GEil7LLebRBskAPWvqXn2uJ8g.Y2afKCCjdQ2dRsDDoW15OE83jdfOnyyx7jIGq4xWUfEg.JPEG.qerten%2F20230205%25A3%25DF135426.jpg&type=a340' },
    // 추가적인 장소 데이터
  ];

function HotspotView() {
 const { hotspot_id } = useParams();
 const [ data, setData ] = useState({});

 const location = useLocation();
 const { hotspot_name } = location.state;


 useEffect(() => {
   setData(getPostByNo(hotspot_id));
 }, [ ]);


 const [areaName, setAreaName] = useState('');
  const [congest, setCongest] = useState('');
  const [temp,setTemp] = useState('');
  const [sensible_temp,setSensibleTemp] = useState('');
  const [uv_level,setUv_level] = useState('');
  const[humidity,setHumidity] = useState('');
  const[rainper,setRainper] = useState('');
  const[pm10,setPm10] = useState('');
  const[air_level,setAir_level] = useState('');
  const[air_msg,setAir_msg] = useState('');
  const[traffic_msg,setTraffic_mag]=useState('');
  const[traffic_level,setTraffic_level]=useState('');
  const[traffic_speed,setTraffic_speed]=useState('');
  const[sky,setSky]=useState('');

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://openapi.seoul.go.kr:8088/55526953736a6a793633725870596b/xml/citydata/1/5/${hotspot_name}`
        );

        // XML 데이터를 JSON 형식으로 변환
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(response.data, (err, result) => {
          const jsonResult = JSON.stringify(result);
          const jsonData = JSON.parse(jsonResult);

          // AREA_NM 태그의 값을 가져옴
          const areaName = jsonData["SeoulRtd.citydata"].CITYDATA.AREA_NM;
          const congest = jsonData["SeoulRtd.citydata"].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_LVL;
          const temp = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.TEMP;
          const sensible_temp = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.SENSIBLE_TEMP;
          const uv_level = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.UV_INDEX;
          const humidity = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.HUMIDITY;
          const rainper = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.PCP_MSG;
          const pm10 = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.AIR_IDX_MVL;
          const sky = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.FCST24HOURS.FCST24HOURS[0].SKY_STTS;
          const air_level = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.AIR_IDX;
          const air_msg = jsonData["SeoulRtd.citydata"].CITYDATA.WEATHER_STTS.WEATHER_STTS.AIR_MSG;
          const traffic_msg=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_MSG;
          const traffic_level=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_IDX;
          const traffic_speed=jsonData["SeoulRtd.citydata"].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_SPD;
          
          setAreaName(areaName);
          setTemp(temp);
          setSensibleTemp(sensible_temp);
          setUv_level(uv_level);
          setHumidity(humidity);
          setRainper(rainper);
          setPm10(pm10);
          setSky(sky);
          setAir_level(air_level);
          setAir_msg(air_msg);
          setCongest(congest);
          setTraffic_mag(traffic_msg);
          setTraffic_level(traffic_level);
          setTraffic_speed(traffic_speed);
          
          setIsLoading(false);
         
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
 



  return (
<div>
  <div className='hotspot_container'>
         <div className='hotspot_title'>{hotspot_name}의 실시간 정보</div>
  </div>      
         <div className='row-1'> 
            <img src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${hotspot_name}.jpg`} width="25%"/>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className='row-1_content'>실시간 혼잡도는<span style={{fontWeight:"bold"}}> {congest} </span>입니다.</div>
                <div>날씨/환경</div>
                <div className='row-1_content'><ThermometerHalf style={{color:"red",fontSize:"25px"}}/> {temp} ℃</div>
                <div className='row-1_content'>체감온도  {sensible_temp} ℃</div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <div className='row-1_content2'><Wind style={{color:"gray",fontSize:"25px"}}/><br/>미세먼지<br/>{pm10}㎍/m³</div>
                <div className='row-1_content2'><Cloudy style={{color:"skyblue",fontSize:"25px"}}/><br/>하늘상태<br/>{sky}</div>
                <div className='row-1_content2'><Sun style={{color:"orange",fontSize:"25px"}}/><br/>자외선지수<br/>{uv_level}</div>
                </div>
            </div>
         </div>
         <div  className="row-2"> 
            <div>
            <div >교통</div>
            <div style={{width:"400px",backgroundColor:"white",marginTop:"2%",height:"120px",paddingTop:"1px"}}>
            <div className='row-2_content'> 도로 소통 단계 <span style={{fontWeight:"bold"}}> {traffic_level} </span> </div>
            <div className='row-2_content'>평균 주행 속도는 <span style={{fontWeight:"bold"}}> {traffic_speed} </span> km/h 입니다.</div>
            </div>
            
            </div>

            <div>
            <div style={{marginLeft:"5%"}}>그때그때 소식</div>
            <div style={{width:"450px", marginLeft:"5%",}}>
            <div className='row-1_content' id='row-2_content'>{traffic_msg}</div>
            <div className='row-1_content' id='row-2_content'>{air_msg}</div>
            <div className='row-1_content' id='row-2_content'>{rainper}</div>
            </div>
            </div>
         </div>
         <div >
          <div className='tag'> # 음식점</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 카페</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 놀거리</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>


         <div >
          <div className='tag'> # 로맨틱</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 활동적인</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 힐링</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 힙한</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>

         <div >
          <div className='tag'> # 레트로</div>
          <div style={{backgroundColor:'white',width:'1000px', marginLeft:'10%',marginTop:'10px',marginBottom:'30px',borderRadius:'20px'}}>
          <EbayCarousel places={places} />
          </div>
         </div>
         



  </div>
         );
}

export default HotspotView
