import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import UserInfo from './UserInfo';
import PostsSection from './AdminProductsSection';
import OrdersSection from './OrdersSection';
import HistorySection from './HistorySection';
import Swipers from "../../../components/Swiper/Swipers";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('UserInfo'); // تب پیش‌فرض

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderRadius: "8px",maxWidth:"800px"}}>
      <Swipers sx={{ marginBottom: '16px' }}>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              color: '#ffa05c',
              "&.Mui-selected": {
                color: '#e68a4a',
                fontWeight: 'bold',
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: '#ffa05c',
            },
          }}
        >
          <Tab value="UserInfo" label="👤 اطلاعات کاربر" />
          <Tab value="Posts" label="📤 پست‌ها" />
          <Tab value="HistorySection" label="🏆 تاریخچه" />
          <Tab value="OrdersSection" label="📌 سفارشات" />
        </Tabs>
      </Swipers>

      <Box>
        {activeTab === 'UserInfo' && <UserInfo />}
        {activeTab === 'Posts' && <PostsSection />}
        {activeTab === 'OrdersSection' && <OrdersSection />}
        {activeTab === 'HistorySection' && <HistorySection />}
      </Box>
    </Box>
  );
};

export default ProfilePage;