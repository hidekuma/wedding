import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const RestaurantGuide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.2 
  });
  
  const restaurants = [
    {
      category: "맛집",
      name: "코끼리만두",
      description: "청주 유명한 만두 맛집, 웨이팅 있을수 있음 (차로 14분)",
      url: "https://naver.me/GrmaFinW"
    },
    {
      category: "맛집",
      name: "봉용불고기",
      description: "또간집 1등, 주차 가능하고 편리함 (차로 11분)",
      url: "https://naver.me/FCA8YYwP"
    },
    {
      category: "맛집",
      name: "심봉사고로케",
      description: "고로케 맛집, 바삭한 튀김과 속이 꽉 찬 고로케 (차로 11분)",
      url: "https://naver.me/xzxJwrD7"
    },
    {
      category: "맛집", 
      name: "새암골송어",
      description: "자연산 송어요리 전문점, 신선한 송어회와 매운탕, 주차 넓음 (차로 18분)",
      url: "https://naver.me/GgWasTM4"
    },
    {
      category: "맛집",
      name: "시옷기억삐읍 본점",
      description: "청주 대표 소금빵 맛집, 웨이팅 있을수도, 주차 좀 어려움 (차로 3분)",
      url: "https://naver.me/Fmf5R1eL"
    },
    {
      category: "맛집",
      name: "청주 쫄쫄 호떡",
      description: "청주 대표 호떡 맛집, 쫄깃하고 달콤한 호떡, 주차 좀 어려움 (차로 16분)",
      url: "https://naver.me/xxY2zIhP"
    }
  ];

  const cafes = [
    {
      category: "카페",
      name: "공간시필",
      description: "대형카페, 단체석 보유 (차로 17분)",
      url: "https://naver.me/GdyGtkki"
    },
    {
      category: "카페",
      name: "컨트리하우스",
      description: "대형카페, 주차장 넓음, 내부 넓음 (차로 16분)",
      url: "https://naver.me/FHljn3RR"
    },
    {
      category: "카페",
      name: "듀레베이커리",
      description: "청주명암점, 대형카페, 소금빵·딸기케이크 유명 (차로 10분)",
      url: "https://naver.me/5UEcx3aj"
    },
    {
      category: "카페",
      name: "일면식",
      description: "감성카페, 매장앞 갓길 or 현대미술관 주차 (차로 9분)",
      url: "https://naver.me/GV2tVzDq"
    },
    {
      category: "카페",
      name: "흥흥제과",
      description: "과일타르트 맛집, 공영주차장 이용 (차로 14분)",
      url: "https://naver.me/GfCsxTLm"
    },
    {
      category: "카페",
      name: "해호미",
      description: "감성 카페, 카페 주변 공영주차장 무료 (차로 14분)",
      url: "https://naver.me/GvcTloV3"
    },
    {
      category: "카페",
      name: "리페어룸",
      description: "감성 카페, 주차불가, 과일산도 맛집 (차로 14분)",
      url: "https://naver.me/GtURNlr2"
    },
    {
      category: "카페",
      name: "호퍼",
      description: "감성 카페, 라떼 맛집, 공영주차장 이용 (차로 13분)",
      url: "https://naver.me/5ne4Emk7"
    },
    {
      category: "카페",
      name: "오지",
      description: "청주가 한눈에 내려다보이는 전망 좋은 카페, 대형카페 (차로 13분)",
      url: "https://naver.me/FMcgbb9G"
    },
    {
      category: "카페",
      name: "우리베이커리",
      description: "초코케이크 맛집, 포장만 가능 (차로 20분)",
      url: "https://naver.me/xcnaSBDt"
    },
    {
      category: "카페",
      name: "우소빵",
      description: "소금빵 맛집, 건물 뒷편 주차 (차로 4분)",
      url: "https://naver.me/FtTbHipB"
    },
    {
      category: "카페",
      name: "네가이", 
      description: "일본풍 카페, 건물 옆 주차 (차로 5분)",
      url: "https://naver.me/GFCHd2rX"
    },
    {
      category: "카페",
      name: "온더로드",
      description: "운리단길 카페, 고인쇄 박물관 공영주차장 이용 (차로 13분)",
      url: "https://naver.me/xVBhC6ZF"
    },
    {
      category: "카페",
      name: "테크네클럽리포트",
      description: "운리단길 카페, 고인쇄 박물관 공영주차장 이용 (차로 11분)",
      url: "https://naver.me/GbDFjEde"
    },
    {
      category: "카페",
      name: "뉴웨이브",
      description: "가장 가까이에 있는 카페 (차로 1분)",
      url: "https://naver.me/502IfZL6"
    },
    {
      category: "카페",
      name: "홀리몰리",
      description: "오창저수지 뷰를 한번에 볼수있는 카페 (차로 17분)",
      url: "https://naver.me/Fmf6OlYk"
    },
    {
      category: "카페",
      name: "동부창고 카페C",
      description: "창고형태의  넓은 카페, 편안한 분위기 (차로 8분)",
      url: "https://naver.me/FHlXLlzC"
    }
  ];

  // 모달 열림/닫힘 시 배경 스크롤 제어
  useEffect(() => {
    const html = document.documentElement;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      html.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      html.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <motion.button 
        ref={ref}
        className="restaurant-guide-btn"
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        🍽️ 청주 추천 맛집 & 카페
      </motion.button>

      {/* 추천 맛집 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="restaurant-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="restaurant-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="restaurant-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              
              <h3>추천 맛집 & 카페</h3>
              <p className="restaurant-modal-subtitle">결혼식 전후로 들러보시면 좋을 곳들을 추천드려요</p>
              
              <div className="restaurant-lists">
                {/* 맛집 섹션 */}
                <div className="restaurant-category">
                  <h4 className="category-title">🍴 맛집</h4>
                  <div className="restaurant-items">
                    {restaurants.map((restaurant, index) => (
                      <div 
                        key={index} 
                        className="restaurant-item"
                        onClick={() => handleLinkClick(restaurant.url)}
                      >
                        <div className="restaurant-name">{restaurant.name}</div>
                        <div className="restaurant-description">{restaurant.description}</div>
                        <div className="restaurant-link">네이버 지도에서 보기</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 카페 섹션 */}
                <div className="restaurant-category">
                  <h4 className="category-title">☕ 카페</h4>
                  <div className="restaurant-items">
                    {cafes.map((cafe, index) => (
                      <div 
                        key={index} 
                        className="restaurant-item"
                        onClick={() => handleLinkClick(cafe.url)}
                      >
                        <div className="restaurant-name">{cafe.name}</div>
                        <div className="restaurant-description">{cafe.description}</div>
                        <div className="restaurant-link">네이버 지도에서 보기</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RestaurantGuide; 