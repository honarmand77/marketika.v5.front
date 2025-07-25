import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Skeleton,
  Alert,
  Chip,
  IconButton,
  TextField,
  Rating,
  Snackbar,
  Stack,
  useMediaQuery,
  useTheme,
  Slide,
  Tooltip,
  CircularProgress,
  Fab,
  Badge,
  Paper,
} from "@mui/material";
import {
  ShoppingCart,
  Telegram,
  WhatsApp,
  Instagram,
  Twitter,
  ArrowBack,
  Add,
  Remove,
  Star,
  StarBorder
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

// Custom Components
import ProductCard from "../../components/ProductCard/ProductCard";
import ImageGallery from "./ImageGallery";
import ProductFeatures from "./ProductFeatures";
import ProductTabs from "./ProductTabs";

// API Functions
import { viewProduct } from "../../api/views";
import { addToCart} from "../../api/cart";
import { likeProduct } from "../../api/products"
import { fetchProducts } from "../../api/products";
import { submitReview, fetchReviews } from "../../api/reviews";

// Styled Components
const ProductContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  margin: '16px 0',
});

const DiscountBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  fontWeight: 'bold',
  padding: '4px 8px',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

 function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Main state
  const [state, setState] = useState({
    selectedProduct: null,
    relatedProducts: [],
    loading: true,
    error: null,
    quantity: 1,
    rating: 0,
    review: "",
    reviews: [],
    activeTab: 0,
    wishlisted: false,
    currentImageIndex: 0,
    loadingWishlist: false,
    loadingAddToCart: false,
  });

  const [toast, setToast] = useState({ 
    open: false, 
    message: "", 
    severity: "info" 
  });

  // Calculate discounted price
  const discountedPrice = useMemo(() => {
    if (!state.selectedProduct?.discount) return state.selectedProduct?.price;
    return Math.round(state.selectedProduct.price * (100 - state.selectedProduct.discount) / 100);
  }, [state.selectedProduct]);

  // Load product data
  const loadProduct = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const products = await fetchProducts();
      const product = products.find((p) => p._id === productId);
      
      if (!product) {
        setState(prev => ({ ...prev, error: "محصول مورد نظر یافت نشد." }));
        return;
      }

      const [reviews] = await Promise.all([
        fetchReviews(productId).catch(() => []),
        viewProduct(productId).catch(console.error)
      ]);

      setState(prev => ({
        ...prev,
        selectedProduct: product,
        relatedProducts: products
          .filter((p) => p.category._id === product.category._id && p._id !== productId)
          .slice(0, 4),
        reviews,
        rating: product.averageRating || 0,
      }));

    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
      setState(prev => ({ ...prev, error: "خطا در بارگذاری محصول. لطفاً دوباره تلاش کنید." }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // Handlers
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("لطفاً ابتدا وارد شوید", "warning");
      navigate("/auth", { state: { from: `/product/${productId}` } });
      return;
    }

    try {
      setState(prev => ({ ...prev, loadingAddToCart: true }));
      await addToCart(state.selectedProduct._id, state.quantity, token);
      showToast("محصول به سبد خرید اضافه شد", "success");
    } catch (error) {
      showToast("خطا در افزودن به سبد خرید", "error");
    } finally {
      setState(prev => ({ ...prev, loadingAddToCart: false }));
    }
  };

  const handleWishlistToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("لطفاً ابتدا وارد شوید", "warning");
      navigate("/auth", { state: { from: `/product/${productId}` } });
      return;
    }

    try {
      setState(prev => ({ ...prev, loadingWishlist: true }));
      await likeProduct(state.selectedProduct._id, token);
      setState(prev => ({
        ...prev,
        wishlisted: !prev.wishlisted,
        loadingWishlist: false,
      }));
      showToast(
        state.wishlisted ? "از لیست علاقه‌مندی‌ها حذف شد" : "به لیست علاقه‌مندی‌ها اضافه شد",
        "success"
      );
    } catch (error) {
      showToast("خطا در بروزرسانی لیست علاقه‌مندی‌ها", "error");
      setState(prev => ({ ...prev, loadingWishlist: false }));
    }
  };

  const handleSubmitReview = async () => {
    if (!state.review || state.rating === 0) {
      showToast("لطفاً امتیاز و نظر خود را وارد کنید", "warning");
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("لطفاً ابتدا وارد شوید", "warning");
      navigate("/auth", { state: { from: `/product/${productId}` } });
      return;
    }

    try {
      const newReview = await submitReview(
        productId,
        { rating: state.rating, comment: state.review },
        token
      );
      
      const updatedReviews = [...state.reviews, newReview];
      const newAverage = updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length;
      
      setState(prev => ({
        ...prev,
        reviews: updatedReviews,
        review: "",
        rating: 0,
        selectedProduct: {
          ...prev.selectedProduct,
          averageRating: newAverage,
          reviewCount: updatedReviews.length,
        },
      }));
      
      showToast("نظر شما با موفقیت ثبت شد", "success");
    } catch (error) {
      showToast("خطا در ثبت نظر", "error");
    }
  };

  const showToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  // Loading state
  if (state.loading) {
    return (
      <ProductContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />
            <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="60%" height={50} />
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="rounded" width={120} height={40} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </ProductContainer>
    );
  }

  // Error state
  if (state.error) {
    return (
      <ProductContainer maxWidth="lg">
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ borderRadius: '8px' }}
        >
          بازگشت
        </Button>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>

      <Grid container spacing={4}>
        {/* Product Images Section */}
        <Grid item xs={12} md={6}>
          <ImageGallery 
            product={state.selectedProduct}
            currentImageIndex={state.currentImageIndex}
            onImageChange={(index) => setState(prev => ({ ...prev, currentImageIndex: index }))}
            onWishlistToggle={handleWishlistToggle}
            wishlisted={state.wishlisted}
            loadingWishlist={state.loadingWishlist}
          />

          {/* Product Features */}
          <ProductFeatures />
        </Grid>

        {/* Product Info Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            {/* Title and Category */}
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {state.selectedProduct.name}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Chip
                label={state.selectedProduct.category.name}
                color="primary"
                size="small"
                sx={{ borderRadius: '4px' }}
              />
              <Typography variant="caption" color="text.secondary">
                کد: {state.selectedProduct.sku || "ندارد"}
              </Typography>
            </Box>
            
            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Rating 
                value={state.selectedProduct.averageRating || 0} 
                precision={0.5}
                readOnly
                icon={<Star fontSize="inherit" color="primary" />}
                emptyIcon={<StarBorder fontSize="inherit" />}
              />
              <Typography variant="body2" color="text.secondary">
                ({state.selectedProduct.reviewCount || 0} نظر)
              </Typography>
            </Box>

            {/* Price */}
            <PriceContainer>
              {state.selectedProduct.discount > 0 && (
                <DiscountBadge label={`${state.selectedProduct.discount}% تخفیف`} />
              )}
              <Box>
                {state.selectedProduct.discount > 0 && (
                  <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    {state.selectedProduct.price.toLocaleString()} تومان
                  </Typography>
                )}
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {discountedPrice.toLocaleString()} تومان
                </Typography>
              </Box>
            </PriceContainer>

            {/* Short Description */}
            <Typography variant="body1" color="text.secondary" paragraph>
              {state.selectedProduct.shortDescription || state.selectedProduct.description}
            </Typography>

            {/* Quantity Selector */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '12px', bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                تعداد:
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton 
                  onClick={() => setState(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  disabled={state.quantity <= 1}
                  sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '8px',
                  }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  type="number"
                  value={state.quantity}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    setState(prev => ({ ...prev, quantity: val }));
                  }}
                  sx={{ width: 80 }}
                  inputProps={{ 
                    min: 1, 
                    style: { textAlign: "center" } 
                  }}
                />
                <IconButton 
                  onClick={() => setState(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                  sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '8px',
                  }}
                >
                  <Add />
                </IconButton>
              </Stack>
            </Paper>

            {/* Action Buttons */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <ActionButton
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={state.loadingAddToCart ? 
                    <CircularProgress size={20} color="inherit" /> : 
                    <ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={state.loadingAddToCart}
                >
                  {state.loadingAddToCart ? "در حال افزودن..." : "افزودن به سبد"}
                </ActionButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ActionButton
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    handleAddToCart();
                    navigate("/checkout");
                  }}
                >
                  خرید سریع
                </ActionButton>
              </Grid>
            </Grid>

            {/* Share Buttons */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                اشتراک گذاری:
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                {[
                  { icon: <Telegram />, color: '#0088cc', name: 'telegram' },
                  { icon: <WhatsApp />, color: '#25D366', name: 'whatsapp' },
                  { icon: <Instagram />, color: '#E1306C', name: 'instagram' },
                  { icon: <Twitter />, color: '#1DA1F2', name: 'twitter' },
                ].map((item) => (
                  <Tooltip key={item.name} title={`اشتراک در ${item.name}`}>
                    <IconButton
                      sx={{ 
                        color: item.color,
                        backgroundColor: theme.palette.action.hover,
                        '&:hover': {
                          backgroundColor: theme.palette.action.selected,
                        }
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Paper>
          </Box>

          {/* Product Tabs */}
          <ProductTabs 
            activeTab={state.activeTab}
            onTabChange={(newValue) => setState(prev => ({ ...prev, activeTab: newValue }))}
            product={state.selectedProduct}
            reviews={state.reviews}
            rating={state.rating}
            reviewText={state.review}
            onRatingChange={(newValue) => setState(prev => ({ ...prev, rating: newValue }))}
            onReviewChange={(e) => setState(prev => ({ ...prev, review: e.target.value }))}
            onSubmitReview={handleSubmitReview}
          />
        </Grid>
      </Grid>

      {/* Related Products */}
      {state.relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            محصولات مشابه
          </Typography>
          <Grid container spacing={3}>
            {state.relatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24,
            zIndex: 1000
          }}
          onClick={handleAddToCart}
          disabled={state.loadingAddToCart}
        >
          {state.loadingAddToCart ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Badge badgeContent={state.quantity} color="secondary">
              <ShoppingCart />
            </Badge>
          )}
        </Fab>
      )}

      {/* Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        TransitionComponent={Slide}
      >
        <Alert 
          severity={toast.severity} 
          sx={{ width: "100%" }}
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ProductContainer>
  );
}

export default React.memo(ProductPage); 
