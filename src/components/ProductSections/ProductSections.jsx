import React, { useEffect, useState, useMemo } from "react";
import { Grid, Box, Skeleton, Stack, Tabs, Tab, Button } from '@mui/material';
import Swipers from "../Swiper/Swipers";
import ProductCard from "../ProductCard/ProductCard";
import { SectionContainer, GridContainer, Product_Container } from "./ProductSections.style";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';


 function ProductSections() {

  const { products, loading } = useSelector(state => state.products);

  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sortBy, setSortBy] = useState("newest");



  // گروه‌بندی محصولات با useMemo برای بهینه‌سازی
  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const categoryName = product.category?.name || "بدون دسته";
      acc[categoryName] = acc[categoryName] || [];
      acc[categoryName].push(product);
      return acc;
    }, {});
  }, [products]);

  // مرتب‌سازی و فیلتر محصولات با useMemo
  const sortedProducts = useMemo(() => {
    const filtered = selectedCategory === "همه"
      ? Object.values(productsByCategory).flat()
      : productsByCategory[selectedCategory] || [];

    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    }).slice(0, 20);
  }, [productsByCategory, selectedCategory, sortBy]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

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
                  background: sortBy === "newest" ? 'linear-gradient(45deg, #FFA05C, #FF7B54)' : ""
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
                  background: sortBy === "oldest" ? 'linear-gradient(45deg, #FFA05C, #FF7B54)' : ""
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
            {loading ? (
              Array.from({ length: 14 }).map((_, index) => (
                <Stack
                  className="Card"
                  sx={{ bgcolor: "#ffffff10", padding: "5px", width: "250px" }}
                  spacing={1}
                  key={index}
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
            ) : (
              sortedProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard 
                    product={product} 
                    loading={loading}
                  />
                </motion.div>
              ))
            )}
          </Product_Container>
        </Grid>
      </SectionContainer>
    </GridContainer>
  );
}


export default React.memo(ProductSections);