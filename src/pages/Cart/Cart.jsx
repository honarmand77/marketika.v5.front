import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  fetchCart,
  updateItemQuantity,
  removeItemFromCart,
  clearUserCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartItemCount,
  selectCartStatus,
} from '../../redux/reducers/cartSlice';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  Refresh,
  ShoppingCart,
  Login,
  Store,
  LocalMall,
} from '@mui/icons-material';
import ProductCard from '../../components/ProductCard/ProductCard';
import {  Products_Container } from '../Products/Products.style';
import { Product_Container } from '../../components/ProductSections/ProductSections.style';

const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

// کامپوننت سبد خرید خالی
const EmptyCart = memo(({ isAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card className="AuthStep" sx={{ 
      width: isMobile ? '100%' : '500px', 
      mx: 'auto', 
      mt: 4, 
      boxShadow: 0 
    }}>
      <CardContent sx={{ 
        textAlign: 'center', 
        p: 4 
      }}>
        <Avatar sx={{ 
          bgcolor: 'secondary.light', 
          width: 80, 
          height: 80,
          mx: 'auto',
          mb: 3
        }}>
          <ShoppingCart sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold', 
          mb: 2 
        }}>
          {isAuthenticated ? 'سبد خرید شما خالی است' : 'برای مشاهده سبد خرید وارد شوید'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {isAuthenticated 
            ? 'محصولات مورد نظر خود را به سبد خرید اضافه کنید'
            : 'لطفاً برای مشاهده و مدیریت سبد خرید خود وارد حساب کاربری شوید'}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexDirection:"column",
          gap: 2 
        }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Store />}
            onClick={() => navigate('/shop')}
            sx={{ 
              minWidth: 180, 
              display: "flex",
              gap: "5px",
              color: "#fff",
              boxShadow: 0,
              background: "linear-gradient(45deg, #FFA05C, #FF7B54)"
            }}
          >
            مشاهده محصولات
          </Button>
          {!isAuthenticated && (
            <Button
              variant="outlined"
              size="large"
              startIcon={<Login />}
              onClick={() => navigate('/auth')}
              sx={{ minWidth: 180, display: "flex", gap: "5px" }}
            >
              ورود به حساب
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

EmptyCart.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const allProducts = useSelector(state => state.products.products);
const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const itemCount = useSelector(selectCartItemCount);
  const cartStatus = useSelector(selectCartStatus);
  const isAuthenticated = useSelector(state => !!state.auth);
  const { user } = useSelector(state => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const loading = cartStatus === 'loading';


  const handleClearCart = useCallback(async () => {
    try {
      await dispatch(clearUserCart({userId: user?.id}));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [dispatch, user?.id]);

  const handleRefreshCart = useCallback(async () => {
    try {
      await dispatch(fetchCart(user?.id));
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  }, [dispatch, user?.id]);

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  // بروزرسانی دوره‌ای سبد خرید
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart(user?.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);


  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyCart isAuthenticated={false} />
      </Container>
    );
  }

  if (itemCount === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyCart isAuthenticated={true} />
      </Container>
    );
  }

  return (
    <Products_Container className="scroller">

      <Box sx={{ 
        width: "100vw",
        padding: "5px",
        margin: "0",
        maxWidth: "100vw",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column"
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 2,
          width: "100%"
        }}>
          <Tabs sx={{ width: "max-content" }} value={`سبد خرید شما (${itemCount.toLocaleString('fa-IR')})`}>
            <Tab label={`سبد خرید شما (${itemCount.toLocaleString('fa-IR')})`} />
          </Tabs>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefreshCart}
            disabled={loading}
            sx={{ display: "flex", gap: "5px" }}
          >
            به‌روزرسانی
          </Button>
        </Box>
        <Grid item xs={12}>

      <Product_Container container spacing={2}>
          {cartItems.map((item) => (
                            <motion.div
                              key={item.product._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ProductCard 
                                product={item.product} 
                                loading={loading}
                              />
                            </motion.div>
          ))}
        </Product_Container>
        </Grid>
        <Paper sx={{ 
          boxShadow: 0,
          p: 2,
          width: "100%",
          background: "#fcfcfc",
          position: "fixed",
          bottom: isMobile ? "70px" : "0",
          zIndex: 999
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                جمع کل: {formatPrice(totalPrice)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                هزینه ارسال در مرحله پرداخت محاسبه می‌شود
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleClearCart}
                disabled={loading}
                sx={{ display: 'flex', gap: "5px" }}
              >
                خالی کردن 
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<LocalMall />}
                onClick={handleCheckout}
                disabled={loading}
                sx={{ 
                  minWidth: 200, 
                  height: 50,
                  display: 'flex', 
                  gap: "5px", 
                  color: "#fff" 
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'تکمیل سفارش'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Products_Container>
  );
};

export default memo(Cart);