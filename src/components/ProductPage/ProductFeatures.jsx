import React from 'react';
import { Grid, Paper, Typography,Box } from '@mui/material';
import {
  LocalShipping,
  VerifiedUser,
  SupportAgent,
  Payment
} from '@mui/icons-material';

const ProductFeatures = () => {
  const features = [
    { icon: <LocalShipping fontSize="small" />, title: "ارسال سریع", desc: "تحویل در 24 ساعت" },
    { icon: <VerifiedUser fontSize="small" />, title: "گارانتی", desc: "18 ماه ضمانت" },
    { icon: <SupportAgent fontSize="small" />, title: "پشتیبانی", desc: "24/7" },
    { icon: <Payment fontSize="small" />, title: "پرداخت", desc: "امن" },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {features.map((feature, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ color: 'primary.main' }}>{feature.icon}</Box>
            <Box>
              <Typography variant="body2" fontWeight="bold">{feature.title}</Typography>
              <Typography variant="caption" color="text.secondary">{feature.desc}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ProductFeatures); 