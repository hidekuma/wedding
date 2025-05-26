import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/main.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // 카운트다운 계산
  useEffect(() => {
    // 결혼식 날짜 설정 (2025년 9월 6일)
    const weddingDate = new Date('2025-09-06T13:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // 빈 의존성 배열로 변경

  return (
    <motion.section
      ref={ref}
      className="countdown-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <h2>회웅 ♥ 지우 결혼식까지</h2>
      <div className="countdown-container">
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-number">{timeLeft.seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </motion.section>
  );
};

export default Countdown; 