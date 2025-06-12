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
  '1Y4A3911.webp',
  'NHH01508_1.webp',
  'NHH01518_1.webp',
  'NHH01524_1.webp',
  'NHH01548_1.webp',
  
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
// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// };

// shuffleArray(allImages);

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTriggered, setExpandedTriggered] = useState(false); // 더보기 클릭 트리거 상태
  // const [preloadedImages, setPreloadedImages] = useState(new Set()); // 주석 처리
  const [isTransitioning, setIsTransitioning] = useState(false);
  const galleryGridRef = useRef(null);
  const preloadingRef = useRef(false);
  const preloadedImagesRef = useRef(new Set());
  const initialPreloadDone = useRef(false);
  const additionalPreloadDone = useRef(false);
  const transitionTimeoutRef = useRef(null);

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
        // setPreloadedImages(prev => new Set([...prev, imageSrc])); // 제거
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

  // 배치 단위로 이미지 프리로딩
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
  }, [preloadImageSafely]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(allImages[index]);
  };

  const closeModal = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedImage(null);
  }, []);

  const nextSlide = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isTransitioning) return; // 애니메이션 진행 중이면 무시
    
    // 이전 타이머가 있으면 취소
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setIsTransitioning(true);
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
    
    // 안전한 타이머로 상태 해제
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 200); // 더 빠른 전환
  }, [isTransitioning, currentIndex]);

  const prevSlide = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isTransitioning) return; // 애니메이션 진행 중이면 무시
    
    // 이전 타이머가 있으면 취소
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setIsTransitioning(true);
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
    
    // 안전한 타이머로 상태 해제
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 200); // 더 빠른 전환
  }, [isTransitioning, currentIndex]);

  // handleAnimationComplete 제거 - 사용되지 않음

  const toggleExpanded = useCallback(() => {
    const wasExpanded = isExpanded;
    setIsExpanded(!isExpanded);
    
    // 더보기를 클릭했을 때 (확장할 때) 애니메이션 트리거 및 이미지 로드
    if (!wasExpanded) {
      // 애니메이션 트리거 설정
      setExpandedTriggered(true);
      
      // 추가 이미지들 백그라운드에서 로드
      if (!additionalPreloadDone.current && !preloadingRef.current) {
        console.log('더보기 클릭 - 추가 이미지 백그라운드 프리로드 시작');
        additionalPreloadDone.current = true;
        const additionalImages = allImages.slice(12);
        
        // 비동기로 배치 프리로딩 실행
        preloadImagesBatch(additionalImages).catch(err => {
          console.error('추가 이미지 프리로딩 실패:', err);
        });
      }
    } else {
      // 접기를 클릭했을 때 애니메이션 트리거 리셋
      setExpandedTriggered(false);
    }
  }, [isExpanded, preloadImagesBatch]);

  // 갤러리 끝 부분에 스크롤할 때 추가 이미지들 프리로드 (한 번만 실행)
  useEffect(() => {
    if (nearEnd && !isExpanded && !additionalPreloadDone.current && !preloadingRef.current) {
      console.log('갤러리 끝 부분 도달 - 추가 이미지 프리로드 시작');
      additionalPreloadDone.current = true;
      const additionalImages = allImages.slice(12);
      
      preloadImagesBatch(additionalImages).catch(err => {
        console.error('갤러리 끝 프리로딩 실패:', err);
      });
    }
  }, [nearEnd, isExpanded, preloadImagesBatch]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        default:
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, currentIndex, isTransitioning, closeModal, nextSlide, prevSlide]);

  // 모달 열림/닫힘 시 배경 스크롤 제어
  useEffect(() => {
    if (selectedImage) {
      // 모달이 열릴 때 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = '';
    }
    
    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = '';
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
  }, [inView, preloadImagesBatch]);

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
      
      // 전환 타이머 정리
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
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
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      <h2>갤러리</h2>
      
      <div className="gallery-grid" ref={galleryGridRef}>
        {displayImages.map((image, index) => {
          const isInitialImage = index < 12; // 첫 12개 이미지인지 확인
          const isAdditionalImage = index >= 12; // 추가 이미지인지 확인
          
          // 그룹 계산
          const groupIndex = Math.floor(index / 4);
          const withinGroupIndex = index % 4;
          
          // 기본 이미지는 inView 기준, 추가 이미지는 expandedTriggered 기준
          const shouldAnimate = isInitialImage ? inView : (inView && expandedTriggered);
          
          // 추가 이미지의 경우 그룹 인덱스를 0부터 다시 계산
          const adjustedGroupIndex = isAdditionalImage ? Math.floor((index - 12) / 4) : groupIndex;
          const delay = adjustedGroupIndex * 0.4 + withinGroupIndex * 0.05;
          
          return (
            <motion.div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(index)}
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: delay,
                ease: "easeOut"
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
                  // setPreloadedImages(prev => new Set([...prev, image.src])); // 제거
                }}
              />
            </motion.div>
          );
        })}
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
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        style={{ marginTop: '2rem' }}
      >
        {isExpanded ? '접기' : '더보기'} 
        <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
      </motion.button>

      {/* 모달 슬라이더 */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="gallery-modal"
            style={{ 
              opacity: selectedImage ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal(e);
              }
            }}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                className="modal-close" 
                onClick={closeModal}
                onMouseDown={(e) => e.preventDefault()}
              >
                ×
              </button>
              
              <button 
                type="button"
                className={`modal-btn prev ${isTransitioning ? 'disabled' : ''}`}
                onClick={prevSlide}
                onMouseDown={(e) => e.preventDefault()}
                disabled={isTransitioning}
              >
                &#8249;
              </button>
              
              <div className="modal-image-container">
                <img
                  key={currentIndex}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  style={{
                    opacity: isTransitioning ? 0.7 : 1,
                    transition: 'opacity 0.2s ease',
                    maxWidth: '95vw',
                    maxHeight: '85vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '4px'
                  }}
                  onError={(e) => {
                    console.warn(`모달 이미지 로드 실패: ${selectedImage.src}`);
                  }}
                  onLoad={() => {
                    preloadedImagesRef.current.add(selectedImage.src);
                    // setPreloadedImages(prev => new Set([...prev, selectedImage.src])); // 제거
                  }}
                  draggable={false}
                />
              </div>
              
              <button 
                type="button"
                className={`modal-btn next ${isTransitioning ? 'disabled' : ''}`}
                onClick={nextSlide}
                onMouseDown={(e) => e.preventDefault()}
                disabled={isTransitioning}
              >
                &#8250;
              </button>
              
              <div className="modal-counter">
                <span style={{ opacity: isTransitioning ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                  {currentIndex + 1} / {allImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery; 