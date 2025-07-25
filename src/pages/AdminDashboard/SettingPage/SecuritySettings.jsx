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
import LockIcon from '@mui/icons-material/Lock'; // آیکون رمز عبور فعلی
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // آیکون رمز عبور جدید
import LockResetIcon from '@mui/icons-material/LockReset'; // آیکون تایید رمز عبور

const SecuritySettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // شبیه‌سازی عملیات بروزرسانی رمز عبور
    setTimeout(() => {
      setLoading(false);
      alert('رمز عبور با موفقیت بروزرسانی شد!');
    }, 2000);
  };

  return (
    <Card sx={{ borderRadius: '8px' }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            🔒 تنظیمات امنیتی
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
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'بروزرسانی رمز عبور'}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* فیلد رمز عبور فعلی */}
            <TextField
              id="current-password"
              label="رمز عبور فعلی"
              placeholder="رمز عبور فعلی"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#ffa05c' }} /> {/* آیکون رمز عبور فعلی */}
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

            {/* فیلد رمز عبور جدید */}
            <TextField
              id="new-password"
              label="رمز عبور جدید"
              placeholder="رمز عبور جدید"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon sx={{ color: '#ffa05c' }} /> {/* آیکون رمز عبور جدید */}
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

            {/* فیلد تایید رمز عبور */}
            <TextField
              id="confirm-password"
              label="تایید رمز عبور"
              placeholder="تکرار رمز عبور جدید"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetIcon sx={{ color: '#ffa05c' }} /> {/* آیکون تایید رمز عبور */}
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

export default SecuritySettings;