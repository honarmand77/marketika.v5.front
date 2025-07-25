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
const BrandsCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [imageError, setImageError] = useState(false);
  const handleImageError = useCallback(() => setImageError(true), []);

  const brands = [
    { 
      id: 1,
      name: 'شیائومی',
      image: '/themes/custom-5385/userfiles/d7d217.jpg',
      link: '/site/search?q=شیائومی'
    },
    { 
      id: 2,
      name: 'سامسونگ',
      image: '/themes/custom-5385/userfiles/f62f7b.jpg',
      link: '/site/search?q=سامسونگ'
    },
    { 
      id: 3,
      name: 'Anker',
      image: '/themes/custom-5385/userfiles/68aa58.jpg',
      link: '/site/search?q=anker'
    },
    { 
      id: 4,
      name: 'Huawei',
      image: '/themes/custom-5385/userfiles/c2c7fd.jpg',
      link: '/site/search?q=Huawei'
    },
    { 
      id: 5,
      name: 'Motorola',
      image: '/themes/custom-5385/userfiles/7bc504.jpg',
      link: '/site/search?q=motorola'
    },
    { 
      id: 6,
      name: 'گیگاست',
      image: '/themes/custom-5385/userfiles/cfa7b5.jpg',
      link: '/site/search?q=گیگاست'
    },
    { 
      id: 7,
      name: 'پاناسونیک',
      image: '/themes/custom-5385/userfiles/3b399e.jpg',
      link: '/site/search?q=پاناسونیک'
    },
    { 
      id: 8,
      name: 'باسئوس',
      image: '/themes/custom-5385/userfiles/43f768.jpg',
      link: '/site/search?q=باسئوس'
    },
    { 
      id: 9,
      name: 'Awei',
      image: '/themes/custom-5385/userfiles/a91702.jpg',
      link: '/site/search?q=awei'
    }
  ];

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
        background: "linear-gradient(to bottom, #ffa05c10, transparent)",
        zIndex: -1
      }
    }}>
        <Tabs sx={{width:"max-content"}} value="برند های برتر" aria-label="بهترین برند ها">
          <Tab label="برند های برتر" value="برند های برتر" />
        </Tabs>

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
                <a href={brand.link} style={{ textDecoration: 'none' }}>
                  <Box
                    component="img"
                    src={imageError ? _default : `${Api_Url}/${brand.image}`}
                    alt={brand.name}
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