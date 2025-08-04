import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { FooterContainer } from './Footer.style';

// Static imports for frequently used icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';

// Lazy imports for less frequently used icons
const InfoIcon = React.lazy(() => import('@mui/icons-material/Info'));
const PolicyIcon = React.lazy(() => import('@mui/icons-material/Policy'));
const PrivacyTipIcon = React.lazy(() => import('@mui/icons-material/PrivacyTip'));
const ArticleIcon = React.lazy(() => import('@mui/icons-material/Article'));

// Constant data outside component
const TOOLS_DATA = [
  { Icon: ShoppingCartIcon, text: 'تصویه حساب', action: () => window.location.href = '/checkout' },
  { Icon: PhoneIcon, text: 'تماس با پشتیبانی', action: () => window.location.href = 'tel:+989999910764' },
  { Icon: RequestQuoteIcon, text: 'درخواست محصول', action: () => window.location.href = '/request-product' },
  { Icon: ContactSupportIcon, text: 'سوالات متداول', action: () => window.location.href = '/support' }
];

const SOCIAL_DATA = [
  { Icon: InstagramIcon, href: 'https://instagram.com/marketika' },
  { Icon: TelegramIcon, href: 'https://t.me/marketika' },
  { Icon: WhatsAppIcon, href: 'https://wa.me/marketika' }
];

const Footer = memo(() => {
  const currentPath = useSelector((state) => state.location.currentPath);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const scrollTimeout = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Memoize path check
  const shouldRenderFooter = useMemo(() => currentPath === "/", [currentPath]);

  // Reliable scroll detection using requestAnimationFrame
  const checkScrollPosition = useCallback(() => {
    if (!shouldRenderFooter) return;
    
    const scroller = document.querySelector('.scroller') || document.documentElement;
    const { scrollTop, clientHeight, scrollHeight } = scroller;
    
    // Calculate distance from bottom (20px buffer)
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const isAtBottom = distanceFromBottom <= 20;
    
    // Only update state when visibility changes
    if (isAtBottom !== isFooterVisible) {
      setIsFooterVisible(isAtBottom);
    }
  }, [isFooterVisible, shouldRenderFooter]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      checkScrollPosition();
    });
  }, [checkScrollPosition]);

  // Setup scroll listener
  useEffect(() => {
    if (!shouldRenderFooter) return;
    
    const scroller = document.querySelector('.scroller') || document.documentElement;
    scroller.addEventListener('scroll', handleScroll);
    
    // Initial check
    checkScrollPosition();
    
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll, checkScrollPosition, shouldRenderFooter]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized links data
  const linksData = useMemo(() => [
    { Icon: InfoIcon, text: 'درباره ما', href: '/about-us' },
    { Icon: PolicyIcon, text: 'قوانین و مقررات', href: '/terms' },
    { Icon: PrivacyTipIcon, text: 'حریم خصوصی', href: '/privacy' },
    { Icon: ArticleIcon, text: 'بلاگ', href: '/blog' }
  ], []);

  if (!shouldRenderFooter) return null;

  return (
    <FooterContainer 
      $isOpen={isFooterVisible}
      className={`AuthStep ${isFooterVisible ? 'visible' : 'hidden'}`}
    >
      <div className="Footer">
        {/* ابزارهای اصلی */}
        <div className="footer-tools">
          {TOOLS_DATA.map(({ Icon, text, action }, index) => (
            <button 
              key={index} 
              className="footer-tool" 
              onClick={action}
              aria-label={text}
            >
              <Icon fontSize="small" />
              <span>{text}</span>
            </button>
          ))}
        </div>
  
        {/* لینک‌های مفید */}
        <div className="footer-links">
          {linksData.map(({ Icon, text, href }, index) => (
            <React.Suspense key={index} fallback={<div className="link-placeholder" />}>
              <a href={href} aria-label={text}>
                <Icon fontSize="small" />
                <span>{text}</span>
              </a>
            </React.Suspense>
          ))}
        </div>
  
        {/* شبکه‌های اجتماعی */}
        <div className="footer-social">
          {SOCIAL_DATA.map(({ Icon, href }, index) => (
            <a 
              key={index} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={Icon.name}
            >
              <Icon fontSize="small" />
            </a>
          ))}
        </div>
      </div>
    </FooterContainer>
  );
});

export default Footer;