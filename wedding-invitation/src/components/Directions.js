import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Directions = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const openTmap = () => {
    window.location.href = 'https://tmap.life/be35c180';
  };

  const openKakaoMap = () => {
    window.location.href = 'https://kko.kakao.com/RU1ugMNcOG';
  };

  const openNaverMap = () => {
    window.location.href = 'https://naver.me/5Jp98uu6';
  };



  return (
    <motion.section
      className="directions"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>오시는 길</h2>
      
      <div className="location-info">
        <h3>아르떼 웨딩컨벤션</h3>
        <p>2층 아델라홀</p>
        <p>충청북도 청주시 청원구 사천로 33</p>
        <p>
          <a 
            href="tel:043-211-8000"
            style={{
              textDecoration: 'none',
              marginRight: '0.5rem'
            }}
          >
            📞
          </a>
          043-211-8000
        </p>
      </div>

      {/* 구글 지도 임베딩 */}
      <div className="embedded-map">
        <iframe
          src="https://maps.google.com/maps?q=아르떼웨딩컨벤션,충청북도+청주시+청원구+사천로+33&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 'none', borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="아르떼 웨딩컨벤션 위치"
        ></iframe>
      </div>

      {/* 지도 앱 버튼들 */}
      <div className="map-buttons">
        <motion.button 
          className="map-btn tmap-btn"
          onClick={openTmap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="map-icon">T</span>
          <span className="map-text">티맵</span>
        </motion.button>
        
        <motion.button 
          className="map-btn kakao-btn"
          onClick={openKakaoMap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="map-icon">🗺</span>
          <span className="map-text">카카오맵</span>
        </motion.button>
        
        <motion.button 
          className="map-btn naver-btn"
          onClick={openNaverMap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="map-icon">N</span>
          <span className="map-text">네이버지도</span>
        </motion.button>
      </div>

      <div className="transport-info">
        <div className="transport-section">
          <h4>🚌 대중교통 이용 시</h4>
          <div className="transport-item">
            <p><strong>청주행 시외/고속버스터미널에서 오실 경우</strong></p>
            <p>시외버스터미널 앞 → 상당공원방향 하차<br/>
            →1회환승 (율량중학교 OR 성모병원방향)<br/>
            율량중학교 인근 하차</p>
          </div>
          <div className="transport-item">
            <p><strong>청주대정류소 시외버스 이용시</strong></p>
            <p>율량동 하차, 도보역방향 도보로 5분</p>
          </div>
        </div>

        <div className="transport-section">
          <h4>🚗 자가용 이용 시</h4>
          <div className="transport-item">
            <p><strong>오창 IC → 청주방면 7km 직진 → 타이어뱅크 지나 입구로 진입 → 아르떼웨딩컨벤션 도착</strong></p>
            <p>(오창 IC에서 도착 7분거리)</p>
          </div>
          <div className="transport-item">
            <p><strong>서청주 IC →청주공항방면 차회전 →7km직진<br/>
            → 성모병원 방면 → 고가다리 아래 진입 후 차회전<br/>
            → 타이어뱅크 앞에서 유턴 → 아르떼웨딩컨벤션 도착</strong></p>
            <p>(서청주 IC에서 도착 15분거리)</p>
          </div>
        </div>
      </div>

      
    </motion.section>
  );
};

export default Directions; 