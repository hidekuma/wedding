import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.footer
      className="footer"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="guestbook">
        <h2>방명록</h2>
        <p>행복하게 잘 살겠습니다:)</p>
      </div>
      <div className="copyright">
        <p>COPYRIGHT NeedIT. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer; 