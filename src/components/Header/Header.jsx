import React, { useState, useEffect } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Buttons from "../Buttons/Buttons";
import { ReactComponent as Logo } from "../../assets/icons/marketika.svg";
import { 
  IconContainer,
  HeaderContainer,
  ButtonContainer,
  ProfileIconContainer,
  SearchContainer
} from "./Header.style";
import { useSelector, useDispatch } from 'react-redux';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { logout, loadUserFromStorage } from "../../redux/reducers/authSlice";
import Cookies from "js-cookie";
export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { user, token, role } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  // Update active path when location changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Load user from cookies on mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);



  // Theme management
  useEffect(() => {
    const savedTheme = Cookies.get("isDarkMode");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
      if (JSON.parse(savedTheme)) {
        document.body.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    Cookies.set("isDarkMode", JSON.stringify(newTheme), { expires: 7 });
    if (newTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (isSearchFocused) {
      setIsSearchFocused(false);
    }
  };

  const isActive = (path) => {
    return active === path || 
           (path === "/shop" && active.startsWith("/shop")) ||
           (path === "/profile" && active.startsWith("/profile"));
  };

  return (
    <HeaderContainer className="AuthStep" >
      <IconContainer className="open">
        <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>مارکتیکا</h1>
      </IconContainer>

      <SearchContainer isFocused={isSearchFocused}>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            size="small"
            placeholder="دنبال چی میگردی؟"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: "20px",
                backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
                "& fieldset": { border: "none" },
                "&:hover": {
                  backgroundColor: isDarkMode ? "#444" : "#eee",
                }
              }
            }}
          />
        </form>
      </SearchContainer>

      <ButtonContainer>
        <Buttons 
          Lable="خانه" 
          style={{ color: isDarkMode ? "#fff" : "#444" }} 
          type={isActive("/") ? "HeaderButtons active" : "HeaderButtons" }
          OnClick={() => handleClick("/")} 
          Icon={<HomeRoundedIcon fontSize="small" />}
        />
        <Buttons 
          Lable="فروشگاه" 
          style={{ color: isDarkMode ? "#fff" : "#444" }} 
          type={isActive("/shop") ? "HeaderButtons active" : "HeaderButtons" }
          OnClick={() => handleClick("/shop")} 
          Icon={<Inventory2RoundedIcon fontSize="small" />}
        />
        <Buttons 
          Lable="سبد خرید" 
          style={{ color: isDarkMode ? "#fff" : "#444" }} 
          type={isActive("/cart") ? "HeaderButtons active" : "HeaderButtons" }
          OnClick={() => handleClick("/cart")} 
          Icon={<LocalMallRoundedIcon fontSize="small" />}
        />
        
        {isAuthenticated ? (
          <ProfileIconContainer>
            <Box className="logout">
              <Buttons 
                Lable="پروفایل"
                style={{ color: isDarkMode ? "#fff" : "#444", width: "50px" }} 
                type={isActive("/profile") ? "HeaderButtons active" : "HeaderButtons" }
                OnClick={() => handleClick("/profile")} 
                Icon={<AccountCircleRoundedIcon fontSize="small" />}
              />
              <Buttons 
                Lable="خروج" 
                style={{ color: isDarkMode ? "#fff" : "#444" }} 
                type="HeaderButtons" 
                OnClick={handleLogout} 
                Icon={<LogoutIcon fontSize="small" />}
              />
            </Box>
          </ProfileIconContainer>
        ) : (
          <Buttons 
            Lable="ثبت نام" 
            style={{ color: isDarkMode ? "#fff" : "#444" }} 
            type={isActive("/auth") ? "HeaderButtons active" : "HeaderButtons" }
            OnClick={() => handleClick("/auth")} 
            Icon={<AccountCircleRoundedIcon fontSize="small" />}
          />
        )}
        
        <Buttons 
          style={{ color: isDarkMode ? "#fff" : "#444" }} 
          type="HeaderButtons" 
          OnClick={toggleTheme} 
          Icon={isDarkMode ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
        />
      </ButtonContainer>
    </HeaderContainer>
  );
}