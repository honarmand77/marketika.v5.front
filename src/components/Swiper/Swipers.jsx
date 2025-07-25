import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

function Swipers({ children, className, direction = "horizontal" }) {
  const swiperRef = useRef(null);

  // استایل‌های سه بعدی
  const swiperStyle = {
    '--swiper-perspective': '1000px', // تنظیم پرسپکتیو
    '--swiper-3d-rotate': '10deg', // تنظیم زاویه چرخش
  };

  return (
    <Swiper
      ref={swiperRef}
      direction={direction}
      effect={'coverflow'} // استفاده از افکت coverflow برای جلوه سه بعدی
      coverflowEffect={{
        rotate: 20, // چرخش اسلایدها
        stretch: 5, // کشیدگی
        depth: 100, // عمق سه بعدی
        modifier: 1, // تعدیل کننده
        slideShadows: false, // نمایش سایه
      }}
      slidesPerView={'auto'}
      freeMode={true}
      scrollbar={{
        hide: true,
        draggable: true,
      }}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 100,
      }}
      modules={[EffectCoverflow, FreeMode, Scrollbar, Mousewheel]}
      className={`mySwiper ${className || ''}`}
      style={swiperStyle}
      spaceBetween={direction === 'horizontal' ? 40 : 16} // افزایش فاصله برای جلوه بهتر
      grabCursor={true} // تغییر شکل کرسر هنگام hover
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide 
          key={index} 
          style={{ 
            width: direction === 'horizontal' ? 'auto' : '100%',
            height: direction === 'vertical' ? 'auto' : '100%',
            transformStyle: 'preserve-3d', // فعال کردن transformهای سه بعدی
            backfaceVisibility: 'hidden', // مخفی کردن پشت اسلایدها
          }}
        >
          <div style={{
            transform: 'translateZ(10px)', // ایجاد عمق
            height: '100%',
          }}>
            {child}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(Swipers);