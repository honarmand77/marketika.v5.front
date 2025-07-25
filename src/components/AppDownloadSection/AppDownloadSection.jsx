import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Content, 
  AppInfo, 
  AppPreview, 
  Title, 
  Description, 
  DownloadButtons, 
  DownloadButton, 
  FeatureList,
  FeatureItem,
  PhoneFrame,
  AppScreenshot,
  FloatingIcon,
  GlassMorphism,
  DownloadCount,
} from './AppDownloadSection.style';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Iphone from '../../assets/images/Iphone.png';
import { keyframes } from "@emotion/react";

// انیمیشن‌های جدید برای جلوه سه بعدی
const pulse3D = keyframes`
  0% { transform: perspective(1000px) scale3d(1, 1, 1) rotateY(0deg); }
  50% { transform: perspective(1000px) scale3d(1.05, 1.05, 1.05) rotateY(5deg); }
  100% { transform: perspective(1000px) scale3d(1, 1, 1) rotateY(0deg); }
`;

const float3D = keyframes`
  0% { transform: perspective(1000px) translate3d(0, 0, 0) rotateX(0deg); }
  50% { transform: perspective(1000px) translate3d(0, -10px, 20px) rotateX(10deg); }
  100% { transform: perspective(1000px) translate3d(0, 0, 0) rotateX(0deg); }
`;

const rotateY = keyframes`
  0% { transform: perspective(1000px) rotateY(0deg); }
  100% { transform: perspective(1000px) rotateY(360deg); }
`;

const AppDownloadSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [downloadCount, setDownloadCount] = useState(12453);
  const [isCounting, setIsCounting] = useState(false);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    { 
      icon: <RocketLaunchIcon fontSize="large" />, 
      title: 'سرعت فوق‌العاده', 
      description: 'تجربه سریع‌ترین اپلیکیشن موجود با بهینه‌سازی بی‌نظیر' 
    },
    { 
      icon: <AutoFixHighIcon fontSize="large" />, 
      title: 'رابط کاربری جادویی', 
      description: 'طراحی خیره‌کننده و کاربرپسند با انیمیشن‌های روان' 
    },
    { 
      icon: <GppGoodIcon fontSize="large" />, 
      title: 'امنیت پیشرفته', 
      description: 'محافظت از داده‌های شما با بالاترین استانداردهای رمزنگاری' 
    }
  ];

  const handleDownload = () => {
    setIsCounting(true);
    setDownloadCount(prev => prev + 1);
    setTimeout(() => setIsCounting(false), 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      setMousePosition({
        x: (x - centerX) / centerX * 10, // محدود کردن به 10 درجه
        y: (y - centerY) / centerY * 10
      });
    }
  };

  return (
    <Container 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <Content
        style={{
          transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <AppPreview
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <PhoneFrame
            style={{
              transform: `translateZ(30px) rotateY(${activeFeature * 10}deg)`,
              transition: 'transform 0.5s ease'
            }}
          >
            <AppScreenshot 
              src={Iphone} 
              alt="App Screenshot" 
              style={{ 
                transform: activeFeature === 1 ? 'rotateY(5deg) translateZ(20px)' : 'rotateY(0deg) translateZ(20px)',
                filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.3))'
              }}
            />
          </PhoneFrame>
          
          {features.map((feature, index) => (
            <FloatingIcon 
              key={index} 
              style={{
                top: `${20 + index * 25}%`,
                left: index % 2 === 0 ? '15%' : '75%',
                opacity: activeFeature === index ? 1 : 0.3,
                animation: `${activeFeature === index ? float3D : 'none'} 3s ease-in-out infinite`,
                transform: activeFeature === index ? 
                  `scale(1.2) translateZ(50px)` : 'scale(1) translateZ(0)',
                transformStyle: 'preserve-3d'
              }}
            >
              {feature.icon}
            </FloatingIcon>
          ))}
        </AppPreview>

        <AppInfo
          style={{
            transform: `translateZ(20px) rotateY(${mousePosition.x * 0.5}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <GlassMorphism
            style={{
              transform: 'translateZ(30px)',
              boxShadow: '0 25px 45px rgba(0,0,0,0.05)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.1)'
            }}
          >
            <Title
              style={{
                textShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transform: 'translateZ(10px)'
              }}
            >
              تجربه‌ای نو در دنیای اپلیکیشن‌ها
            </Title>
            <Description
              style={{
                transform: 'translateZ(5px)'
              }}
            >
              برنامه ما را دانلود کنید و از امکانات فوق‌العاده آن بهره‌مند شوید. 
              طراحی منحصر به فرد، سرعت بی‌نظیر و امنیت تضمین شده!
            </Description>
            
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px',
                margin: '20px 0',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: `rotateX(${mousePosition.y * 0.5}deg) translateZ(20px)`,
                transition: 'transform 0.2s ease',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ transform: 'translateZ(10px)' }}>
                {features[activeFeature].icon}
              </div>
              <h4 style={{ 
                margin: '10px 0 5px',
                transform: 'translateZ(15px)'
              }}>
                {features[activeFeature].title}
              </h4>
              <p style={{ 
                margin: 0,
                transform: 'translateZ(5px)'
              }}>
                {features[activeFeature].description}
              </p>
            </div>

            <FeatureList
              style={{
                transform: 'translateZ(10px)'
              }}
            >
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index} 
                  style={{
                    backgroundColor: activeFeature === index ? 'rgba(255, 160, 92, 0.2)' : 'transparent',
                    position: 'relative',
                    transform: activeFeature === index ? 'translateZ(15px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease',
                    boxShadow: activeFeature === index ? '0 10px 20px rgba(255,160,92,0.3)' : 'none'
                  }}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  {activeFeature === index && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: '3px',
                      backgroundColor: '#FFA05C',
                      borderRadius: '3px',
                      transform: 'translateZ(10px)'
                    }} />
                  )}
                  <div style={{ transform: 'translateZ(5px)' }}>
                    {feature.icon}
                  </div>
                  <span style={{ transform: 'translateZ(5px)' }}>
                    {feature.title}
                  </span>
                </FeatureItem>
              ))}
            </FeatureList>

            <DownloadButtons
              style={{
                transform: 'translateZ(20px)'
              }}
            >
              <DownloadButton 
                onClick={handleDownload}
                style={{ 
                  animation: isCounting ? `${pulse3D} 0.5s ease` : 'none',
                  transform: 'translateZ(10px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateZ(20px)'
                  }
                }}
              >
                <AppleIcon fontSize="large" style={{ transform: 'translateZ(5px)' }} />
                <span style={{ transform: 'translateZ(5px)' }}>دانلود برای iOS</span>
              </DownloadButton>
              <DownloadButton 
                onClick={handleDownload}
                style={{ 
                  animation: isCounting ? `${pulse3D} 0.5s ease` : 'none',
                  transform: 'translateZ(10px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateZ(20px)'
                  }
                }}
              >
                <AndroidIcon fontSize="large" style={{ transform: 'translateZ(5px)' }} />
                <span style={{ transform: 'translateZ(5px)' }}>دانلود برای Android</span>
              </DownloadButton>
            </DownloadButtons>

            <DownloadCount
              style={{
                transform: 'translateZ(15px)'
              }}
            >
              <CloudDownloadIcon style={{ 
                animation: `${pulse3D} 2s infinite`,
                transform: 'translateZ(5px)'
              }} />
              <span style={{ transform: 'translateZ(5px)' }}>
                {downloadCount.toLocaleString()}+ دانلود
              </span>
            </DownloadCount>
          </GlassMorphism>
        </AppInfo>
      </Content>
    </Container>
  );
};

export default AppDownloadSection;