import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // 모든 웨딩 사진 데이터 (기존 + 추가)
  const allImages = [
    // 기존 갤러리 이미지들
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3911.JPG`,
      alt: "웨딩 사진 1",
      title: "웨딩촬영"
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3889.JPG`,
      alt: "웨딩 사진 2",
      title: "행복한 순간"
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3878.JPG`,
      alt: "웨딩 사진 3",
      title: "사랑의 약속"
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3861.JPG`,
      alt: "웨딩 사진 4",
      title: "드레스 피팅"
    },
    {
      id: 5,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3832.JPG`,
      alt: "웨딩 사진 5",
      title: "웨딩드레스"
    },
    {
      id: 6,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3749.JPG`,
      alt: "웨딩 사진 6",
      title: "부케"
    },
    {
      id: 7,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3716.JPG`,
      alt: "웨딩 사진 7",
      title: "결혼반지"
    },
    {
      id: 8,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3571.JPG`,
      alt: "웨딩 사진 8",
      title: "첫 키스"
    },
    {
      id: 9,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3553.JPG`,
      alt: "웨딩 사진 9",
      title: "영원한 사랑"
    },
    {
      id: 10,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3500.JPG`,
      alt: "웨딩 사진 10",
      title: "함께하는 미래"
    },
    {
      id: 11,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3345.JPG`,
      alt: "웨딩 사진 11",
      title: "행복한 미소"
    },
    {
      id: 12,
      src: `${process.env.PUBLIC_URL}/images/1Y4A3216.JPG`,
      alt: "웨딩 사진 12",
      title: "새로운 시작"
    },
    // 추가 갤러리 이미지들
    {
      id: 13,
      src: `${process.env.PUBLIC_URL}/images/NHH01055.JPG`,
      alt: "웨딩 사진 13",
      title: "행복한 순간"
    },
    {
      id: 14,
      src: `${process.env.PUBLIC_URL}/images/NHH00813.JPG`,
      alt: "웨딩 사진 14",
      title: "사랑의 약속"
    },
    {
      id: 15,
      src: `${process.env.PUBLIC_URL}/images/NHH00576.JPG`,
      alt: "웨딩 사진 15",
      title: "영원한 사랑"
    },
    {
      id: 16,
      src: `${process.env.PUBLIC_URL}/images/NHH00523.JPG`,
      alt: "웨딩 사진 16",
      title: "아름다운 순간"
    },
    {
      id: 17,
      src: `${process.env.PUBLIC_URL}/images/NHH00503.JPG`,
      alt: "웨딩 사진 17",
      title: "함께하는 미래"
    },
    {
      id: 18,
      src: `${process.env.PUBLIC_URL}/images/NHH00380.JPG`,
      alt: "웨딩 사진 18",
      title: "새로운 시작"
    }
  ];

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
    setIsExpanded(!isExpanded);
  };

  // 모든 이미지 미리 로드
  useEffect(() => {
    allImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  return (
    <motion.section
      className="gallery"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>갤러리</h2>
      
      <div className="gallery-grid">
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img src={image.src} alt={image.alt} />
            <div className="gallery-overlay">
              <span>{image.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 숨겨진 이미지들 미리 로드 (화면에 보이지 않음) */}
      {!isExpanded && (
        <div style={{ display: 'none' }}>
          {allImages.slice(12).map((image) => (
            <img key={`preload-${image.id}`} src={image.src} alt={image.alt} />
          ))}
        </div>
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