import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const CoupleInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // 혼주 연락처 정보
  const contacts = {
    groom: {
      self: { name: "정회웅", phone: "010-1234-5677" },
      father: { name: "정태희", phone: "010-1234-5678" },
      mother: { name: "박미숙", phone: "010-1234-5679" }
    },
    bride: {
      self: { name: "김지우", phone: "010-1234-5682" },
      father: { name: "김성진", phone: "010-1234-5680" },
      mother: { name: "문애순", phone: "010-1234-5681" }
    }
  };

  // 전화 걸기 함수
  const makeCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // 문자 보내기 함수
  const sendMessage = (phoneNumber) => {
    window.location.href = `sms:${phoneNumber}`;
  };

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
            <img src={`${process.env.PUBLIC_URL}/images/hoiwoong.jpg`} alt="신랑 정회웅" />
          </div>
          <div className="couple-info-content">
            <h2>
              신랑 {contacts.groom.self.name} 
              <button 
                className="couple-phone-btn"
                onClick={() => makeCall(contacts.groom.self.phone)}
                title={`${contacts.groom.self.name}에게 전화하기`}
              >
                📞
              </button>
            </h2>
            <p className="couple-parents">아버지 {contacts.groom.father.name}<br/>어머니 {contacts.groom.mother.name}</p>
          </div>
        </div>

        {/* 신부 카드 */}
        <div className="couple-card">
          <div className="couple-photo">
            <img src={`${process.env.PUBLIC_URL}/images/jiwoo.jpg`} alt="신부 김지우" />
          </div>
          <div className="couple-info-content">
            <h2>
              신부 {contacts.bride.self.name} 
              <button 
                className="couple-phone-btn"
                onClick={() => makeCall(contacts.bride.self.phone)}
                title={`${contacts.bride.self.name}에게 전화하기`}
              >
                📞
              </button>
            </h2>
            <p className="couple-parents">아버지 {contacts.bride.father.name}<br/>어머니 {contacts.bride.mother.name}</p>
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
                    <span className="contact-name">아버지 {contacts.groom.father.name}</span>
                    <div className="contact-buttons">
                      <button 
                        className="contact-phone-btn"
                        onClick={() => makeCall(contacts.groom.father.phone)}
                        title={`${contacts.groom.father.name}에게 전화하기`}
                      >
                        📞
                      </button>
                      <button 
                        className="contact-message-btn"
                        onClick={() => sendMessage(contacts.groom.father.phone)}
                        title={`${contacts.groom.father.name}에게 문자하기`}
                      >
                        ✉️
                      </button>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">어머니 {contacts.groom.mother.name}</span>
                    <div className="contact-buttons">
                      <button 
                        className="contact-phone-btn"
                        onClick={() => makeCall(contacts.groom.mother.phone)}
                        title={`${contacts.groom.mother.name}에게 전화하기`}
                      >
                        📞
                      </button>
                      <button 
                        className="contact-message-btn"
                        onClick={() => sendMessage(contacts.groom.mother.phone)}
                        title={`${contacts.groom.mother.name}에게 문자하기`}
                      >
                        ✉️
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="contact-section">
                  <h4>신부측</h4>
                  <div className="contact-item">
                    <span className="contact-name">아버지 {contacts.bride.father.name}</span>
                    <div className="contact-buttons">
                      <button 
                        className="contact-phone-btn"
                        onClick={() => makeCall(contacts.bride.father.phone)}
                        title={`${contacts.bride.father.name}에게 전화하기`}
                      >
                        📞
                      </button>
                      <button 
                        className="contact-message-btn"
                        onClick={() => sendMessage(contacts.bride.father.phone)}
                        title={`${contacts.bride.father.name}에게 문자하기`}
                      >
                        ✉️
                      </button>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">어머니 {contacts.bride.mother.name}</span>
                    <div className="contact-buttons">
                      <button 
                        className="contact-phone-btn"
                        onClick={() => makeCall(contacts.bride.mother.phone)}
                        title={`${contacts.bride.mother.name}에게 전화하기`}
                      >
                        📞
                      </button>
                      <button 
                        className="contact-message-btn"
                        onClick={() => sendMessage(contacts.bride.mother.phone)}
                        title={`${contacts.bride.mother.name}에게 문자하기`}
                      >
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