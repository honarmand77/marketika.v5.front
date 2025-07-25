import React from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper, 
  Avatar, 
  Rating, 
  TextField, 
  Button,
  Divider,
  
} from '@mui/material';
import { ThumbUp, Star, StarBorder } from '@mui/icons-material';

const ProductTabs = ({
  activeTab,
  onTabChange,
  product,
  reviews,
  rating,
  reviewText,
  onRatingChange,
  onReviewChange,
  onSubmitReview
}) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden', bgcolor: 'background.default' }}>
      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => onTabChange(newValue)}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
            height: 3,
          },
          '& .MuiTab-root': {
            minWidth: 'unset',
            fontWeight: 600,
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <Tab label="مشخصات" />
        <Tab label="نظرات" />
        <Tab label="گارانتی" />
      </Tabs>
      
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Typography variant="body1" paragraph>
            {product.fullDescription || product.description}
          </Typography>
        )}
        
        {activeTab === 1 && (
          <Box>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2 }}>{review.user.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1">{review.user}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {new Date(review.date).toLocaleDateString('fa-IR')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2">{review.comment}</Typography>
                  {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center">
                هنوز نظری ثبت نشده است.
              </Typography>
            )}
            
            {/* Review Form */}
            <Paper elevation={0} sx={{ p: 3, mt: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>
                نظر خود را ثبت کنید
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Rating
                  value={rating}
                  onChange={(e, newValue) => onRatingChange(newValue)}
                  precision={0.5}
                  icon={<Star fontSize="inherit" />}
                  emptyIcon={<StarBorder fontSize="inherit" />}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="نظر شما"
                value={reviewText}
                onChange={onReviewChange}
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                onClick={onSubmitReview}
                startIcon={<ThumbUp />}
                fullWidth
              >
                ثبت نظر
              </Button>
            </Paper>
          </Box>
        )}
        
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              گارانتی و شرایط بازگشت
            </Typography>
            <Typography variant="body1" paragraph>
              این محصول دارای 18 ماه گارانتی شرکتی می‌باشد. در صورت وجود هرگونه مشکل در محصول، 
              می‌توانید تا 7 روز پس از خرید، محصول را مرجوع نمایید.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default React.memo(ProductTabs);