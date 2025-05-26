import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Interview = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      className="interview"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>웨딩 인터뷰</h2>
      <ul>
        <li>
          <strong>1. 결혼하시는 소감이 어떠세요?</strong><br/>
          <span>🤵🏻‍♂️회웅</span> 인생은 지금부터 시작인 것 같아요. 앞으로 매일 함께 맛있는 밥을 먹고, 함께 기뻐하고, 함께 여행하고 모든 것을 언제나 함께할 수 있다는 생각에 벌써부터 행복합니다.<br/>
          <span>👰🏻‍♀️지우</span> 매일 데이트하고 헤어질 때 마다 아쉬웠는데 이제는 매일 함께 있을 수 있어서 행복해요. 어떻게 하루를 보냈는지 이야기하고 마주보며 웃는 그런 소박한 나날들을 보낼 생각에 설레입니다.
        </li>
        <li>
          <strong>2. 처음에 어떻게 만나셨어요?</strong><br/>
          인도네시아 여행 중에 여행가방을 통째로 잃어버려 어쩔 줄 몰라 하고 있을 때, 남편의 도움으로 가방도 찾고 무사히 귀국할 수 있었어요. 그 모습이 어찌나 멋지고 듬직하던지 잊혀지지가 않습니다.
        </li>
        <li>
          <strong>3. 신혼여행은 어디로 가시나요?</strong><br/>
          바다를 좋아하는 저희는, 14박 15일 몰디브로 떠납니다.
        </li>
        <li>
          <strong>4. 신혼집은 어디인가요?</strong><br/>
          직장이랑 가까운 행복동에 작은 아파트에서 새로운 시작을 하기로 했습니다. 우리의 취향을 듬뿍 담아 인테리어 중인데, 입주날이 기다려집니다.
        </li>
      </ul>
    </motion.section>
  );
};

export default Interview; 