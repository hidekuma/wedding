import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const ExtraGallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedImage, setSelectedImage] = useState(null);

  // 추가 웨딩 사진 데이터
  const extraImages = [
    {
      id: 1,
      src: "/images/NHH01055.JPG",
      alt: "웨딩 사진 1",
      title: "행복한 순간"
    },
    {
      id: 2,
      src: "/images/NHH00813.JPG",
      alt: "웨딩 사진 2",
      title: "사랑의 약속"
    },
    {
      id: 3,
      src: "/images/NHH00576.JPG",
      alt: "웨딩 사진 3",
      title: "영원한 사랑"
    },
    {
      id: 4,
      src: "/images/NHH00523.JPG",
      alt: "웨딩 사진 4",
      title: "아름다운 순간"
    },
    {
      id: 5,
      src: "/images/NHH00503.JPG",
      alt: "웨딩 사진 5",
      title: "함께하는 미래"
    },
    {
      id: 6,
      src: "/images/NHH00380.JPG",
      alt: "웨딩 사진 6",
      title: "새로운 시작"
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = extraImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % extraImages.length;
    setSelectedImage(extraImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = extraImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + extraImages.length) % extraImages.length;
    setSelectedImage(extraImages[prevIndex]);
  };

  return (
    <>
      <motion.section
        className="gallery"
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ background: 'var(--color-bg)' }}
      >
        <h2>더 많은 사진</h2>
        <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '500px' }}>
          {extraImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openModal(image)}
            >
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <span>{image.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 모달 */}
      {selectedImage && (
        <motion.div
          className="gallery-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <button className="modal-close" onClick={closeModal}>×</button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-btn" onClick={prevImage}>‹</button>
            <div className="modal-image-container">
              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="modal-title">{selectedImage.title}</div>
              <div className="modal-counter">
                {extraImages.findIndex(img => img.id === selectedImage.id) + 1} / {extraImages.length}
              </div>
            </div>
            <button className="modal-btn" onClick={nextImage}>›</button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ExtraGallery; 