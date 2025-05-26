import React, { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import CoupleInfo from "./components/CoupleInfo";
import Countdown from "./components/Countdown";
import Interview from "./components/Interview";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import ExtraGallery from "./components/ExtraGallery";
import Quote from "./components/Quote";
import TabSection from "./components/TabSection";
import WeddingInfo from "./components/WeddingInfo";
import GuestSnap from "./components/GuestSnap";
import Directions from "./components/Directions";
import AccountInfo from "./components/AccountInfo";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Header />
          <CoupleInfo />
          <Countdown />
          <Interview />
          <Timeline />
          <Gallery />
          <ExtraGallery />
          <Quote />
          <TabSection />
          <WeddingInfo />
          <GuestSnap />
          <Directions />
          <AccountInfo />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
