import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showLastFrame, setShowLastFrame] = useState(false);
  const [lastFrameLoaded, setLastFrameLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gifStartTime, setGifStartTime] = useState(null);

  useEffect(() => {
    // GIF와 마지막 프레임 이미지 미리 로드
    const gifImg = new Image();
    const lastFrameImg = new Image();
    
    gifImg.onload = () => {
      setGifLoaded(true);
      setGifStartTime(Date.now());
    };
    
    lastFrameImg.onload = () => setLastFrameLoaded(true);
    
    gifImg.src = `${process.env.PUBLIC_URL}/images/loading.gif`;
    lastFrameImg.src = `${process.env.PUBLIC_URL}/images/last_frame.jpg`;
  }, []);

  useEffect(() => {
    if (!gifLoaded || !lastFrameLoaded || !gifStartTime) return;

    // GIF 재생 시간을 고려한 타이밍 (약 2.5초 후)
    const gifDuration = 2500; // GIF 재생 시간
    const elapsed = Date.now() - gifStartTime;
    const remainingTime = Math.max(0, gifDuration - elapsed);

    const lastFrameTimer = setTimeout(() => {
      setShowLastFrame(true);
    }, remainingTime);

    // 마지막 프레임 표시 후 0.5초 뒤 완료
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    }, remainingTime + 500);

    return () => {
      clearTimeout(lastFrameTimer);
      clearTimeout(completeTimer);
    };
  }, [gifLoaded, lastFrameLoaded, gifStartTime, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* GIF 이미지 */}
          {gifLoaded && !showLastFrame && (
            <img 
              src={`${process.env.PUBLIC_URL}/images/loading.gif`}
              alt="로딩 중"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />
          )}
          
          {/* 마지막 프레임 이미지 */}
          {showLastFrame && lastFrameLoaded && (
            <motion.img 
              src={`${process.env.PUBLIC_URL}/images/last_frame.jpg`}
              alt="로딩 완료"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 2
              }}
            />
          )}
          
          <div className="loading-content" style={{ position: 'relative', zIndex: 3 }}>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 