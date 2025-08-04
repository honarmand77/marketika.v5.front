import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box,
    CircularProgress,
    Stack,
    Skeleton,
    Typography,
    Tabs,
    Tab,
    Grid 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import Swipers from '../Swiper/Swipers';

function InfiniteScrollProducts() {
  const { products, loading, error } = useSelector(state => state.products);
  const [randomProducts, setRandomProducts] = useState([]);
  const productsToShow = 10; // تعداد محصولات رندوم مورد نظر

  // انتخاب محصولات رندوم هنگام تغییر محصولات اصلی
  useEffect(() => {
    if (products.length > 0) {
      // ایجاد یک کپی از آرایه محصولات برای عدم تغییر آرایه اصلی
      const shuffled = [...products];
      
      // مخلوط کردن آرایه به صورت رندوم
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // انتخاب 10 محصول اول از آرایه مخلوط شده
      setRandomProducts(shuffled.slice(0, productsToShow));
    }
  }, [products]);

  return (
  
    <Box sx={{background: 'linear-gradient(135deg, #52575D10 0%, #52575D10 50%)'}}>
      <Box sx={{ width: "100%", justifyContent:"center" ,display:"flex" }}>
        <Tabs sx={{width:"max-content"}} value="محصولات پیشنهادی" aria-label="دسته بندی محصولات">
          <Tab label="محصولات پیشنهادی" value="محصولات پیشنهادی" />
        </Tabs>
      </Box>
      
      <Swipers>

        <Box sx={{ 
          padding: "1vw", 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          width: "100%", 
          gridTemplateRows: "1fr 1fr", 
          gap: "5px"
        }}>
          {loading && randomProducts.length === 0 ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Stack 
                className="smallCard" 
                sx={{
                  bgcolor: "#ffffff10", 
                  padding: "10px", 
                  borderRadius: "10px", 
                  display: "flex",
                  width: "450px"
                }} 
                spacing={1} 
                key={index}
              >
                <Skeleton 
                  variant="rectangular" 
                  width="120px" 
                  height="120px" 
                  sx={{
                    borderRadius: "10px", 
                    bgcolor: "#cccccc50"
                  }} 
                />
                <Grid width="80%">
                  <Skeleton 
                    variant="text" 
                    width="95%" 
                    sx={{ 
                      fontSize: '1rem',
                      bgcolor: "#cccccc50", 
                      borderRadius: "10px" 
                    }} 
                  />
                  <Skeleton 
                    variant="text" 
                    width="60%" 
                    sx={{ 
                      fontSize: '1rem',
                      bgcolor: "#cccccc50", 
                      borderRadius: "10px" 
                    }} 
                  />
                </Grid>
              </Stack>
            ))
          ) : (
            randomProducts.map((product) => (
              <ProductCard 
                ClassName="smallCard" 
                product={product} 
                key={product._id} 
              />
            ))
          )}
          
          {error && (
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                gridColumn: '1 / -1',
                marginTop: 2,
                color: 'error.main'
              }}
            >
              خطا در بارگذاری محصولات
            </Typography>
          )}
        </Box>
      </Swipers>
    </Box>
  );
}

export default React.memo(InfiniteScrollProducts);
