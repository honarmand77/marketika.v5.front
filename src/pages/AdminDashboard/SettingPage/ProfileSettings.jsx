import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // آیکون نام
import EmailIcon from '@mui/icons-material/Email'; // آیکون ایمیل
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // آیکون تصویر پروفایل

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // شبیه‌سازی عملیات ذخیره تنظیمات
    setTimeout(() => {
      setLoading(false);
      alert('تنظیمات پروفایل با موفقیت ذخیره شد!');
    }, 2000);
  };

  return (
    <Card sx={{ borderRadius: '8px' }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            👤 تنظیمات پروفایل
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
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'ذخیره تنظیمات پروفایل'}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* فیلد نام */}
            <TextField
              id="profile-name"
              label="نام"
              placeholder="نام کاربری"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#ffa05c' }} /> {/* آیکون نام */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ffa05c' },
                  '&:hover fieldset': { borderColor: '#e68a4a' },
                },
              }}
            />

            {/* فیلد ایمیل */}
            <TextField
              id="profile-email"
              label="ایمیل"
              placeholder="ایمیل"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#ffa05c' }} /> {/* آیکون ایمیل */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ffa05c' },
                  '&:hover fieldset': { borderColor: '#e68a4a' },
                },
              }}
            />

            {/* فیلد تصویر پروفایل */}
            <TextField
              id="profile-picture"
              label="تصویر پروفایل"
              type="file"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhotoCameraIcon sx={{ color: '#ffa05c' }} /> {/* آیکون تصویر پروفایل */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ffa05c' },
                  '&:hover fieldset': { borderColor: '#e68a4a' },
                },
              }}
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

export default ProfileSettings;