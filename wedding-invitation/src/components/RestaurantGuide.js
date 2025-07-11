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
      name: "시옷기억삐읍 본점",
      description: "주차 가능 / 3분",
      url: "https://naver.me/Fmf5R1eL"
    },
    {
      category: "맛집",
      name: "봉용불고기",
      description: "주차 가능 / 11분",
      url: "https://naver.me/FCA8YYwP"
    },
    {
      category: "맛집",
      name: "심봉사고로케",
      description: "공영주차장 이용 / 11분",
      url: "https://naver.me/xzxJwrD7"
    },
    {
      category: "맛집",
      name: "코끼리만두",
      description: "공영주차장 이용 / 14분",
      url: "https://naver.me/GrmaFinW"
    },
    {
      category: "맛집",
      name: "청주 쫄쫄 호떡",
      description: "주차 애매 / 16분",
      url: "https://naver.me/xxY2zIhP"
    },
    {
      category: "맛집", 
      name: "새암골송어",
      description: "주차가능 / 18분",
      url: "https://naver.me/GgWasTM4"
    }
  ];

  const cafes = [
    {
      category: "카페",
      name: "뉴웨이브",
      description: "주차가능 / 1분",
      url: "https://naver.me/502IfZL6"
    },
    {
      category: "카페",
      name: "우소빵",
      description: "주차가능 / 4분",
      url: "https://naver.me/FtTbHipB"
    },
    {
      category: "카페",
      name: "네가이", 
      description: "주차가능 / 5분",
      url: "https://naver.me/GFCHd2rX"
    },
    {
      category: "카페",
      name: "동부창고 카페C",
      description: "주차가능 / 8분",
      url: "https://naver.me/FHlXLlzC"
    },
    {
      category: "카페",
      name: "듀레베이커리",
      description: "명암점, 주차가능 / 10분",
      url: "https://naver.me/5UEcx3aj"
    },
    {
      category: "카페",
      name: "테크네클럽리포트",
      description: "공영주차장 / 11분",
      url: "https://naver.me/GbDFjEde"
    },
    {
      category: "카페",
      name: "호퍼",
      description: "공영주차장 이용 / 13분",
      url: "https://naver.me/5ne4Emk7"
    },
    {
      category: "카페",
      name: "오지",
      description: "주차가능 / 13분",
      url: "https://naver.me/FMcgbb9G"
    },
    {
      category: "카페",
      name: "온더로드",
      description: "공영주차장 이용 / 13분",
      url: "https://naver.me/xVBhC6ZF"
    },
    {
      category: "카페",
      name: "흥흥제과",
      description: "공영주차장 이용 / 14분",
      url: "https://naver.me/GfCsxTLm"
    },
    {
      category: "카페",
      name: "해호미",
      description: "공영주차장 이용 / 14분",
      url: "https://naver.me/GvcTloV3"
    },
    {
      category: "카페",
      name: "컨트리하우스",
      description: "주차가능 / 16분",
      url: "https://naver.me/FHljn3RR"
    },
    {
      category: "카페",
      name: "공간시필",
      description: "주차가능 / 17분",
      url: "https://naver.me/GdyGtkki"
    },
    {
      category: "카페",
      name: "홀리몰리",
      description: "주차가능(유료) / 17분",
      url: "https://naver.me/Fmf6OlYk"
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