import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import { fetchUserData } from '../../../api/auth'; // import the fetchUserInfo function
import Loader from '../../../components/Loader/Loader';

const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
    uploads: 0,
    achievements: 0,
    missions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserData(); // استفاده از تابع fetchUserInfo از فایل api
        setUserInfo(data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
        setError("خطا در دریافت اطلاعات کاربر.");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        background:"transparent",
        borderRadius: '8px',

      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          margin: '0 auto 16px',
          backgroundColor: '#ffa05c',
        }}
      >
        {userInfo.name.charAt(0)}
      </Avatar>
      <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
        {userInfo.name}
      </Typography>
      <Typography variant="body1" sx={{ color: '#ffa05c', marginBottom: '16px' }}>
        {userInfo.bio}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              backgroundColor: '#ffe5cc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#ffa05c' }}>
              آپلود ها
            </Typography>
            <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
              {userInfo.uploads}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              backgroundColor: '#ffe5cc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#ffa05c' }}>
              دستاورد ها
            </Typography>
            <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
              {userInfo.achievements}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              backgroundColor: '#ffe5cc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#ffa05c' }}>
              ماموریت ها
            </Typography>
            <Typography variant="h4" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
              {userInfo.missions}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserInfoComponent;