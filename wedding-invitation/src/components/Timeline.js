import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Timeline = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const timelineData = [
    {
      title: "첫 만남",
      description: "운명적인 첫 만남\n서로에게 끌린 그 순간",
      image: `${process.env.PUBLIC_URL}/images/gallery-webp/1Y4A3199.webp`
    },
    {
      title: "첫 데이트",
      description: "설레는 첫 데이트\n함께한 소중한 시간",
      image: `${process.env.PUBLIC_URL}/images/gallery-webp/1Y4A2968.webp`
    },
    {
      title: "프로포즈",
      description: "영원한 사랑을 약속하며\n평생을 함께하자는 고백",
      image: `${process.env.PUBLIC_URL}/images/gallery-webp/1Y4A2799.webp`
    },
    {
      title: "웨딩 촬영",
      description: "아름다운 순간을 담은\n웨딩 촬영의 추억",
      image: `${process.env.PUBLIC_URL}/images/gallery-webp/1Y4A2748.webp`
    },
    {
      title: "결혼식 준비",
      description: "새로운 시작을 위한\n설레는 준비 과정",
      image: `${process.env.PUBLIC_URL}/images/combined-webp/top_image.webp`
    },
    {
      title: "Wedding Day",
      description: "저희는 이날 결혼해요\n저희의 시작을\n축하해주세요",
      image: `${process.env.PUBLIC_URL}/images/gallery-webp/1Y4A2641.webp`
    }
  ];

  return (
    <motion.section
      className="timeline"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>우리의 시간</h2>
      <div className="timeline-container">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="timeline-content">
              <div className="timeline-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="timeline-image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
            <div className="timeline-point"></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Timeline; 