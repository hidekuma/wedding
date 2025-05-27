import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const WeddingInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // 2025년 9월 달력 데이터
  const calendarDays = [];
  const firstDay = new Date(2025, 8, 1).getDay(); // 9월 1일의 요일 (0=일요일)
  const daysInMonth = new Date(2025, 8 + 1, 0).getDate(); // 9월의 일수

  // 빈 칸 추가 (월 시작 전)
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // 날짜 추가
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <motion.section
      className="wedding-info"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>예식 안내</h2>
      
      <div className="wedding-details">
        <p className="wedding-date">2025년 9월 6일 토요일 오후 1시</p>
        <p className="wedding-venue">청주 아르떼 웨딩홀 아델라홀</p>
      </div>

      <div className="wedding-photo">
        <img src={`${process.env.PUBLIC_URL}/images/1Y4A2333.JPG`} alt="신랑신부" />
      </div>

      <div className="calendar-section">
        <h3>9월</h3>
        <div className="calendar">
          <div className="calendar-header">
            <div>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
          </div>
          <div className="calendar-body">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day === 6 ? 'wedding-day' : ''} ${!day ? 'empty' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WeddingInfo; 