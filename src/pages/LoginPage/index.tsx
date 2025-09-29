// src/pages/LoginPage/index.tsx

import React, { useEffect, useState } from 'react';
import './LoginPage.css'; 
import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

// Renomeie para StarsBackground em vez de ShootingStars
function StarsBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 15; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: -Math.random() * 3,
          duration: 1 + Math.random() * 2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animation: `shoot ${star.duration}s linear ${star.delay}s infinite`
          }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
          />
        </div>
      ))}

      <style>{`
        @keyframes shoot {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-300px, -300px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const LoginPage: React.FC = () => {
    const slogan = <>Conectando talentos em<br/>uma única órbita</>;

    return (
        <main className="login-page">
            <StarsBackground />
            <LeftPanel title={slogan} />
            <img className="float absolute" src="rocket.svg"/>
            <RightPanel />
        </main>
    );
}

export default LoginPage;