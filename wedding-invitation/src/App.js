import React, { useState, useEffect } from "react";
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
import "./styles/main.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeroText, setShowHeroText] = useState(false);

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

  return (
    <div className="App">
      {/* Hero 이미지는 항상 렌더링, 텍스트는 타이밍에 따라 */}
      <Header isLoading={isLoading} showHeroText={showHeroText} />
      
      {/* 로딩 스크린 오버레이 */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* 나머지 컨텐츠는 로딩 완료 후 표시 */}
      {!isLoading && (
        <>
          <CoupleInfo />
        
          
          {/* <TabSection /> */}
          <WeddingInfo />
          <Countdown />
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
          {/* <Timeline /> */}
          
          {/* <GuestSnap /> */}
          <Directions />
          <AccountInfo />
          <Footer />
        </>
      )}
      
      {/* 맨위로가기 버튼 - 항상 표시 */}
      <ScrollToTop />
    </div>
  );
}

export default App;
