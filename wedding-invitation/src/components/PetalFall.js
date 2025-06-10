import React, { useEffect, useState } from 'react';
import '../styles/PetalFall.css';

const PetalFall = ({ isActive = true, petalCount = 50 }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const generatePetals = () => {
      const newPetals = [];
      for (let i = 0; i < petalCount; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 5 + 5, // 5-10초
          animationDelay: Math.random() * 2, // 0-2초 지연
          size: Math.random() * 0.8 + 0.6, // 0.6-1.4 크기
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0 투명도
          petalType: Math.floor(Math.random() * 3) + 1, // 1, 2, 3 타입
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, [isActive, petalCount]);

  return (
    <div className={`petal-container ${isActive ? 'active' : 'inactive'}`}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`petal petal-type-${petal.petalType}`}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            transform: `scale(${petal.size}) rotate(${petal.rotation}deg)`,
            opacity: isActive ? petal.opacity : 0,
          }}
        />
      ))}
    </div>
  );
};

export default PetalFall; 