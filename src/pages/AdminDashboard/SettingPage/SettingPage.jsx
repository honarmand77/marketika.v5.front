import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import GeneralSettings from './GeneralSettings';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import Swipers from "../../../components/Swiper/Swipers";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("GeneralSettings");

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderRadius: "8px",maxWidth:"800px" }}>
      <Swipers>
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
          <Tab value="GeneralSettings" label="⚙️ تنظیمات عمومی" />
          <Tab value="ProfileSettings" label="👤 تنظیمات پروفایل" />
          <Tab value="SecuritySettings" label="🔒 تنظیمات امنیتی" />
          <Tab value="NotificationSettings" label="🔔 تنظیمات اعلان‌ها" />
        </Tabs>
      </Swipers>

      <Box>
        {activeTab === "GeneralSettings" && <GeneralSettings />}
        {activeTab === "ProfileSettings" && <ProfileSettings />}
        {activeTab === "SecuritySettings" && <SecuritySettings />}
        {activeTab === "NotificationSettings" && <NotificationSettings />}
      </Box>
    </Box>
  );
};

export default SettingPage;