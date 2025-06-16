import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Header = ({ isLoading = false, showHeroText = false }) => (
  <motion.header
    className="header"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* 메인 웨딩 이미지 */}
    <motion.div 
      className="hero-image"
      initial={{ opacity: isLoading ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: isLoading ? 0.5 : 0,
        ease: "easeOut"
      }}
      style={{ willChange: "opacity" }}
    >
      <img src={`${process.env.PUBLIC_URL}/images/gallery-webp/NHH00031_1.webp`} alt="신랑신부" />
      
      {/* 이미지 위 텍스트 오버레이 - showHeroText가 true일 때 표시 */}
      {showHeroText && (
        <motion.div 
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 2.0, 
            delay: 0.1,
            ease: "easeOut"
          }}
        >
          <div className="hero-text">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              our<br/>wedding<br/>day
            </motion.h1>
            
            <motion.div 
              className="hero-date"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p> 2025 / 09 / 06 </p>
            </motion.div>
            
            <motion.div 
              className="hero-date"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p>Two hearts, one journey,<br/>
              United in love, together forever.</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>

    {/* 하단 인사말 섹션 - 미리 로드되도록 항상 렌더링 */}
    <motion.div 
      className="greeting-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
      transition={{ duration: 0.8, delay: isLoading ? 0 : 0.8 }}
    >
      <h2 className="greeting-title">저희 결혼합니다</h2>
      
      <div className="greeting-content">
        <p>두 사람이 하나 되어</p>
        <p>사랑의 여정을 시작합니다.</p>
        <br />
        <p>기쁨은 배로,</p>
        <p>슬픔은 반으로 나누며</p>
        <p>서로를 아끼고 존중하며 살겠습니다.</p>
        <br />
        <p>함께한 첫 걸음에</p>
        <p>축복의 마음을 더해주신다면</p>
        <p>무한한 감사와 기쁨이 될 것입니다.</p>
      </div>

    </motion.div>
  </motion.header>
);

export default Header; 