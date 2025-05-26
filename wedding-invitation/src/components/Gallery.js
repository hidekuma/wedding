import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 실제 웨딩 사진 데이터
  const galleryImages = [
    {
      id: 1,
      src: "/images/1Y4A3911.JPG",
      alt: "웨딩 사진 1",
      title: "웨딩촬영"
    },
    {
      id: 2,
      src: "/images/1Y4A3889.JPG",
      alt: "웨딩 사진 2",
      title: "행복한 순간"
    },
    {
      id: 3,
      src: "/images/1Y4A3878.JPG",
      alt: "웨딩 사진 3",
      title: "사랑의 약속"
    },
    {
      id: 4,
      src: "/images/1Y4A3861.JPG",
      alt: "웨딩 사진 4",
      title: "드레스 피팅"
    },
    {
      id: 5,
      src: "/images/1Y4A3832.JPG",
      alt: "웨딩 사진 5",
      title: "웨딩드레스"
    },
    {
      id: 6,
      src: "/images/1Y4A3749.JPG",
      alt: "웨딩 사진 6",
      title: "부케"
    },
    {
      id: 7,
      src: "/images/1Y4A3716.JPG",
      alt: "웨딩 사진 7",
      title: "결혼반지"
    },
    {
      id: 8,
      src: "/images/1Y4A3571.JPG",
      alt: "웨딩 사진 8",
      title: "첫 키스"
    },
    {
      id: 9,
      src: "/images/1Y4A3553.JPG",
      alt: "웨딩 사진 9",
      title: "영원한 사랑"
    },
    {
      id: 10,
      src: "/images/1Y4A3500.JPG",
      alt: "웨딩 사진 10",
      title: "함께하는 미래"
    },
    {
      id: 11,
      src: "/images/1Y4A3345.JPG",
      alt: "웨딩 사진 11",
      title: "행복한 미소"
    },
    {
      id: 12,
      src: "/images/1Y4A3216.JPG",
      alt: "웨딩 사진 12",
      title: "새로운 시작"
    }
  ];

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

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
        {galleryImages.map((image, index) => (
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
                <div className="modal-title">{selectedImage.title}</div>
              </div>
              
              <button className="modal-btn next" onClick={nextSlide}>
                &#8250;
              </button>
              
              <div className="modal-counter">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery; 