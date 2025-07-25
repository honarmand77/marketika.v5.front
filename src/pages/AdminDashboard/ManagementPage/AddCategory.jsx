import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import CollectionsIcon from "@mui/icons-material/Collections";
import Cookies from "js-cookie";
import { addCategory } from "../../../api/categories";
export function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("authToken");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("description", categoryDescription);
      formData.append("image", categoryImage);



      // Make sure the endpoint matches your backend route
      await addCategory(formData);

      alert("دسته‌بندی با موفقیت اضافه شد!");
      resetForm([setCategoryName, setCategoryDescription]);
      setCategoryImage(null);
    } catch (error) {
      console.error("خطا در افزودن دسته‌بندی:", error);
      setError("آدرس API یافت نشد. لطفا از صحت آدرس اطمینان حاصل کنید");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (setters) => {
    setters.forEach((setter) => setter(""));
  };

  return (
    <Card sx={{background:"transparent", borderRadius: '8px'}}>
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ color: "#ffa05c" }}>
            📂 افزودن دسته‌بندی جدید
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa05c",
              "&:hover": { backgroundColor: "#e68a4a" },
            }}
            onClick={handleAddCategory}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "افزودن دسته‌بندی"}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleAddCategory} encType="multipart/form-data">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              id="category-Name"
              label="نام دسته‌بندی"
              placeholder="نام دسته‌بندی"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon sx={{ color: "#ffa05c" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="category-Description"
              label="توضیحات دسته‌بندی"
              placeholder="توضیحات دسته‌بندی"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FormatAlignRightIcon sx={{ color: "#ffa05c" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="category-Image"
              label="تصویر دسته‌بندی"
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CollectionsIcon sx={{ color: "#ffa05c" }} />
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