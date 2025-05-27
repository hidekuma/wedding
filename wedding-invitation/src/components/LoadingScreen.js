import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showLastFrame, setShowLastFrame] = useState(false);
  const [lastFrameLoaded, setLastFrameLoaded] = useState(false);

  useEffect(() => {
    // 마지막 프레임 이미지 미리 로드
    const img = new Image();
    img.onload = () => setLastFrameLoaded(true);
    img.src = `${process.env.PUBLIC_URL}/images/last_frame.jpg`;

    // 2.3초 후에 마지막 프레임으로 변경 (이미지 로드 완료 후)
    const lastFrameTimer = setTimeout(() => {
      if (lastFrameLoaded) {
        setShowLastFrame(true);
      }
    }, 2300);

    // 2.7초 후에 로딩 완료
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2700);

    return () => {
      clearTimeout(lastFrameTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, lastFrameLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          style={{
            backgroundImage: showLastFrame 
              ? `url(${process.env.PUBLIC_URL}/images/last_frame.jpg)` 
              : `url(${process.env.PUBLIC_URL}/images/loading.gif)`
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="loading-content">
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 