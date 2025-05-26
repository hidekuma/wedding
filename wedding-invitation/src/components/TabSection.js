import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const TabSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeTab, setActiveTab] = useState('parking');

  const tabContent = {
    parking: {
      title: "주차안내",
      content: (
        <div className="tab-content">
          <div className="tab-text">
            <p>예식장은 주차장이 협소합니다.</p>
            <p>주차안내 요원의 안내를 받아<br/>야외주차장에 주차하시고 셔틀버스를<br/>이용해주세요.</p>
            <p><strong>🚌 셔틀버스 운행간격: 5분</strong></p>
          </div>
        </div>
      )
    },
    gift: {
      title: "답례품",
      content: (
        <div className="tab-content">
          <div className="tab-text">
            <p>계절에 맞는 꽃으로 꽃다발을 만들어<br/>예식 후 하객분들께 감사의 마음을 담아<br/>답례품으로 나누어 드릴 예정이니,</p>
            <p><strong>저희가 준비한 자연을 품어가세요.</strong></p>
          </div>
        </div>
      )
    }
  };

  return (
    <motion.section
      className="tab-section"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="tab-header">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabContent[tab].title}
          </button>
        ))}
      </div>
      <motion.div
        className="tab-body"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabContent[activeTab].content}
      </motion.div>
    </motion.section>
  );
};

export default TabSection; 