import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const GuestSnap = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      className="guest-snap"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>게스트스냅</h2>
      <p>신랑·신부의 행복한 순간을 담아주세요</p>
      <ul>
        <li>1. 신부 대기실에서 설렘 가득한 순간</li>
        <li>2. 웃음 만개! 행복한 신랑신부</li>
        <li>3. 눈빛 교환! 마주보는 신랑신부</li>
        <li>4. 행복한 피날레 신랑신부 행진</li>
        <li>5. 여러분의 미소 (오늘 주인공은 저희뿐만이 아니에요!)</li>
        <li>6. 감성 한 스푼 '예술이란 이런 것이다' 한 컷!</li>
      </ul>
      <p>🎁 미션 수행자 중 가장 멋진 컷을 남겨주신 분께 맛있는 밥 한 끼를 쏩니다!</p>
      <p>많은 참여 부탁드려요! 💖</p>
    </motion.section>
  );
};

export default GuestSnap; 