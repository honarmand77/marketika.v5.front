import React, { useMemo , useState } from "react";
import { Box, Skeleton, Stack, Tabs, Tab, Button ,Grid } from '@mui/material';
import Swipers from "../Swiper/Swipers";
import ProductCard from "../ProductCard/ProductCard";
import { SectionContainer, GridContainer, Product_Container } from "./ProductSections.style";
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const ProductSections = () => {
  const { products, loading } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sortBy, setSortBy] = useState("newest");

  // گروه‌بندی محصولات با useMemo
  const productsByCategory = useMemo(() => {
    const grouped = {};
    products.forEach(product => {
      const categoryName = product.category?.name || "بدون دسته";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(product);
    });
    return grouped;
  }, [products]);

  // مرتب‌سازی و فیلتر محصولات با useMemo
  const sortedProducts = useMemo(() => {
    const filtered = selectedCategory === "همه"
      ? Object.values(productsByCategory).flat()
      : productsByCategory[selectedCategory] || [];

    return [...filtered].sort((a, b) => {
      return sortBy === "newest" 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    }).slice(0, 20);
  }, [productsByCategory, selectedCategory, sortBy]);

  // بهینه‌سازی هندلرها با useCallback
  const handleCategoryChange = useCallback((event, newValue) => {
    setSelectedCategory(newValue);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  // اسکلتون‌های لودینگ
  const renderSkeletons = useMemo(() => (
    Array.from({ length: 14 }).map((_, index) => (
      <Stack
        key={`skeleton-${index}`}
        className="Card"
        sx={{ bgcolor: "#ffffff10", padding: "5px", width: "250px" }}
        spacing={1}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ borderRadius: "2px", bgcolor: "#cccccc50" }}
        />
        <Skeleton
          variant="text"
          width="95%"
          sx={{ fontSize: '1rem', bgcolor: "#cccccc50", borderRadius: "2px" }}
        />
        <Skeleton
          variant="text"
          width="60%"
          sx={{ fontSize: '1rem', bgcolor: "#cccccc50", borderRadius: "2px" }}
        />
      </Stack>
    ))
  ), []);

  // رندر محصولات
  const renderProducts = useMemo(() => (
    sortedProducts.map((product) => (
      <ProductCard 
        key={product._id}
        product={product} 
      />
    ))
  ), [sortedProducts]);

  return (
    <GridContainer className="GridContainer">
      <SectionContainer container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              flexWrap: "wrap",
              width: "100vw",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Button
                variant={sortBy === "newest" ? "contained" : "outlined"}
                onClick={() => handleSortChange("newest")}
                sx={{ 
                  mr: 1, 
                  borderRadius: "0",
                  color: sortBy === "newest" ? "#fff" : "",
                  background: sortBy === "newest" ? '#52575D' : ""
                }}
              >
                جدیدترین
              </Button>
              <Button
                variant={sortBy === "oldest" ? "contained" : "outlined"}
                onClick={() => handleSortChange("oldest")}
                sx={{ 
                  mr: 1, 
                  borderRadius: "0",
                  color: sortBy === "oldest" ? "#fff" : "",
                  background: sortBy === "oldest" ? '#52575D' : ""
                }}
              >
                قدیمی‌ترین
              </Button>
            </Box>
            <Swipers>
              <Tabs
                sx={{ width: "100vw" }}
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="دسته بندی محصولات"
              >
                <Tab label="همه" value="همه" />
                {Object.keys(productsByCategory).map((category) => (
                  <Tab label={category} value={category} key={category} />
                ))}
              </Tabs>
            </Swipers>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Product_Container container spacing={2}>
            {loading ? renderSkeletons : renderProducts}
          </Product_Container>
        </Grid>
      </SectionContainer>
    </GridContainer>
  );
};

export default React.memo(ProductSections);