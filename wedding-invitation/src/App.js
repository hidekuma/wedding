import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import CoupleInfo from "./components/CoupleInfo";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import ErrorBoundary from "./components/ErrorBoundary";
// import TabSection from "./components/TabSection";
import WeddingInfo from "./components/WeddingInfo";
// import GuestSnap from "./components/GuestSnap";
import Directions from "./components/Directions";
import AccountInfo from "./components/AccountInfo";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PetalFall from "./components/PetalFall";
import "./styles/main.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeroText, setShowHeroText] = useState(false);

  // 예식안내 섹션 감지용 ref
  const { ref: weddingInfoRef, inView: weddingInfoInView } = useInView({
    threshold: 0.1, // 10%만 보여도 활성화
    rootMargin: '0px 0px 0px 0px' // 마진 제거
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // 로딩 완료와 동시에 hero 텍스트 표시
    setTimeout(() => {
      setShowHeroText(true);
    }, 200);
  };

  // 최근 로딩 완료 시간 확인하여 즉시 표시
  useEffect(() => {
    const lastLoadingTime = sessionStorage.getItem('lastLoadingTime');
    const now = Date.now();
    
    if (lastLoadingTime && (now - parseInt(lastLoadingTime)) < 5000) {
      // 최근에 로딩했으면 즉시 표시
      setIsLoading(false);
      setShowHeroText(true);
    }
  }, []);

  // 전역 에러 핸들러 (구글 맵스 등 외부 스크립트 에러 포착)
  useEffect(() => {
    const handleGlobalError = (event) => {
      // 구글 맵스 관련 에러 포착
      if (event.filename && (
        event.filename.includes('maps.google') ||
        event.filename.includes('maps.googleapis.com') ||
        event.filename.includes('embed')
      )) {
        console.error('구글 맵스 에러 감지:', event.error);
        event.preventDefault(); // 페이지 리프레시 방지
        return false;
      }
      
      // 기타 JavaScript 에러들
      if (event.error && event.error.message) {
        console.error('전역 에러 포착:', event.error.message);
      }
    };

    const handleUnhandledRejection = (event) => {
      console.error('처리되지 않은 Promise rejection:', event.reason);
      event.preventDefault(); // 페이지 리프레시 방지
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <div className="App">
      {/* Hero 이미지는 항상 렌더링, 텍스트는 타이밍에 따라 */}
      <Header isLoading={isLoading} showHeroText={showHeroText} />
      
      {/* 로딩 스크린 오버레이 */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* 꽃잎 날리는 효과 - 예식안내 섹션 부터 활성화 */}
      {!isLoading && <PetalFall isActive={weddingInfoInView} petalCount={50} />}
      
      {/* 나머지 컨텐츠는 로딩 완료 후 표시 */}
      {!isLoading && (
        <>
          <CoupleInfo />
        
          
          {/* <TabSection /> */}
          <div ref={weddingInfoRef}>
            <WeddingInfo />
            <Countdown />
            <ErrorBoundary>
              <Gallery />
            </ErrorBoundary>
            {/* <Timeline /> */}
            
            {/* <GuestSnap /> */}
            <ErrorBoundary>
              <Directions />
            </ErrorBoundary>
            <AccountInfo />
            <Footer />
          </div>
        </>
      )}
      
      {/* 맨위로가기 버튼 - 항상 표시 */}
      <ScrollToTop />
    </div>
  );
}

export default App;
