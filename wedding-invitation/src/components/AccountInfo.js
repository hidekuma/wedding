import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const AccountInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      className="account-info"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>마음 전하실 곳</h2>
      <div className="account-list">
        <div>
          <h3>신랑측</h3>
          <ul>
            <li>신랑: 1111-1111-1111-1111 (카카오뱅크 정회웅)</li>
            <li>신랑 아버지: 1111-1111-1111-1111 (카카오뱅크 정태희)</li>
            <li>신랑 어머니: 1111-1111-1111-1111 (카카오뱅크 박미숙)</li>
          </ul>
        </div>
        <div>
          <h3>신부측</h3>
          <ul>
            <li>신부: 1111-1111-1111-1111 (카카오뱅크 김지우)</li>
            <li>신부 아버지: 1111-1111-1111-1111 (카카오뱅크 김성진)</li>
            <li>신부 어머니: 1111-1111-1111-1111 (카카오뱅크 문애순)</li>
          </ul>
        </div>
      </div>
      <p className="thanks">소중한 축하를 보내주셔서 감사드리며, 따뜻한 마음에 깊이 감사드립니다.</p>
    </motion.section>
  );
};

export default AccountInfo; 