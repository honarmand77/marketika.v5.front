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
  FeatureHighlight,
  DownloadCount,
} from './AppDownloadSection.style';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const AppDownloadSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [downloadCount, setDownloadCount] = useState(12453);
  const [isCounting, setIsCounting] = useState(false);
  const containerRef = useRef(null);

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
    setTimeout(() => setIsCounting(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container ref={containerRef}>
      <Content>

        <AppInfo>
          <Title>تجربه‌ای نو در دنیای اپلیکیشن‌ها</Title>
          <Description>
            برنامه ما را دانلود کنید و از امکانات فوق‌العاده آن بهره‌مند شوید. 
            طراحی منحصر به فرد، سرعت بی‌نظیر و امنیت تضمین شده!
          </Description>
          
          <FeatureHighlight>
            {features[activeFeature].icon}
            <h4>{features[activeFeature].title}</h4>
            <p>{features[activeFeature].description}</p>
          </FeatureHighlight>

          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem 
                key={index} 
                active={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              >
                {feature.icon}
                <span>{feature.title}</span>
              </FeatureItem>
            ))}
          </FeatureList>

          <DownloadButtons>
            <DownloadButton 
              onClick={handleDownload} 
              isCounting={isCounting}
            >
              <AppleIcon fontSize="large" />
              <span>دانلود برای iOS</span>
            </DownloadButton>
            <DownloadButton 
              onClick={handleDownload} 
              isCounting={isCounting}
            >
              <AndroidIcon fontSize="large" />
              <span>دانلود برای Android</span>
            </DownloadButton>
          </DownloadButtons>

          <DownloadCount>
            <CloudDownloadIcon />
            <span>{downloadCount.toLocaleString()}+ دانلود</span>
          </DownloadCount>
        </AppInfo>
      </Content>
    </Container>
  );
};

export default AppDownloadSection;