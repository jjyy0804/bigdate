import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // slick 라이브러리의 기본 CSS 파일
import 'slick-carousel/slick/slick-theme.css'; // slick 라이브러리의 테마 CSS 파일
import './EbayCarousel.css'

const EbayCarousel = ({ places }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,

      // 추가적인 설정 및 스타일링
    };


// 이미지 클릭 이벤트 핸들러
const handleImageClick = (id) => {
  // 장소 상세정보 페이지로 이동
  window.location.href = `/place/${id}`; // 장소 ID를 URL에 포함하여 전달
};

    return (
      <div>
      <Slider {...settings}>
        {/* 장소 목록을 map() 메소드를 사용하여 동적으로 슬라이드로 생성 */}
        {places.map(place => (
          <div className="carousel-slide" key={place.id}>
            <img className="carousel-image" src={place.image} alt={place.name} style={{marginRight:'10px'}} 
            onClick={() => handleImageClick(place.id)}/>
            <h3>{place.name}</h3>
            {/* 추가적인 장소 정보 혹은 컴포넌트 */}
          </div>
        ))}
      </Slider>
      </div>
    );
  };
  
  export default EbayCarousel;
