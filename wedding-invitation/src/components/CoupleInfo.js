import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const CoupleInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      className="couple-info"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="couple">
        <div>
          <h2>신랑 정회웅</h2>
          <p>JUNG HOIWOONG</p>
          <p>정태희 · 박미숙 의 장남</p>
        </div>
        <div>
          <h2>신부 김지우</h2>
          <p>KIM JIWOO</p>
          <p>김성진 · 문애순 의 차녀</p>
        </div>
      </div>
      <p className="happy">저희 행복하게 잘 살겠습니다:)</p>
    </motion.section>
  );
};

export default CoupleInfo; 