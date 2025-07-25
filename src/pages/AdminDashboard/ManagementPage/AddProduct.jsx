import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import CollectionsIcon from "@mui/icons-material/Collections";
import Cookies from "js-cookie";
import { categoryData } from "../../../api/categories"; // import the functions
import {addProduct} from "../../../api/products";
export function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await categoryData(); // استفاده از تابع categoryData از فایل api
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
        setError("خطا در دریافت دسته‌بندی‌ها.");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (productCategory) {
      const selectedCategory = categories.find((cat) => cat._id === productCategory);
      if (selectedCategory) {
        setSubCategories(selectedCategory.subCategories || []);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  }, [productCategory, categories]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!productCategory || !productImage || !token || !productSubCategory) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("stock", productStock);
      formData.append("category", productCategory);
      formData.append("subCategory", productSubCategory);
      formData.append("description", productDescription);
      formData.append("image", productImage);

      await addProduct(formData); // استفاده از تابع addProduct از فایل api

      alert("محصول با موفقیت اضافه شد!");
      resetForm([setProductName, setProductPrice, setProductStock, setProductCategory, setProductDescription, setProductSubCategory]);
      setProductImage(null);
    } catch (error) {
      console.error("خطا در افزودن محصول:", error);
      setError("خطا در افزودن محصول.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (setters) => {
    setters.forEach((setter) => setter(""));
  };

  return (
    <Card sx={{ background:"transparent",borderRadius: '8px' }}> {/* تغییر رنگ پس‌زمینه کارت */}
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ color: "#ffa05c" }}>
            🛒 افزودن محصول جدید
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa05c",
              "&:hover": { backgroundColor: "#e68a4a" }, // تغییر رنگ هنگام هاور
            }}
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "افزودن محصول"}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleAddProduct} encType="multipart/form-data">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              id="product-name"
              label="نام محصول"
              placeholder="نام محصول جدید"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="product-price"
              label="قیمت محصول"
              placeholder="قیمت محصول"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RequestQuoteIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="product-stock"
              label="موجودی محصول"
              placeholder="تعداد موجودی"
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShowChartIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="product-category-label">دسته‌بندی محصول</InputLabel>
              <Select
                labelId="product-category-label"
                id="product-category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                label="دسته‌بندی محصول"
                required
              >
                <MenuItem value="">انتخاب دسته‌بندی</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="product-sub-category-label">ساب کتگوری محصول</InputLabel>
              <Select
                labelId="product-sub-category-label"
                id="product-sub-category"
                value={productSubCategory}
                onChange={(e) => setProductSubCategory(e.target.value)}
                label="ساب کتگوری محصول"
                required
              >
                <MenuItem value="">انتخاب ساب کتگوری</MenuItem>
                {subCategories.map((subCategory) => (
                  <MenuItem key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="product-information"
              label="اطلاعات محصول"
              placeholder="اطلاعات محصول"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FormatAlignRightIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="product-image"
              label="تصویر محصول"
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CollectionsIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {error && (
              <Typography variant="body2" sx={{ color: "red" }}>
                {error}
              </Typography>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}