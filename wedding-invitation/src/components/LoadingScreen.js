import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showLastFrame, setShowLastFrame] = useState(false);
  const [lastFrameLoaded, setLastFrameLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    // 개발 모드에서 강제 로딩 리셋 (콘솔에서 resetLoading() 호출 가능)
    if (process.env.NODE_ENV === 'development') {
      window.resetLoading = () => {
        sessionStorage.removeItem('lastLoadingTime');
        window.location.reload();
      };
    }
    
    // 최근 로딩 완료 시간 확인 (5초 이내면 로딩 스킵)
    const lastLoadingTime = sessionStorage.getItem('lastLoadingTime');
    const now = Date.now();
    
    if (lastLoadingTime && (now - parseInt(lastLoadingTime)) < 5000) {
      // 최근에 로딩했으면 즉시 완료
      setIsComplete(true);
      setTimeout(() => onComplete(), 100);
      return;
    }

    // GIF와 마지막 프레임 이미지 미리 로드
    const gifImg = new Image();
    const lastFrameImg = new Image();
    
    let loadStartTime = Date.now();
    
    const handleImagesLoaded = () => {
      if (gifLoaded && lastFrameLoaded) {
        const loadTime = Date.now() - loadStartTime;
        const minLoadingTime = 3000; // 최소 로딩 시간 (2000 → 3500)
        
        // 로딩이 너무 빨리 끝나면 최소 시간까지 대기
        const waitTime = Math.max(0, minLoadingTime - loadTime);
        
        setTimeout(() => {
          setShowLastFrame(true);
          
          // 마지막 프레임 표시 후 완료
          setTimeout(() => {
            setIsComplete(true);
            sessionStorage.setItem('lastLoadingTime', Date.now().toString());
            setTimeout(() => onComplete(), 800); // 300 → 800
          }, 1200); // 500 → 1200
        }, waitTime);
      }
    };
    
    gifImg.onload = () => {
      setGifLoaded(true);
      handleImagesLoaded();
    };
    
    lastFrameImg.onload = () => {
      setLastFrameLoaded(true);
      handleImagesLoaded();
    };
    
    // 에러 처리
    gifImg.onerror = () => {
      console.warn('GIF 로딩 실패, 기본 로딩으로 전환');
      setGifLoaded(true);
      handleImagesLoaded();
    };
    
    lastFrameImg.onerror = () => {
      console.warn('마지막 프레임 로딩 실패');
      setLastFrameLoaded(true);
      handleImagesLoaded();
    };
    
    gifImg.src = `${process.env.PUBLIC_URL}/images/combined-webp/loading.gif`;
    lastFrameImg.src = `${process.env.PUBLIC_URL}/images/combined-webp/last_frame.webp`;
    
    // 최대 대기 시간 설정 (5초)
    const maxWaitTimer = setTimeout(() => {
      if (!isComplete) {
        setIsComplete(true);
        sessionStorage.setItem('lastLoadingTime', Date.now().toString());
        onComplete();
      }
    }, 5000);
    
    return () => {
      clearTimeout(maxWaitTimer);
    };
  }, [onComplete, isComplete, gifLoaded, lastFrameLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* GIF 이미지 */}
          {gifLoaded && !showLastFrame && (
            <img 
              src={`${process.env.PUBLIC_URL}/images/combined-webp/loading.gif?t=${Date.now()}`}
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
              onLoad={() => console.log('GIF 로드 완료')}
            />
          )}
          
          {/* 마지막 프레임 이미지 */}
          {showLastFrame && lastFrameLoaded && (
            <motion.img 
              src={`${process.env.PUBLIC_URL}/images/combined-webp/last_frame.webp`}
              alt="로딩 완료"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
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