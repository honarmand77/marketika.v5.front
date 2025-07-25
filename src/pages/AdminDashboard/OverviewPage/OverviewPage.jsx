import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import DailyVisits from './DailyVisits';
import ProductStatus from './ProductStatus';
import DailyProfit from './DailyProfit';
import AdminActivity from './AdminActivity';
import Swipers from "../../../components/Swiper/Swipers";

const OverviewPage = () => {
  const [activeTab, setActiveTab] = useState("DailyVisits");

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderRadius: '8px' ,maxWidth:"800px" }}>
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
          <Tab value="DailyVisits" label="👁️ بازدید روزانه" />
          <Tab value="ProductStatus" label="🛒 وضعیت محصولات" />
          <Tab value="DailyProfit" label="📈 فروش روزانه" />
          <Tab value="AdminActivity" label="📌 فعالیت ادمین ها" />
        </Tabs>
      </Swipers>

      <Box>
        {activeTab === "DailyVisits" && <DailyVisits />}
        {activeTab === "ProductStatus" && <ProductStatus />}
        {activeTab === "DailyProfit" && <DailyProfit />}
        {activeTab === "AdminActivity" && <AdminActivity />}
      </Box>
    </Box>
  );
};

export default OverviewPage;