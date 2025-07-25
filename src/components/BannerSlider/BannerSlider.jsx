import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,

} from '@mui/material';
import _default from '../../assets/icons/marketika defullt.svg';
import Carousel from 'react-material-ui-carousel';
import { CategoryCard, Categories_Container, BannerContainer } from './BannerSlider.style';
import Swipers from '../Swiper/Swipers';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Api_Url } from '../../api';
import { useSelector } from 'react-redux';

export default function BannerSlider() {
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleImageError = useCallback(() => setImageError(true), []);
  const { banners, loading } = useSelector(state => state.banners);

  
  const renderBanners = () => {
    if (loading) {
      return Array(4).fill(0).map((_, index) => (
        <CardActionArea 
          key={index}
          sx={{
            width: '100%',
            height:isMobile ? '200px' : '450px',
            backgroundColor: '#cccccc50',
            borderRadius:"10px"
          }}
        />
      ));
    }
    return banners?.map((banner, index) => (
      <Box
        key={index}
        component="img"
        src={`${Api_Url}/${banner?.imageUrl}`}
        alt={`banner-${index}`}
        onError={handleImageError}
        crossOrigin="anonymous"
        sx={{
          width: '100%',
          height: isMobile ? '200px' : '450px',
          objectFit: `${banner?.imageUrl ? 'cover' : "contain"}`,
          aspectRatio:isMobile ? "3/4" : "4/16",
          objectPosition: 'center',
          borderRadius:"10px",
          bgcolor:"#fff",
        
        }}
      />
    ));
  };

  return (
    <BannerContainer>
      <Carousel
        animation="fade"
        duration={800}
        interval={3000}
        navButtonsAlwaysVisible
        indicators={isMobile}
        sx={{
          width: '100%',
          height: isMobile ? '200px' : '100%',
          borderRadius:"10px",
        }}
      >
        {renderBanners()}
      </Carousel>
        <CategoriesContainer />

    </BannerContainer>
  );
}



export function CategoriesContainer({className}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageError, setImageError] = useState(false);
  const handleImageError = useCallback(() => setImageError(true), []);
  const { categories , loading } = useSelector(state => state.categories);

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName}`);
  };
  const handleSubCategoryClick = (subCategoryName , categoryName) => {
    navigate(`/${categoryName}/${subCategoryName}`);
  };
  return (
    <Swipers className={`${className} catswip`} direction={isMobile ? "horizontal" : "vertical"}>
    <Categories_Container className='horcatch'>
      {loading ? (
        Array(10).fill(0).map((_, index) => (
          <CardActionArea
            key={index}
            elevation={3}
            className='Card'
            sx={{
            width:"100%",
            padding:"5px",
            display:"grid",
            gridTemplateColumns:"1fr",
              cursor:"grab",
              height:"100%",
            alignItems:"flex-start",
            userSelect: "none",
            maxHeight:isMobile ? "120px" : "160px",
            bgcolor:"#ffffff10",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
            },
            }}
          >
          <Box style={{height:"100%" , display:"grid" , alignItems:"center",width:"100%", gap:"5px"}}>
                    <Skeleton variant="text" width="90%" sx={{ bgcolor:"#cccccc50"}} />
          <Skeleton
            key={index}
            variant="rectangular"
            height={90}
            sx={{ borderRadius:"10px" , width:"320px" , bgcolor:"#cccccc50"}}
          />
          </Box>
          </CardActionArea>
        ))
      ) : (
        categories?.map((category, index) => (
          <CardActionArea
            key={index}
            elevation={3}
            className='Card'
            sx={{
            width:"100%",
            padding:"5px",
            height:"100%",
            display:"flex",
            flexWrap:"wrap",
              cursor:"grab",
            alignItems:"flex-start",
            transition: "transform 0.3s, background-color 0.3s",
            userSelect: "none",
            maxHeight:isMobile ? "150px" : "200px",
            transition: "transform 0.2s, box-shadow 0.2s",

            "&:hover": {
              transform: "translateY(-4px)",
              ".MuiTypography-body2 , svg":{
              color: "#fff",
              },
              background:"linear-gradient(45deg, #FFA05C, #FF7B54)",
                      ">:nth-child(3)":{
                        "*":{
                    color:"#fff",
                        }
                    }
            },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , width:"100%" }}>
    
    <Typography variant="body2" sx={{ color: '#333' }}>
      {category.name || "دسته بندی"}
    </Typography>
    <IconButton
      sx={{ p: .5, color: "#FFA05C" }}
      onClick={() => handleCategoryClick(category.name)}
    >
      <ArrowBackIcon sx={{ p: .5 , color: "#FFA05C" }}/>
    </IconButton>
  </Box>
  <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '.5fr 1fr' : "1fr", background:"#ffffff",height:"100%",borderRadius:"8px",width:"100%", alignItems:"center" }}>


  <CardMedia
                component="img"
                height="70px"
                width="70px"
                image={ `${Api_Url}/${category?.image_url}`}
                crossOrigin="anonymous"
                alt={category.name || "دسته بندی"}
                onError={handleImageError}

                sx={{ objectFit: 'contain', margin:"auto" }}
              />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', p: 1 ,height:"100%"}}>

              { category?.subCategories.slice(0 , 4)?.map((subCategory, subIndex) => (
                <CardActionArea
                  key={subIndex}
                  elevation={1}
                  className='subcard'
                  sx={{
                    padding: '5px',
                    bgcolor: '#fcfcfc',
                    textAlign: 'center',
                    borderRadius:"5px",
                    color:"#444",
                    height:"100%",
                    "&:hover": {
                      background:"linear-gradient(45deg, #FFA05C, #FF7B54)"
                      ,
                      "*":{
                      color:"#fff",
                      }
                    }
                  }}
                >
                  <Typography variant="p"  sx={{ color: '#333' }} onClick={() => handleSubCategoryClick(subCategory.name , category.name)}>
                    {subCategory?.name || "زیر دسته بندی"}
                  </Typography>
                </CardActionArea>
              ))}
            </Box>
  </Box>

          </CardActionArea>
        ))
      )}
    </Categories_Container>
    </Swipers>
  );
}