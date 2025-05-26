import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/main.css";

const Quote = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.section
      ref={ref}
      className="quote-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="quote-content">
        <p>우리가 서로 뜨겁게</p>
        <p>사랑한다는 것은</p>
        <p>그대는 나의 세상을</p>
        <p>나는 그대의 세상을</p>
        <p>함께 짊어지고 새벽을 향해</p>
        <p>걸어가겠다는 것입니다.</p>
      </div>
      <p className="quote-author">&lt;사랑한다는 것&gt;, 안도현</p>
    </motion.section>
  );
};

export default Quote; 