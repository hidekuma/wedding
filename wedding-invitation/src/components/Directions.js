import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Directions = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
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
        <p>충청북도 청주시 청원구 사천로 33</p>
        <p>📞 043-211-8000</p>
        <p>📧 artewedding2024@naver.com</p>
      </div>

      <div className="location-map">
        <img src="/images/path.png" alt="아르떼 웨딩컨벤션 약도" />
      </div>

      <div className="location-notice">
        <p>오시는 길에 불편함이 없으시길 바랍니다.</p>
        <p>주차장으로 공급차선 사항이나 다른 문의사항이 있으실 경우, 언제든지 연락 주시길 바랍니다.</p>
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

      <div className="venue-contact">
        <p><strong>HIGH-END WEDDING HALL</strong></p>
      </div>
    </motion.section>
  );
};

export default Directions; 