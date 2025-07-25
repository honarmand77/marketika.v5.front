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
import { addBanner } from "../../../api/banners";

export function AddBanner() {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("authToken");

  const handleAddBanner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", bannerTitle);
      formData.append("link", bannerLink);
      formData.append("imageUrl", bannerImage);

      await addBanner(formData); // استفاده از تابع addBanner از فایل api

      alert("بنر با موفقیت اضافه شد!");
      resetForm([setBannerTitle, setBannerLink]);
      setBannerImage(null);
    } catch (error) {
      console.error("خطا در افزودن بنر:", error);
      setError("خطایی رخ داد!");
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
            📢 افزودن بنر جدید
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa05c",
              "&:hover": { backgroundColor: "#e68a4a" }, // تغییر رنگ هنگام هاور
            }}
            onClick={handleAddBanner}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "افزودن بنر"}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleAddBanner} encType="multipart/form-data">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              id="banner-Title"
              label="عنوان بنر"
              placeholder="عنوان بنر"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
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
              id="banner-Link"
              label="لینک بنر"
              placeholder="لینک بنر"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
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
              id="banner-Image"
              label="تصویر بنر"
              type="file"
              onChange={(e) => setBannerImage(e.target.files[0])}
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