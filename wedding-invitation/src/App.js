import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import CoupleInfo from "./components/CoupleInfo";
import Countdown from "./components/Countdown";
import Interview from "./components/Interview";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Quote from "./components/Quote";
// import TabSection from "./components/TabSection";
import WeddingInfo from "./components/WeddingInfo";
// import GuestSnap from "./components/GuestSnap";
import Directions from "./components/Directions";
import AccountInfo from "./components/AccountInfo";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeroText, setShowHeroText] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // 로딩 시작 후 일정 시간 후 hero 텍스트 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroText(true);
    }, 2500); // 로딩 완료 1초 전에 텍스트 표시

    return () => clearTimeout(timer);
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
          <Gallery />
          {/* <Timeline /> */}
          
          {/* <GuestSnap /> */}
          <Directions />
          <AccountInfo />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
