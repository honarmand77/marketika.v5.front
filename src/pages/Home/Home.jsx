
import {
  HomeContainer,
} from './Home.style';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import ProductSections from '../../components/ProductSections/ProductSections';
import OrderingProcess from '../../components/OrderingProcess/OrderingProcess';
import AppDownloadSection from '../../components/AppDownloadSection/AppDownloadSection';
import ProductSwiper from '../../components/Product Swiper/ProductSwiper';
import InfiniteScrollProducts from '../../components/InfiniteScrollProducts/InfiniteScrollProducts';
import { useRef } from 'react';
import BrandsCarousel from '../../components/BrandsCarousel/BrandsCarousel';
const Home = () => {
  const scrollerRef = useRef();



  return (
    <HomeContainer  className="scroller" ref={scrollerRef}>
    <BannerSlider/>
    <ProductSwiper/>
    <ProductSections/>
    <AppDownloadSection/>
    <InfiniteScrollProducts/>
    <BrandsCarousel/>
    <OrderingProcess/>
    </HomeContainer>

  );
};

export default Home;
