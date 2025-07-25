import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Swipers from "../../../components/Swiper/Swipers";
import { AddAdmin } from "./AddAdmin";
import { AddProduct } from "./AddProduct";
import { AddCategory } from "./AddCategory";
import { AddSubCategory } from "./AddSubCategory";
import { AddBanner } from "./AddBanner";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("admin");

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderRadius: "8px",maxWidth:"800px" }}>
      <Swipers
        children={
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                color: "#ffa05c",
                "&.Mui-selected": {
                  color: "#e68a4a",
                  fontWeight: "bold",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffa05c",
              },
            }}
          >
            <Tab value="admin" label="👤 مدیریت ادمین" />
            <Tab value="product" label="🛒 افزودن محصول" />
            <Tab value="category" label="📂 افزودن دسته‌بندی" />
            <Tab value="SubCategory" label="📂 افزودن ساب کتگوری" />
            <Tab value="banner" label="📢 افزودن بنر" />
          </Tabs>
        }
      />
      <Box sx={{ marginTop: "16px" }}>
        {activeTab === "admin" && <AddAdmin />}
        {activeTab === "product" && <AddProduct />}
        {activeTab === "category" && <AddCategory />}
        {activeTab === "SubCategory" && <AddSubCategory />}
        {activeTab === "banner" && <AddBanner />}
      </Box>
    </Box>
  );
}