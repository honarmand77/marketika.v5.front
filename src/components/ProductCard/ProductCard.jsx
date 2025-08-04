import React, { useCallback, useState, useEffect, memo } from "react";
import {
  CardMedia,
  CardContent,
  CardActionArea,
  IconButton,
  Typography,
  Skeleton,
  Tooltip,
  Box,
  useTheme,
  useMediaQuery,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete
} from "@mui/icons-material";
import _default from '../../assets/icons/marketika defullt.svg';
import { useNavigate } from "react-router-dom";
import { Api_Url } from "../../api";
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../redux/reducers/productsSlice';
import { 
  addItemToCart, 
  removeItemFromCart, 
  selectCartItems
} from "../../redux/reducers/cartSlice";

// تابع کمکی برای فرمت قیمت
const formatPrice = (price) => {
  const parsedPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  return new Intl.NumberFormat('fa-IR').format(parsedPrice) + ' تومان';
};

const ProductCard = ({ product, loading, ClassName }) => {
  // Hooks و stateها
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { user, token } = useSelector(state => state.auth);
  const cartItems = useSelector(selectCartItems);
  const cartLoading = useSelector(state => state.cart.cartLoadingStates[product?._id] || false);
  const likeLoading = useSelector(state => state.products.loadingStates[product?._id] || false);
  
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [localCartState, setLocalCartState] = useState({
    isInCart: false,
    quantity: 0,
    item: null
  });

  // مقادیر محاسبه شده
  const isFavorite = product?.likes?.includes(user?.id) || false;
  const likeCount = product?.likes?.length || 0;
  const productPrice = parseFloat(product?.price?.$numberDecimal || product?.price || 0);

  // محاسبه وضعیت سبد خرید بر اساس تغییرات
  useEffect(() => {
    const cartItem = cartItems.find(item => item?.product?._id === product?._id);
    
    setLocalCartState({
      isInCart: !!cartItem,
      quantity: cartItem?.quantity || 0,
      item: cartItem || null
    });
  }, [cartItems, product?._id]);

  // مدیریت علاقه‌مندی‌ها
  const handleLike = useCallback(async (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    
    if (!token) {
      navigate("/auth");
      return;
    }


    try {
      await dispatch(toggleLike({
        productId: product?._id,
        userId: user?.id,
        isCurrentlyLiked: isFavorite
      })).unwrap();
    } catch (error) {
      console.error("خطا در عملیات لایک:", error);
    }
    setIsAnimating(false);

  }, [product?._id, user?.id, token, navigate, isFavorite, dispatch]);

  // افزودن به سبد خرید با به‌روزرسانی فوری
  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!token) return navigate("/auth");
    if (cartLoading) return;
    
    // به‌روزرسانی فوری UI
    setLocalCartState(prev => ({
      isInCart: true,
      quantity: prev.quantity + 1,
      item: prev.item || { // ایجاد یک آیتم موقت
        _id: `temp-${Date.now()}`,
        product,
        quantity: prev.quantity + 1,
        priceAtAddition: productPrice
      }
    }));

    try {
      await dispatch(addItemToCart({
        userId: user?.id,
        productId: product?._id,
        quantity: 1,
      })).unwrap();
    } catch (error) {
      // بازگردانی در صورت خطا
      setLocalCartState(prev => ({
        ...prev,
        isInCart: prev.quantity > 0,
        quantity: Math.max(0, prev.quantity),
        item: prev.quantity > 0 ? prev.item : null
      }));
      console.error("خطا در افزودن به سبد خرید:", error);
    }
  }, [product, user?.id, token, navigate, dispatch, cartLoading, productPrice]);

  // کاهش تعداد در سبد خرید با به‌روزرسانی فوری
  const handleDecreaseQuantity = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!token || cartLoading) return;
    
    // به‌روزرسانی فوری UI
    setLocalCartState(prev => ({
      ...prev,
      quantity: Math.max(0, prev.quantity - 1),
      isInCart: prev.quantity > 1
    }));

    try {
      await dispatch(addItemToCart({
        userId: user?.id,
        productId: product?._id,
        quantity: -1,
      })).unwrap();
    } catch (error) {
      // بازگردانی در صورت خطا
      setLocalCartState(prev => ({
        ...prev,
        quantity: prev.quantity + 1,
        isInCart: true
      }));
      console.error("خطا در کاهش تعداد محصول:", error);
    }
  }, [product?._id, user?.id, token, dispatch, cartLoading]);

  // حذف کامل از سبد خرید
  const handleRemoveItem = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!token || cartLoading || !localCartState.item) return;
    
    // به‌روزرسانی فوری UI
    setLocalCartState({
      isInCart: false,
      quantity: 0,
      item: null
    });

    try {
      await dispatch(removeItemFromCart(localCartState.item._id)).unwrap();
    } catch (error) {
      // بازگردانی در صورت خطا
      setLocalCartState({
        isInCart: true,
        quantity: localCartState.quantity,
        item: localCartState.item
      });
      console.error('خطا در حذف محصول:', error);
    }
  }, [localCartState, dispatch, cartLoading, token]);

  // وضعیت موجودی محصول
  const renderStockStatus = useCallback(() => {
    const stock = parseInt(product?.stock || 0);
    
    if (stock <= 0) {
      return (
        <Chip 
          label="ناموجود" 
          size="small" 
          color="error" 
          sx={{ mr: 1, mb: 1 }} 
        />
      );
    }
    
    if (stock < 5) {
      return (
        <Chip 
          label={`تنها ${stock} عدد باقی مانده`} 
          size="small" 
          color="warning" 
          sx={{ mr: 1, mb: 1 }} 
        />
      );
    }
    
    return null;
  }, [product?.stock]);

  // مدیریت خطای تصویر
  const handleImageError = useCallback(() => setImageError(true), []);

  // مدیریت کلیک روی کارت محصول
  const handleCardClick = useCallback(() => {
    navigate(`/productPage/${product?._id}`);
  }, [product?._id, navigate]);

  // نمایش اسکلت در حالت لودینگ
  if (loading) {
    return (
      <CardActionArea className={`card ${ClassName}`} sx={skeletonStyles}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </CardActionArea>
    );
  }

  // محاسبه قیمت کل برای این محصول
  const totalPrice = localCartState.item 
    ? localCartState.item.priceAtAddition * localCartState.quantity 
    : productPrice * localCartState.quantity;

  return (
    <CardActionArea
      className={`Card ${ClassName}`}
      sx={cardStyles}
      onClick={handleCardClick}
    >
      {/* دکمه علاقه‌مندی‌ها */}
      <Tooltip title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}>
        <IconButton
          aria-label="toggle favorite"
          onClick={handleLike}
          sx={favoriteButtonStyles}
        >
          <Typography variant="body2" component="div" sx={{ ml: 0.5 }}>
            {likeCount}
          </Typography>
          { isFavorite ? (
            <FavoriteIcon sx={favoriteIconStyles(isAnimating)} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Tooltip>

      {/* تصویر محصول */}
      <CardActionArea className="img" sx={imageContainerStyles}>
        <CardMedia
          component="img"
          height={isMobile ? "150px" : "200px"}
          src={imageError ? _default : `${Api_Url}/${product?.images?.[0]}`}
          alt={product?.name}
          sx={imageStyles}
          onError={handleImageError}
          placeholder="blur"
          loading="lazy"
        />
      </CardActionArea>

      {/* محتوای محصول */}
      <CardContent sx={contentStyles}>
        {/* عنوان محصول */}
        <Typography
          variant="body2"
          component="div"
          sx={titleStyles}
        >
          {product?.name || "بدون عنوان"}
        </Typography>
        
        {/* وضعیت موجودی و دسته‌بندی */}
        <Box sx={{ mt: 1 }}>
          {renderStockStatus()}
          <Chip
            label={`${product?.category?.name || "بدون دسته‌بندی"}`}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
          <Chip
            label={`${product?.subCategory?.name || "بدون دسته‌بندی"}`}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        </Box>
        
        {/* قیمت و مدیریت سبد خرید */}
        <Box sx={cartSectionStyles}>
          <Typography variant="body2" sx={priceStyles}>
            {formatPrice(productPrice)}
          </Typography>

          {localCartState.isInCart ? (
            <Box sx={cartControlsStyles}>
              <IconButton
                aria-label="حذف محصول"
                onClick={handleRemoveItem}
                disabled={cartLoading}
                size="small"
                sx={cartIconStyles}
              >
                 <Delete fontSize="small" />
              </IconButton>
              
              <IconButton
                aria-label="کاهش تعداد"
                onClick={handleDecreaseQuantity}
                disabled={cartLoading || localCartState.quantity <= 1}
                size="small"
                sx={cartIconStyles}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              
              <Typography variant="body2" sx={quantityStyles}>
                { localCartState.quantity}
              </Typography>
              
              <IconButton
                aria-label="افزایش تعداد"
                onClick={handleAddToCart}
                disabled={cartLoading}
                size="small"
                sx={cartIconStyles}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Tooltip title="افزودن به سبد خرید">
              <IconButton
                aria-label="افزودن به سبد خرید"
                onClick={handleAddToCart}
                disabled={cartLoading}
                sx={addToCartButtonStyles}
              >
                <ShoppingCartIcon fontSize="medium" sx={{ padding: "2px" }} />
              </IconButton>
            </Tooltip>
          )}
          
          {localCartState.isInCart && (
            <Typography variant="body2" sx={totalPriceStyles}>
              {formatPrice(totalPrice)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </CardActionArea>
  );
};

// استایل‌ها
const skeletonStyles = { 
  position: "relative", 
  height: 400, 
  width: 250, 
  borderRadius: "0px" 
};

const cardStyles = {
  position: "relative",
  maxHeight: "max-content",
  boxShadow: "none",
  padding: "5px",
  display: "flex",
  width: { xs: '100%', sm: '250px' },
  flexDirection: "column",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    background:  "#52575D",
    ">:nth-child(3)": {
      "*": { color: "#fff" }
    }
  },
};

const favoriteButtonStyles = {
  position: "absolute",
  top: 1,
  right: 1,
  zIndex: 1,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  background: "#52575D",
  borderRadius: "5px"
};

const favoriteIconStyles = (isAnimating) => ({
  transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
  transition: '.5s ease',
  color: isAnimating ? '#ff4081' : 'inherit'
});

const imageContainerStyles = { 
  background: "#fff", 
  borderRadius: "8px" 
};

const imageStyles = { 
  objectFit: "contain", 
  padding: "5px" 
};

const contentStyles = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "5px",
  width: "100%"
};

const titleStyles = {
  mb: 1,
  fontWeight: 600,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
};

const cartSectionStyles = {
  mt: 2,
  display: "flex",
  flexDirection: "column"
};

const priceStyles = { 
  p: 1, 
  color: "#52575D", 
  fontWeight: "bold" 
};

const cartControlsStyles = {
  display: 'flex', 
  alignItems: 'center',
  gap: 0.5,
  background: "#52575D",
  borderRadius: '20px',
  padding: '5px 10px',
  color: '#fff',
  alignSelf: "flex-end",
  m: 1
};

const cartIconStyles = { 
  color: '#fff',
  padding: '4px',
  '&:hover': { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
  }
};

const quantityStyles = { 
  minWidth: '20px', 
  textAlign: 'center',
  fontWeight: 'bold'
};

const totalPriceStyles = {
  alignSelf: "flex-end",
  fontSize: "0.8rem",
  color: "#666",
  mt: 0.5
};

const addToCartButtonStyles = { 
  p: 1, 
  color: "#fff", 
  background: "#52575D",
  alignSelf: "flex-end",
  '&:hover': {
    background: "#52575D"
  },
  '&:disabled': {
    background: "#e0e0e0",
    color: "#9e9e9e"
  }
};

export default memo(ProductCard);