import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Switch,
  Button,
  CircularProgress,
  Box,
  FormControlLabel,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email'; // آیکون ایمیل
import SmsIcon from '@mui/icons-material/Sms'; // آیکون پیامک
import NotificationsIcon from '@mui/icons-material/Notifications'; // آیکون Push

const NotificationSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // شبیه‌سازی عملیات ذخیره تنظیمات
    setTimeout(() => {
      setLoading(false);
      alert('تنظیمات اعلان‌ها با موفقیت ذخیره شد!');
    }, 2000);
  };

  return (
    <Card sx={{ borderRadius: '8px'}}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            🔔 تنظیمات اعلان‌ها
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffa05c',
              '&:hover': { backgroundColor: '#e68a4a' }, // تغییر رنگ هنگام هاور
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'ذخیره تنظیمات اعلان'}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* اعلان‌های ایمیل */}
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <EmailIcon sx={{ color: '#ffa05c' }} /> {/* آیکون ایمیل */}
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    اعلان‌های ایمیل
                  </Typography>
                </Box>
              }
            />

            {/* اعلان‌های پیامکی */}
            <FormControlLabel
              control={
                <Switch
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SmsIcon sx={{ color: '#ffa05c' }} /> {/* آیکون پیامک */}
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    اعلان‌های پیامکی
                  </Typography>
                </Box>
              }
            />

            {/* اعلان‌های Push */}
            <FormControlLabel
              control={
                <Switch
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <NotificationsIcon sx={{ color: '#ffa05c' }} /> {/* آیکون Push */}
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    اعلان‌های Push
                  </Typography>
                </Box>
              }
            />
          </Box>
        </form>
        {error && (
          <Typography variant="body2" sx={{ color: 'red', textAlign: 'center', marginTop: '16px' }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;