import React,{useCallback, useState} from 'react';
import { 
  Box,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import _default from '../../assets/icons/marketika defullt.svg';
import { Api_Url } from '../../api';
import { useSelector } from 'react-redux';

const BrandsCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [imageError, setImageError] = useState(false);
  const handleImageError = useCallback(() => setImageError(true), []);
  const { brands, loading } = useSelector(state => state.brands);


  const getItemsPerSlide = () => {
    if (isMobile) return 2;
    if (isTablet) return 4;
    return 6;
  };

  const groupedBrands = [];
  const itemsPerSlide = getItemsPerSlide();
  
  for (let i = 0; i < brands.length; i += itemsPerSlide) {
    groupedBrands.push(brands.slice(i, i + itemsPerSlide));
  }

  return (
    <Box sx={{ 
      width: "100%",
      position: "relative",
      height:"100%",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(to bottom, #52575D10, transparent)",
        zIndex: -1
      }
    }}>
    <Box sx={{ width: "100%", justifyContent:"center" ,display:"flex",p:1 }}>
        <Tabs sx={{width:"max-content"}} value="برند های برتر" aria-label="بهترین برند ها">
          <Tab label="برند های برتر" value="برند های برتر" />
        </Tabs>
    </Box>

      <Carousel
        animation="slide"
        autoPlay
        interval={4500}
        stopAutoPlayOnHover
        indicators={false}
        swipe
        cycleNavigation
        fullHeightHover={false}
        sx={{
          padding:"10px"
        }}
      >
        {groupedBrands.map((group, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              px: 1
            }}
          >
            {group.map((brand) => (
              <Box 
                key={brand.id}
                sx={{
                  flex: 1,
                  minWidth: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1
                }}
              >
                <a href={brand?.link} style={{ textDecoration: 'none' }}>
                  <Box
                    component="img"
                    src={imageError ? _default : `${Api_Url}/${brand?.imageUrl}`}
                    alt={brand?.title}
                    onError={handleImageError}
                    sx={{
                      width:isMobile ? '140px' : '200px',
                      height:isMobile ? '80px' : '100px',
                      borderRadius:"10px",
                      transition: 'transform 0.3s',
                      background:"#fff",
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </a>
              </Box>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default BrandsCarousel;