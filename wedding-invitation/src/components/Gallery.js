import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/main.css";

// 웨딩 사진 파일명들 (실제 파일명에 맞게 수정)
const imageFileNames = [
  '1Y4A2333.webp',
  '1Y4A2641.webp',
  '1Y4A2679.webp',
  '1Y4A2748.webp',
  '1Y4A2769.webp',
  '1Y4A2799.webp',
  '1Y4A2968.webp',
  '1Y4A3199.webp',
  '1Y4A3216.webp',
  '1Y4A3500.webp',
  '1Y4A3553.webp',
  '1Y4A3571.webp',
  '1Y4A3716.webp',
  '1Y4A3749.webp',
  '1Y4A3832.webp',
  '1Y4A3861.webp',
  '1Y4A3878.webp',
  '1Y4A3889.webp',
  '1Y4A3911.webp'
];

// 이미지 배열 생성 (public 폴더의 webp 이미지 사용)
const allImages = imageFileNames.map((fileName, index) => {
  return {
    id: index + 1,
    src: `${process.env.PUBLIC_URL}/images/gallery-webp/${fileName}`,
    alt: `웨딩 사진 ${index + 1}`,
    title: `웨딩 사진 ${index + 1}`
  };
});

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
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const galleryGridRef = useRef(null);
  const preloadingRef = useRef(false);
  const preloadedImagesRef = useRef(new Set());
  const initialPreloadDone = useRef(false);
  const additionalPreloadDone = useRef(false);

  // 갤러리 끝 부분 감지를 위한 Intersection Observer
  const { ref: loadTriggerObserverRef, inView: nearEnd } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // 표시할 이미지들 (확장 여부에 따라)
  const displayImages = isExpanded ? allImages : allImages.slice(0, 12);

  // 안전한 이미지 프리로딩 함수 (의존성 제거)
  const preloadImageSafely = useCallback((imageSrc, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      if (preloadedImagesRef.current.has(imageSrc)) {
        resolve(imageSrc);
        return;
      }

      const img = new Image();
      const timeoutId = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        reject(new Error(`Image load timeout: ${imageSrc}`));
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        preloadedImagesRef.current.add(imageSrc);
        setPreloadedImages(prev => new Set([...prev, imageSrc]));
        resolve(imageSrc);
      };

      img.onerror = (error) => {
        clearTimeout(timeoutId);
        console.warn(`이미지 로드 실패: ${imageSrc}`, error);
        reject(error);
      };

      img.src = imageSrc;
    });
  }, []); // 의존성 배열 비움

  // 배치 단위로 이미지 프리로딩 (의존성 제거)
  const preloadImagesBatch = useCallback(async (images, batchSize = 3) => {
    if (preloadingRef.current) return;
    preloadingRef.current = true;

    try {
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);
        const batchPromises = batch.map(image => 
          preloadImageSafely(image.src).catch(err => {
            console.warn(`배치 이미지 로드 실패:`, err);
            return null;
          })
        );
        
        await Promise.allSettled(batchPromises);
        
        // 배치 간 약간의 지연을 두어 브라우저 부하 감소
        if (i + batchSize < images.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      console.log('이미지 배치 프리로딩 완료');
    } catch (error) {
      console.error('이미지 배치 프리로딩 중 오류:', error);
    } finally {
      preloadingRef.current = false;
    }
  }, []); // 의존성 배열 비움

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

  const toggleExpanded = useCallback(() => {
    const wasExpanded = isExpanded;
    setIsExpanded(!isExpanded);
    
    // 더보기를 클릭했을 때 (확장할 때) 추가 이미지들 백그라운드에서 로드
    if (!wasExpanded && !additionalPreloadDone.current && !preloadingRef.current) {
      console.log('더보기 클릭 - 추가 이미지 백그라운드 프리로드 시작');
      additionalPreloadDone.current = true;
      const additionalImages = allImages.slice(12);
      
      // 비동기로 배치 프리로딩 실행
      preloadImagesBatch(additionalImages).then(() => {
        setAdditionalImagesLoaded(true);
      }).catch(err => {
        console.error('추가 이미지 프리로딩 실패:', err);
      });
    }
  }, [isExpanded]); // 의존성 최소화

  // 갤러리 끝 부분에 스크롤할 때 추가 이미지들 프리로드 (한 번만 실행)
  useEffect(() => {
    if (nearEnd && !isExpanded && !additionalPreloadDone.current && !preloadingRef.current) {
      console.log('갤러리 끝 부분 도달 - 추가 이미지 프리로드 시작');
      additionalPreloadDone.current = true;
      const additionalImages = allImages.slice(12);
      
      preloadImagesBatch(additionalImages).then(() => {
        setAdditionalImagesLoaded(true);
      }).catch(err => {
        console.error('갤러리 끝 프리로딩 실패:', err);
      });
    }
  }, [nearEnd, isExpanded]); // 의존성 최소화

  // 모달 열림/닫힘 시 배경 스크롤 제어
  useEffect(() => {
    if (selectedImage) {
      // 모달이 열릴 때 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = 'unset';
    }
    
    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // 초기 이미지들만 프리로드 (첫 12개 이미지, 한 번만 실행)
  useEffect(() => {
    if (inView && !initialPreloadDone.current && !preloadingRef.current) {
      initialPreloadDone.current = true;
      const initialImages = allImages.slice(0, 12);
      console.log('초기 갤러리 이미지 프리로드 시작');
      
      preloadImagesBatch(initialImages).catch(err => {
        console.error('초기 이미지 프리로딩 실패:', err);
      });
    }
  }, [inView]); // 의존성 최소화

  // 에러 경계 처리
  useEffect(() => {
    const handleError = (event) => {
      if (event.target && event.target.tagName === 'IMG') {
        console.error('이미지 로드 에러:', event.target.src);
      }
    };

    document.addEventListener('error', handleError, true);
    
    return () => {
      document.removeEventListener('error', handleError, true);
    };
  }, []);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      // 진행 중인 프리로딩 중단
      preloadingRef.current = false;
      
      // 스크롤 복원
      document.body.style.overflow = 'unset';
      
      console.log('갤러리 컴포넌트 cleanup 완료');
    };
  }, []);

  return (
    <motion.section
      className="gallery"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>갤러리</h2>
      
      <div className="gallery-grid" ref={galleryGridRef}>
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ 
              duration: index < 12 ? 0.6 : 0.3, // 더보기 이미지들은 더 빠른 애니메이션
              delay: index < 12 ? index * 0.1 : 0 // 더보기 이미지들은 지연 없이 즉시 표시
            }}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
              onError={(e) => {
                console.warn(`갤러리 이미지 로드 실패: ${image.src}`);
                e.target.style.display = 'none'; // 실패한 이미지 숨김
              }}
              onLoad={() => {
                preloadedImagesRef.current.add(image.src);
                setPreloadedImages(prev => new Set([...prev, image.src]));
              }}
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
                    onError={(e) => {
                      console.warn(`모달 이미지 로드 실패: ${selectedImage.src}`);
                    }}
                    onLoad={() => {
                      preloadedImagesRef.current.add(selectedImage.src);
                      setPreloadedImages(prev => new Set([...prev, selectedImage.src]));
                    }}
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