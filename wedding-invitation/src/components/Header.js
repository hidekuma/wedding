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
      <img src={`${process.env.PUBLIC_URL}/images/combined-webp/hero_image.webp`} alt="신랑신부" />
      
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
              <p> 2025 / 09 /06 </p>
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

    {/* 하단 인사말 섹션 - 로딩 완료 후에만 표시 */}
    {!isLoading && (
      <motion.div 
        className="greeting-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="greeting-title">저희 결혼합니다</h2>
        
        <div className="greeting-content">
          <p>저희의 결혼 소식이</p>
          <p>부담스럽지 않게 다가가길 바라며,</p>
          <p>편한 마음으로 오셔서</p>
          <p>축하해주시면 감사하겠습니다.</p>
          <br />
          <p>혹여 참석이 어려우시더라도 부담 갖지 마시고,</p>
          <p>마음으로 축하해주시면 감사하겠습니다.</p>
        </div>

      </motion.div>
    )}
  </motion.header>
);

export default Header; 