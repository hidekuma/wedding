import React, { useEffect, useState } from 'react';
import '../styles/PetalFall.css';

const PetalFall = ({ isActive = true, petalCount = 25 }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setPetals([]);
      return;
    }

    // 더 자연스러운 꽃잎 생성
    const generatePetals = () => {
      const newPetals = [];
      
      for (let i = 0; i < petalCount; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 4 + 6, // 6-10초로 더 천천히
          animationDelay: Math.random() * 8, // 0-8초 지연으로 더 다양하게
          size: Math.random() * 0.6 + 0.7, // 0.7-1.3 더 다양한 크기
          opacity: Math.random() * 0.4 + 0.4, // 0.4-0.8 투명도
          petalType: Math.floor(Math.random() * 5) + 1, // 1-5 더 다양한 타입
          swayAmount: Math.random() * 40 + 20, // 20-60px 흔들림 정도
          rotationSpeed: Math.random() * 2 + 1, // 1-3배 회전 속도
          driftDirection: Math.random() > 0.5 ? 1 : -1, // 좌우 드리프트 방향
        });
      }
      
      setPetals(newPetals);
    };

    generatePetals();
    
    // 주기적으로 새로운 꽃잎 추가 (더 자연스러운 연속성)
    const interval = setInterval(() => {
      if (isActive) {
        setPetals(prevPetals => {
          const newPetal = {
            id: Date.now() + Math.random(),
            left: Math.random() * 100,
            animationDuration: Math.random() * 4 + 6,
            animationDelay: 0,
            size: Math.random() * 0.6 + 0.7,
            opacity: Math.random() * 0.4 + 0.4,
            petalType: Math.floor(Math.random() * 5) + 1,
            swayAmount: Math.random() * 40 + 20,
            rotationSpeed: Math.random() * 2 + 1,
            driftDirection: Math.random() > 0.5 ? 1 : -1,
          };
          
          // 최대 꽃잎 수 유지
          const updatedPetals = [...prevPetals, newPetal];
          return updatedPetals.length > petalCount * 1.5 
            ? updatedPetals.slice(-petalCount) 
            : updatedPetals;
        });
      }
    }, 3000); // 3초마다 새 꽃잎 추가

    return () => clearInterval(interval);
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
            transform: `scale(${petal.size})`,
            opacity: isActive ? petal.opacity : 0,
            '--sway-amount': `${petal.swayAmount}px`,
            '--rotation-speed': petal.rotationSpeed,
            '--drift-direction': petal.driftDirection,
          }}
        />
      ))}
    </div>
  );
};

export default PetalFall; 