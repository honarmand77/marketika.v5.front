import React from 'react';
import {
  Tabs,
  Tab,
  Skeleton,
  Stack,
  Box
} from '@mui/material';
import { useTheme } from '@emotion/react';
import ProductCard from '../ProductCard/ProductCard';
import Swipers from '../Swiper/Swipers';
import { Produc_Container, SectionContainer } from '../ProductSections/ProductSections.style';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const ProductSwiper = () => {
  const theme = useTheme();
  const { products, loading } = useSelector(state => state.products);



  // مرتب‌سازی و انتخاب 10 محصول برتر
  const getTopProducts = () => {
    try {
      return Array.isArray(products) 
        ? [...products].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)).slice(0, 10)
        : [];
    } catch (error) {
      console.error('Error processing products:', error);
      return [];
    }
  };

  const topProducts = getTopProducts();
  return (
    <>
      <Box sx={{ width: "100%", justifyContent:"center" ,display:"flex" }}>
        <Tabs sx={{ width: "max-content" }} value="محصولات برتر" aria-label="دسته بندی محصولات">
          <Tab label="محصولات برتر" value="محصولات برتر" />
        </Tabs>
      </Box>
      <Swipers>
          <Produc_Container>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Stack 
                  className="Card" 
                  sx={{
                    bgcolor: "#ffffff10", 
                    padding: "5px", 
                    width: "250px"
                  }} 
                  spacing={1} 
                  key={index}
                >
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={200} 
                    sx={{
                      borderRadius: "2px", 
                      bgcolor: "#cccccc50"
                    }} 
                  />
                  <Skeleton 
                    variant="text" 
                    width="95%" 
                    sx={{ 
                      fontSize: '1rem',
                      bgcolor: "#cccccc50", 
                      borderRadius: "2px" 
                    }} 
                  />
                  <Skeleton 
                    variant="text" 
                    width="60%" 
                    sx={{ 
                      fontSize: '1rem',
                      bgcolor: "#cccccc50", 
                      borderRadius: "2px" 
                    }} 
                  />
                </Stack>
              ))
            ) : (
              topProducts.map((product , index) => (
                  <ProductCard 
                    ClassName="SwiperCard" 
                    key={index}
                    loading={loading}
                    product={product} 
                  />
              ))
            )}
          </Produc_Container>
      </Swipers>
    </>
  );
};

export default React.memo(ProductSwiper);