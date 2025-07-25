import React from 'react';
import { Box, Typography, Card, CardHeader, CardContent, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts'; // استفاده از کتابخانه @mui/x-charts برای نمودارها

const ProductStatus = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Card sx={{background:"transparent", borderRadius: '8px', }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            🛒 وضعیت محصولات
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#ffe5cc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: '#ffa05c' }}>
                امروز
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
                24<small>نفر</small>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#ffe5cc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: '#ffa05c' }}>
                یک هفته
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
                24<small>تومان</small>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#ffe5cc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: '#ffa05c' }}>
                بازدید کل
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
                24<small>نفر</small>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: '16px' }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff3e6', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold', marginBottom: '16px' }}>
                  نمودار میله‌ای (وضعیت امروز)
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }]}
                  series={[{ data: [65, 59, 80, 81, 56, 55, 40] }]}
                  width={400}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff3e6', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold', marginBottom: '16px' }}>
                  نمودار میله‌ای (وضعیت هفته)
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }]}
                  series={[{ data: [65, 59, 80, 81, 56, 55, 40] }]}
                  width={400}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductStatus;