import React, { useEffect, useState } from 'react';
import '../styles/PetalFall.css';

const PetalFall = ({ isActive = true, petalCount = 50 }) => {
  const [petals, setPetals] = useState([]);

  // App.js에서 전달받은 isActive를 직접 사용

  useEffect(() => {
    if (!isActive) {
      setPetals([]);
      return;
    }

    // 꽃잎을 여러 그룹으로 나누어 단계적으로 생성
    const generatePetalsInWaves = () => {
      const totalGroups = 5; // 5개 그룹으로 나누기
      const petalsPerGroup = Math.ceil(petalCount / totalGroups);
      
      // 기존 꽃잎 초기화
      setPetals([]);
      
      // 각 그룹을 다른 시점에 생성
      for (let group = 0; group < totalGroups; group++) {
        setTimeout(() => {
          const groupPetals = [];
          const startId = group * petalsPerGroup;
          const endId = Math.min(startId + petalsPerGroup, petalCount);
          
          for (let i = startId; i < endId; i++) {
            groupPetals.push({
              id: i,
              left: Math.random() * 100,
              // 그룹 내에서도 다른 지연 시간
              animationDuration: Math.random() * 4 + 6, // 6-10초
              animationDelay: Math.random() * 3, // 0-3초 지연
              size: Math.random() * 0.6 + 0.7, // 0.7-1.3 크기
              rotation: Math.random() * 360, // 초기 회전
              rotationX: Math.random() * 90, // X축 회전 추가
              rotationY: Math.random() * 180, // Y축 회전 추가
              opacity: Math.random() * 0.5 + 0.4, // 0.4-0.9 투명도
              petalType: Math.floor(Math.random() * 3) + 1, // 1, 2, 3 타입
              groupId: group, // 그룹 식별자 추가
            });
          }
          
          // 기존 꽃잎에 새 그룹 추가
          setPetals(prevPetals => [...prevPetals, ...groupPetals]);
        }, group * 800); // 각 그룹을 0.8초 간격으로 생성
      }
    };

    generatePetalsInWaves();
  }, [isActive, petalCount]);

  return (
    <div className={`petal-container ${isActive ? 'active' : 'inactive'}`}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`petal petal-type-${petal.petalType} petal-group-${petal.groupId}`}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            transform: `scale(${petal.size}) rotateZ(${petal.rotation}deg) rotateX(${petal.rotationX}deg) rotateY(${petal.rotationY}deg)`,
            opacity: isActive ? petal.opacity : 0,
          }}
        />
      ))}
    </div>
  );
};

export default PetalFall; 