import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import "../styles/main.css";

// gallery 폴더의 모든 이미지를 동적으로 로드
const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return null;
  });
  return images;
};

// assets/gallery 폴더의 모든 이미지 가져오기
const galleryImages = importAll(
  require.context('../assets/gallery', false, /\.(png|jpe?g|svg)$/i)
);

// 이미지 배열 생성 (파일명 기준으로 정렬)
const allImages = Object.keys(galleryImages)
  .sort() // 파일명 기준 정렬
  .map((fileName, index) => ({
    id: index + 1,
    src: galleryImages[fileName],
    alt: `웨딩 사진 ${index + 1}`,
    title: `웨딩 사진 ${index + 1}`
  }));

// Shuffle the allImages array to display images in random order
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffleArray(allImages);

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [additionalImagesLoaded, setAdditionalImagesLoaded] = useState(false);
  const galleryGridRef = useRef(null);

  // 갤러리 끝 부분 감지를 위한 Intersection Observer
  const { ref: loadTriggerObserverRef, inView: nearEnd } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // 표시할 이미지들 (확장 여부에 따라)
  const displayImages = isExpanded ? allImages : allImages.slice(0, 12);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(allImages[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const toggleExpanded = () => {
    const wasExpanded = isExpanded;
    setIsExpanded(!isExpanded); // UI 즉시 업데이트
    
    // 더보기를 클릭했을 때 (확장할 때) 추가 이미지들 백그라운드에서 로드
    if (!wasExpanded && !additionalImagesLoaded) {
      console.log('더보기 클릭 - 추가 이미지 백그라운드 프리로드 시작');
      const additionalImages = allImages.slice(12);
      
      // 백그라운드에서 비동기로 프리로드 (UI 블로킹 없음)
      additionalImages.forEach(image => {
        const img = new Image();
        img.onload = () => {
          console.log(`이미지 로드 완료: ${image.id}`);
        };
        img.onerror = () => {
          console.log(`이미지 로드 실패: ${image.id}`);
        };
        img.src = image.src;
      });
      
      setAdditionalImagesLoaded(true); // 프리로드 시작했음을 표시
    }
  };

  // 갤러리 끝 부분에 스크롤할 때 추가 이미지들 프리로드
  useEffect(() => {
    if (nearEnd && !isExpanded && !additionalImagesLoaded) {
      console.log('갤러리 끝 부분 도달 - 추가 이미지 프리로드 시작');
      const additionalImages = allImages.slice(12);
      
      const preloadAdditionalImages = async () => {
        const imagePromises = additionalImages.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = image.src;
          });
        });
        
        try {
          await Promise.all(imagePromises);
          console.log('추가 갤러리 이미지 프리로딩 완료');
          setAdditionalImagesLoaded(true);
        } catch (error) {
          console.log('일부 추가 이미지 로딩 실패:', error);
        }
      };

      preloadAdditionalImages();
    }
  }, [nearEnd, isExpanded, additionalImagesLoaded]);

  // 모든 이미지 미리 로드 및 터치 이벤트 최적화
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = allImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        console.log('모든 갤러리 이미지 프리로딩 완료');
      } catch (error) {
        console.log('일부 이미지 로딩 실패:', error);
      }
    };

    // 터치 이벤트 최적화
    const handleTouchStart = (e) => {
      // passive 이벤트 리스너로 처리
    };
    
    const handleTouchMove = (e) => {
      // passive 이벤트 리스너로 처리
    };

    preloadImages();
    
    // passive 이벤트 리스너 등록
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []); // 빈 의존성 배열로 한 번만 실행

  return (
    <motion.section
      className="gallery"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>갤러리</h2>
      
      <div className="gallery-grid" ref={galleryGridRef}>
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: index < 12 ? 0.6 : 0.3, // 더보기 이미지들은 더 빠른 애니메이션
              delay: index < 12 ? index * 0.1 : 0 // 더보기 이미지들은 지연 없이 즉시 표시
            }}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              loading={index < 12 ? "lazy" : "eager"}
              decoding="async"
            />
          </motion.div>
        ))}
      </div>

      {/* 갤러리 끝 부분 감지를 위한 트리거 요소 (더보기 버튼이 보이지 않을 때만) */}
      {!isExpanded && (
        <div 
          ref={loadTriggerObserverRef}
          style={{ height: '1px', marginTop: '1rem' }}
        />
      )}

      {/* 더보기/접기 버튼 */}
      <motion.button
        className="toggle-btn"
        onClick={toggleExpanded}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginTop: '2rem' }}
      >
        {isExpanded ? '접기' : '더보기'} 
        <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
      </motion.button>

      {/* 모달 슬라이더 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              
              <button className="modal-btn prev" onClick={prevSlide}>
                &#8249;
              </button>
              
              <div className="modal-image-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>
              
              <button className="modal-btn next" onClick={nextSlide}>
                &#8250;
              </button>
              
              <div className="modal-counter">
                {currentIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery; 