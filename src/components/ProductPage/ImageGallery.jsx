import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Api_Url } from '../../api';
import {CircularProgress} from '@mui/material';
const ImageGallery = ({ 
  product, 
  currentImageIndex, 
  onImageChange, 
  onWishlistToggle, 
  wishlisted, 
  loadingWishlist 
}) => {
  return (
    <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      {/* Wishlist Button */}
      <Tooltip title={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}>
        <IconButton
          onClick={onWishlistToggle}
          disabled={loadingWishlist}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: "rgba(255,255,255,1)",
              transform: 'scale(1.1)'
            }
          }}
        >
          {loadingWishlist ? (
            <CircularProgress size={24} />
          ) : wishlisted ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Tooltip>

      {/* Main Image */}
      <motion.img
        src={`${Api_Url}/${product.images[currentImageIndex]}`}
        alt={product.name}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          cursor: 'zoom-in'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Thumbnails */}
      <Box sx={{ display: 'flex', gap: '8px', mt: 2, overflowX: 'auto' }}>
        {product.images.map((img, index) => (
          <motion.div
            key={index}
            onClick={() => onImageChange(index)}
            style={{
              width: '64px',
              height: '64px',
              minWidth: '64px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: `2px solid ${currentImageIndex === index ? 'primary.main' : 'transparent'}`,
              cursor: 'pointer',
              backgroundColor: 'grey.100'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`${Api_Url}/${img}`}
              alt={`تصویر ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(ImageGallery); 