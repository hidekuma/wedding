import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../styles/main.css";

const Directions = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  // 맵 로딩 지연으로 다른 컴포넌트 로드 우선
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setMapLoaded(true);
      }, 1000); // 1초 지연
      
      return () => clearTimeout(timer);
    }
  }, [inView]);
  
  // 터치 이벤트 최적화
  useEffect(() => {
    const handleTouchStart = (e) => {
      // passive 이벤트 리스너로 처리
    };
    
    const handleTouchMove = (e) => {
      // passive 이벤트 리스너로 처리
    };

    // passive 이벤트 리스너 등록
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  const openTmap = () => {
    window.open('https://tmap.life/be35c180', '_blank');
  };

  const openKakaoMap = () => {
    window.open('https://kko.kakao.com/RU1ugMNcOG', '_blank');
  };

  const openNaverMap = () => {
    window.open('https://naver.me/5Jp98uu6', '_blank');
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

      {/* 구글 지도 임베딩 - 안전한 로딩 */}
      <div className="embedded-map" style={{ touchAction: 'pan-x pan-y' }}>
        {!mapLoaded ? (
          <div 
            style={{ 
              width: '100%', 
              height: '300px', 
              backgroundColor: '#f0f0f0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}
          >
            지도를 불러오는 중...
          </div>
        ) : mapError ? (
          <div 
            style={{ 
              width: '100%', 
              height: '300px', 
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <p>지도를 불러올 수 없습니다</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              아래 지도 앱 버튼을 이용해주세요
            </p>
          </div>
        ) : (
          <iframe
            src="https://maps.google.com/maps?q=아르떼웨딩컨벤션,충청북도+청주시+청원구+사천로+33&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ 
              border: 'none', 
              borderRadius: '12px',
              touchAction: 'pan-x pan-y',
              pointerEvents: 'auto'
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="아르떼 웨딩컨벤션 위치"
            onLoad={() => {
              console.log('구글 맵 로드 성공');
            }}
            onError={() => {
              console.error('구글 맵 로드 실패');
              setMapError(true);
            }}
          ></iframe>
        )}
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