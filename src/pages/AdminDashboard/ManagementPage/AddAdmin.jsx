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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import { addAdmin } from "../../../api/admin"; // import the addAdmin function

export function AddAdmin() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const adminData = {
        name: adminName,
        email: adminEmail,
        role: adminRole,
      };

      await addAdmin(adminData); // استفاده از تابع addAdmin از فایل api

      alert("ادمین با موفقیت اضافه شد!");
      resetForm([setAdminName, setAdminEmail, setAdminRole]);
    } catch (error) {
      console.error("خطا در افزودن ادمین:", error);
      setError("خطایی رخ داد!");
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
          <Typography variant="h6" component="div" sx={{ color: "#ffa05c", fontWeight: "bold" }}>
            👤 افزودن ادمین جدید
          </Typography>
        }
        action={
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa05c",
              "&:hover": { backgroundColor: "#e68a4a" }, // تغییر رنگ هنگام هاور
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={handleAddAdmin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "افزودن ادمین"}
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleAddAdmin}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              id="admin-Name"
              label="نام ادمین جدید"
              placeholder="نام ادمین جدید"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffa05c" },
                  "&:hover fieldset": { borderColor: "#e68a4a" },
                },
              }}
            />
            <TextField
              id="admin-Email"
              label="ایمیل ادمین جدید"
              placeholder="ایمیل ادمین جدید"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffa05c" },
                  "&:hover fieldset": { borderColor: "#e68a4a" },
                },
              }}
            />
            <TextField
              id="admin-Role"
              label="نقش ادمین جدید"
              placeholder="نقش ادمین جدید"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyboardCommandKeyIcon sx={{ color: "#ffa05c" }} /> {/* تغییر رنگ آیکون */}
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ffa05c" },
                  "&:hover fieldset": { borderColor: "#e68a4a" },
                },
              }}
            />
            {error && (
              <Typography variant="body2" sx={{ color: "red", textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}