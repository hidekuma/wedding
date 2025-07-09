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
      description: "청주 대표 소금빵 맛집, 갓 구운 소금빵",
      url: "https://naver.me/Fmf5R1eL"
    },
    {
      category: "맛집",
      name: "시옷기억삐읍 지점",
      url: "https://naver.me/G4WowlJY"
    },
    {
      category: "맛집",
      name: "청주 쫄쫄 호떡",
      description: "청주 대표 호떡 맛집, 쫄깃하고 달콤한 호떡",
      url: "https://naver.me/xxY2zIhP"
    },
    {
        category: "맛집",
        name: "심봉사고로케",
        description: "고로케 맛집, 바삭한 튀김과 속이 꽉 찬 고로케",
        url: "https://naver.me/xzxJwrD7"
    },
    {
        category: "맛집", 
        name: "새암골송어",
        description: "자연산 송어요리 전문점, 신선한 송어회와 매운탕",
        url: "https://naver.me/GgWasTM4"
      },
  ];

  const cafes = [
    {
      category: "카페",
      name: "네가이", 
      description: "일본풍 분위기의 카페, 주차장 넓은편",
      url: "https://naver.me/GFCHd2rX"
    },
    {
      category: "카페",
      name: "테크네클럽리포트",
      description: "운리단길에 위치하고 근처는 카페거리, 주차는 고인쇄박물관 주차장",
      url: "https://naver.me/GbDFjEde"
    },
    {
        category: "카페",
        name: "뉴웨이브",
        description: "결혼식장 바로 옆에 위치한 카페",
        url: "https://naver.me/502IfZL6"
      },
      {
        category: "카페",
        name: "온더로드",
        description: "주차장은 고인쇄박물관 주차장",
        url: "https://naver.me/xVBhC6ZF"
      },
    {
      category: "카페",
      name: "홀리몰리",
      description: "예식장 근처는 아니지만, 오창저수지를 볼수있는 뷰 카페",
      url: "https://naver.me/Fmf6OlYk"
    },
    {
      category: "카페",
      name: "동부창고 카페C",
      description: "창고형 넓은 카페, 주차장 넓은편",
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