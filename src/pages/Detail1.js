import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import swal from 'sweetalert';
import { Button } from 'semantic-ui-react';
import "./Detail1.css";

function Detail1() {
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
  

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://openapi.seoul.go.kr:8088/55526953736a6a793633725870596b/xml/citydata/1/5/역삼역'
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
  <div className='content'>
         <div>지역명 : {areaName}</div>
         <div>혼잡 수준 : {congest}</div>
         <div>온도 : {temp}</div>
         <div>체감 온도: {sensible_temp}</div>
         <div>자외선 지수 : {uv_level}</div>
         <div>습도 : {humidity}</div>
         <div>강수 소식 : {rainper}</div>
         <div>통합대기환경지수 : {pm10}</div>
         <div>통합대기환경등급 : {air_level}</div>
         <div>통합대기환경주의메세지 : {air_msg}</div>
         <div>도로 소통 단계 : {traffic_level}</div>
         <div>평균 주행 속도 : {traffic_speed}</div>
         <div>도로 구간 소통 지표 :{traffic_msg}</div>
        
 </div>
         );
}

export default Detail1
