import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const CoupleInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <motion.section
      className="couple-info"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="couple-cards">
        {/* 신랑 카드 */}
        <div className="couple-card">
          <div className="couple-photo">
            <img src="https://placehold.co/300x400/8b6f47/ffffff?text=신랑" alt="신랑 정회웅" />
          </div>
          <div className="couple-info-content">
            <h2>신랑 정회웅 📞</h2>
            <p className="couple-parents">아버지 정태희<br/>어머니 박미숙</p>
          </div>
        </div>

        {/* 신부 카드 */}
        <div className="couple-card">
          <div className="couple-photo">
            <img src="https://placehold.co/300x400/b48a78/ffffff?text=신부" alt="신부 김지우" />
          </div>
          <div className="couple-info-content">
            <h2>신부 김지우 📞</h2>
            <p className="couple-parents">아버지 김성진<br/>어머니 문애순</p>
          </div>
        </div>
      </div>
      
      <button 
        className="contact-btn"
        onClick={() => setContactModalOpen(true)}
      >
        혼주에게 연락하기
      </button>
      
      <p className="couple-message">저희의 결혼을 축하해주세요</p>

      {/* 연락하기 모달 */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            className="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setContactModalOpen(false)}
          >
            <motion.div
              className="contact-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="contact-modal-close"
                onClick={() => setContactModalOpen(false)}
              >
                ×
              </button>
              
              <h3>혼주에게 연락하기</h3>
              
              <div className="contact-sections">
                <div className="contact-section">
                  <h4>신랑측</h4>
                  <div className="contact-item">
                    <span className="contact-name">아버지 정태희</span>
                    <div className="contact-buttons">
                      <button className="contact-phone-btn">
                        📞
                      </button>
                      <button className="contact-message-btn">
                        ✉️
                      </button>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">어머니 박미숙</span>
                    <div className="contact-buttons">
                      <button className="contact-phone-btn">
                        📞
                      </button>
                      <button className="contact-message-btn">
                        ✉️
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="contact-section">
                  <h4>신부측</h4>
                  <div className="contact-item">
                    <span className="contact-name">아버지 김성진</span>
                    <div className="contact-buttons">
                      <button className="contact-phone-btn">
                        📞
                      </button>
                      <button className="contact-message-btn">
                        ✉️
                      </button>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">어머니 문애순</span>
                    <div className="contact-buttons">
                      <button className="contact-phone-btn">
                        📞
                      </button>
                      <button className="contact-message-btn">
                        ✉️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CoupleInfo; 