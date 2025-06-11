import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showLastFrame, setShowLastFrame] = useState(false);
  const [lastFrameLoaded, setLastFrameLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    console.log('LoadingScreen useEffect 시작');
    
    // 최근 로딩 완료 시간 확인 (5초 이내면 로딩 스킵)
    const lastLoadingTime = sessionStorage.getItem('lastLoadingTime');
    const now = Date.now();
    
    if (lastLoadingTime && (now - parseInt(lastLoadingTime)) < 5000) {
      console.log('최근 로딩 기록 발견, 즉시 완료');
      setIsComplete(true);
      setTimeout(() => onComplete(), 100);
      return;
    }

    console.log('새로운 로딩 시작');

    // GIF와 마지막 프레임 이미지 미리 로드
    const gifImg = new Image();
    const lastFrameImg = new Image();
    
    let loadStartTime = Date.now();
    let gifLoadComplete = false;
    let lastFrameLoadComplete = false;
    
    const handleImagesLoaded = () => {
      console.log('handleImagesLoaded 호출:', { gifLoadComplete, lastFrameLoadComplete });
      
      if (gifLoadComplete && lastFrameLoadComplete) {
        console.log('모든 이미지 로드 완료');
        const loadTime = Date.now() - loadStartTime;
        const gifLoopTime = 3000; // GIF 한 루프 시간 (3초로 추정)
        
        // GIF가 최소 한 바퀴는 돌 수 있도록 시간 계산
        const waitTime = Math.max(0, gifLoopTime - loadTime);
        console.log(`GIF 한 바퀴 완료까지 대기 시간: ${waitTime}ms`);
        
        setTimeout(() => {
          console.log('GIF 한 바퀴 완료 - 마지막 프레임 표시');
          setShowLastFrame(true);
          
          // 마지막 프레임 표시 후 완료
          setTimeout(() => {
            console.log('로딩 완료 처리');
            setIsComplete(true);
            sessionStorage.setItem('lastLoadingTime', Date.now().toString());
            setTimeout(() => {
              console.log('onComplete 호출');
              onComplete();
            }, 500);
          }, 1000);
        }, waitTime);
      }
    };
    
    gifImg.onload = () => {
      console.log('GIF 로드 완료');
      setGifLoaded(true);
      gifLoadComplete = true;
      handleImagesLoaded();
    };
    
    lastFrameImg.onload = () => {
      console.log('마지막 프레임 로드 완료');
      setLastFrameLoaded(true);
      lastFrameLoadComplete = true;
      handleImagesLoaded();
    };
    
    // 에러 처리
    gifImg.onerror = (error) => {
      console.warn('GIF 로딩 실패:', error);
      setGifLoaded(true);
      gifLoadComplete = true;
      handleImagesLoaded();
    };
    
    lastFrameImg.onerror = (error) => {
      console.warn('마지막 프레임 로딩 실패:', error);
      setLastFrameLoaded(true);
      lastFrameLoadComplete = true;
      handleImagesLoaded();
    };

    // 타임아웃 설정 (5초 후 강제 완료)
    const timeoutId = setTimeout(() => {
      console.warn('로딩 타임아웃, 강제 완료');
      setIsComplete(true);
      setTimeout(() => onComplete(), 100);
    }, 5000);
    
    console.log('이미지 로딩 시작');
    gifImg.src = `${process.env.PUBLIC_URL}/images/combined-webp/loading.gif`;
    lastFrameImg.src = `${process.env.PUBLIC_URL}/images/combined-webp/last_frame.webp`;

    // 클린업 함수
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]); // 의존성 배열에 state를 추가하면 무한 루프 발생

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
              src={`${process.env.PUBLIC_URL}/images/combined-webp/loading.gif`}
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
              onLoad={() => console.log('GIF DOM 로드 완료')}
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