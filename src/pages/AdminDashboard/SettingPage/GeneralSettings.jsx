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
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const GeneralSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // شبیه‌سازی عملیات ذخیره تنظیمات
    setTimeout(() => {
      setLoading(false);
      alert('تنظیمات با موفقیت ذخیره شد!');
    }, 2000);
  };

  return (
    <Card sx={{ borderRadius: '8px' }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            ⚙️ تنظیمات عمومی
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
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'ذخیره تنظیمات عمومی'}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              id="site-title"
              label="عنوان سایت"
              placeholder="عنوان سایت"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FormatAlignRightIcon sx={{ color: '#ffa05c' }} /> {/* تغییر رنگ آیکون */}
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
            <TextField
              id="language"
              label="زبان"
              placeholder="مثال: فارسی"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon sx={{ color: '#ffa05c' }} /> {/* تغییر رنگ آیکون */}
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
            <TextField
              id="timezone"
              label="منطقه زمانی"
              placeholder="مثال: GMT+3:30"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon sx={{ color: '#ffa05c' }} /> {/* تغییر رنگ آیکون */}
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

export default GeneralSettings;