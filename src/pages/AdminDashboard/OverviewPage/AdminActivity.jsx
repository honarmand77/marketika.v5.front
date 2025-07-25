import React from 'react';
import { Box, Typography, Card, CardHeader, CardContent, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts'; // استفاده از کتابخانه @mui/x-charts برای نمودارها
import { format, addDays } from 'date-fns'; // استفاده از date-fns برای مدیریت تاریخ‌ها

const AdminActivity = () => {
  // داده‌های ادمین‌های آنلاین، آفلاین و جدید برای ۷ روز
  const onlineAdmins = [65, 59, 80, 81, 56, 55, 40]; // داده‌های ادمین‌های آنلاین
  const offlineAdmins = [28, 48, 40, 19, 86, 27, 90]; // داده‌های ادمین‌های آفلاین
  const newAdmins = [10, 20, 30, 40, 50, 60, 70]; // داده‌های ادمین‌های جدید

  // تاریخ شروع (امروز)
  const startDate = new Date();

  // ایجاد آرایه‌ای از تاریخ‌ها برای ۷ روز آینده
  const dates = Array.from({ length: 7 }, (_, index) =>
    format(addDays(startDate, index), 'yyyy/MM/dd') // فرمت تاریخ به صورت yyyy/MM/dd
  );

  return (
    <Card sx={{ background:"transparent",borderRadius: '8px' }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            📌 فعالیت ادمین ها
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
                آنلاین
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
                آفلاین
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
                ادمین جدید
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
                24<small>نفر</small>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: '16px' }}>
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#fff3e6', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold', marginBottom: '16px' }}>
                  نمودار خطی فعالیت ادمین‌ها (روز به روز)
                </Typography>
                <LineChart
                  xAxis={[
                    {
                      data: dates, // استفاده از تاریخ‌ها به عنوان محور X
                      label: 'تاریخ',
                      scaleType: 'point', // استفاده از مقیاس نقطه‌ای برای نمایش تاریخ‌ها
                    },
                  ]}
                  series={[
                    {
                      data: onlineAdmins,
                      label: 'آنلاین',
                      color: '#ffa05c', // رنگ خط برای ادمین‌های آنلاین
                    },
                    {
                      data: offlineAdmins,
                      label: 'آفلاین',
                      color: '#e68a4a', // رنگ خط برای ادمین‌های آفلاین
                    },
                    {
                      data: newAdmins,
                      label: 'جدید',
                      color: '#ff7f50', // رنگ خط برای ادمین‌های جدید
                    },
                  ]}
                  width={800}
                  height={400}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdminActivity;