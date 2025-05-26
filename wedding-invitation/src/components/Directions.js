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
      <p>더살롱드웨딩홀 1층 레터홀<br/>제주특별자치도 서귀포시 중앙로 105</p>
      <ul>
        <li>🚌 버스: 000번, 000번, 000번 (살롱드레터 정류소 하차 후 도보 3분)</li>
        <li>🚆 지하철: 1호선/2호선 살롱드레터 역 하차, 출구 나와서 우측 신호등 건너 셔틀버스 탑승 또는 도보 5분</li>
        <li>🚗 자차: 살롱드레터 주차장/웨딩홀 검색, 주차장이 협소하니 야외주차장+셔틀버스 이용(5분 간격)</li>
      </ul>
    </motion.section>
  );
};

export default Directions; 