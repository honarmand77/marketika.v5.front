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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import Cookies from "js-cookie";
import { addSubCategory } from "../../../api/subcategories"; // import the functions
import { categoryData } from "../../../api/categories"; // import the functions
import CollectionsIcon from "@mui/icons-material/Collections";


export function AddSubCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("authToken");
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await categoryData();
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت کتگوری‌ها:", error);
        setError("خطا در دریافت کتگوری‌ها.");
      }
    };
    getCategories();
  }, [token]);

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !selectedCategory || !token) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("categoryId", selectedCategory);
      console.log(selectedCategory)
      await addSubCategory(formData); // استفاده از تابع addSubCategory از فایل api

      alert("ساب‌کتگوری با موفقیت اضافه شد!");
      resetForm([setName, setDescription, setSelectedCategory]);
    } catch (error) {
      console.error("خطا در افزودن ساب‌کتگوری:", error);
      setError("خطایی رخ داد!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (setters) => {
    setters.forEach((setter) => setter(""));
  };

  return (
    <Card sx={{background:"transparent", borderRadius: '8px' }}> {/* تغییر رنگ پس‌زمینه کارت */}
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ color: "#ffa05c" }}>
            📂 افزودن ساب‌کتگوری جدید
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa05c",
              "&:hover": { backgroundColor: "#e68a4a" }, // تغییر رنگ هنگام هاور
            }}
            onClick={handleAddSubCategory}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "افزودن ساب‌کتگوری"}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleAddSubCategory} encType="multipart/form-data">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FormControl fullWidth>
              <InputLabel id="parent-category-label">کتگوری اصلی</InputLabel>
              <Select
                labelId="parent-category-label"
                id="parent-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="کتگوری اصلی"
                required
              >
                <MenuItem value="">انتخاب کتگوری اصلی</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="SubCategory-name"
              label="نام ساب‌کتگوری"
              placeholder="نام ساب‌کتگوری"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              id="SubCategory-information"
              label="توضیحات ساب‌کتگوری"
              placeholder="توضیحات ساب‌کتگوری"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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