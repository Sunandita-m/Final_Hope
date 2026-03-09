'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './loading-screen.css';

export default function LoadingScreen() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  const loadingMessages = [
    "Initializing AI Engine...",
    "Loading Creator Tools...",
    "Analyzing Viral Trends...",
    "Preparing Content Intelligence...",
    "Optimizing Creator Workflow..."
  ];

  // Image categories for different rows
  const imageRows = [
    {
      direction: 'left',
      images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      ]
    },
    {
      direction: 'right',
      images: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
      ]
    },
    {
      direction: 'left',
      images: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      ]
    },
    {
      direction: 'right',
      images: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
      ]
    }
  ];

  useEffect(() => {
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
      }))
    );

    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 80);

    // Navigate after 4 seconds
    const timer = setTimeout(() => {
      router.push('/landing');
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="loading-screen">
      {/* Background gradient */}
      <div className="gradient-bg" />
      
      {/* Floating particles */}
      <div className="particles">
        {particles.map((particle, i) => (
          <div key={i} className="particle" style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }} />
        ))}
      </div>

      {/* Neural network lines */}
      <div className="neural-lines">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="neural-line" style={{
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 0.3}s`
          }} />
        ))}
      </div>

      {/* Image rows */}
      <div className="image-rows">
        {imageRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`image-row ${row.direction}`}>
            <div className="image-track">
              {/* Duplicate images for seamless loop */}
              {[...row.images, ...row.images, ...row.images].map((img, imgIndex) => (
                <div key={imgIndex} className="image-card">
                  <img src={img} alt="" loading="lazy" />
                  <div className="image-overlay" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="center-content">
        <div className="logo-container">
          <div className="logo-glow" />
          <div className="logo">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" stroke="url(#gradient)" strokeWidth="2" />
              <path d="M30 40 L40 30 L50 40 L40 50 Z" fill="url(#gradient)" />
              <circle cx="40" cy="40" r="8" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="brand-name">Craftantra AI</h1>
        
        <div className="loading-message">
          <p>{loadingMessages[messageIndex]}</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
            <div className="progress-glow" style={{ left: `${progress}%` }} />
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
      </div>
    </div>
  );
}
