import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import { loadUserFromCookies, logout } from "../../redux/reducers/authSlice";
import { fetchCart } from "../../redux/reducers/cartSlice";
import { fetchProducts } from "../../redux/reducers/productsSlice";
import { ProfileContainer } from "./Profile.style";
import ProfileSection from "./ProfileSection";
import ContentSection from "./ContentSection";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Redux state selectors
  const { 
    user, 
    loading: authLoading 
  } = useSelector((state) => state.auth);
  
  const { 
    products,
    loading: productsLoading 
  } = useSelector((state) => state.products);
  

  // Local state
  const [activeTab, setActiveTab] = useState("orders");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Notification handlers
  const showAlert = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);
  const handleError = useCallback((error) => {
    console.error("Error:", error);
    if (error?.response?.status === 401) {
      dispatch(logout());
      showAlert("Session expired. Please login again.", "error");
      setTimeout(() => navigate("/auth"), 2000);
    } else {
      showAlert(error?.response?.message || error.message || "An error occurred", "error");
    }
  }, [dispatch, navigate, showAlert]);

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await dispatch(loadUserFromCookies()).unwrap();
        await dispatch(fetchCart()).unwrap();
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        handleError(error);
      }
    };
    
    loadInitialData();
  }, [dispatch, handleError]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const renderEmptyState = (icon, text) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        color: "text.secondary",
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 50, mb: 2 } })}
      <Typography variant="body2" component="div">
        {text}
      </Typography>
    </Box>
  );

  if (authLoading  || productsLoading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <Typography variant="h6">Loading user data...</Typography>
      </Box>
    );
  }

  return (
    <ProfileContainer>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <ProfileSection />
          <ContentSection
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            renderEmptyState={renderEmptyState}
            isMobile={isMobile}
          />
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default Profile;