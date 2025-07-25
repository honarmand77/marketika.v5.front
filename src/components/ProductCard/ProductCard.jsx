import React, { useCallback, useState } from "react";
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
  Badge,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete
} from "@mui/icons-material";
import _default from '../../assets/icons/marketika defullt.svg';
import { useNavigate } from "react-router-dom";
import { Api_Url } from "../../api";
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../redux/reducers/productsSlice';
import { addItemToCart, removeItemFromCart, selectCartItems } from "../../redux/reducers/cartSlice";
import {selectCartLastUpdated} from '../../redux/reducers/cartSlice';

const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

const ProductCard = ({ product, loading, ClassName }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const cart = useSelector(selectCartItems);
  const likeLoading = useSelector(state => state.products.loadingStates[product?._id] || false);
  const cartLoading = useSelector(state => state.cart.cartLoadingStates[product?._id] || false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isFavorite = product?.likes?.includes(user?.id) || false;
  const likeCount = product?.likes?.length || 0;


const isInCart = cart?.some(item => {
  const itemProductId = item?.product?._id;
  const currentProductId = product?._id;
  return itemProductId === currentProductId;
});
const cartItem  = cart?.find(item => {
  const itemProductId = item?.product?._id;
  const currentProductId = product?._id;
  return itemProductId === currentProductId;
});

const cartQuantity = cartItem ? cartItem.quantity : 0;
const itemProduct = cart?.find(item => item?.product?._id === product?._id); // More specific find condition
const totalPrice = itemProduct ? itemProduct.priceAtAddition * itemProduct.quantity : 0;
const RemovwcartLoading  = useSelector(state => state.cart.itemStatus[itemProduct?._id]);




  const handleLike = useCallback(async (e) => {
    e.stopPropagation();
    
    if (!token) {
      navigate("/auth");
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    try {
      await dispatch(toggleLike({
        productId: product?._id,
        userId: user?.id,
        currentLikes: product?.likes,
        isCurrentlyLiked: isFavorite
      })).unwrap();
    } catch (error) {
      console.error("خطا در عملیات لایک:", error);
    }
  }, [product, user?.id, token, navigate, isFavorite, dispatch]);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!token) {
      navigate("/auth");
      return;
    }

    if (cartLoading) return;
    
    try {
      await dispatch(addItemToCart({
        userId: user?.id,
        productId: product?._id,
        quantity: 1,
      })).unwrap();
    } catch (error) {
      console.error("خطا در افزودن به سبد خرید:", error);
    }
  }, [product, user?.id, token, navigate, dispatch, cartLoading]);

  const handleRemoveFromCart = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!token || cartLoading) return;
    
    try {
        await dispatch(addItemToCart({
          userId: user?.id,
          productId: product?._id,
          quantity: -1,
        })).unwrap();
    } catch (error) {
      console.error("خطا در کاهش تعداد محصول:", error);
    }
  }, [product, user?.id, token, dispatch, cartLoading, cartQuantity]);

  const handleRemoveItem = useCallback(async (itemId) => {
    try {
      await dispatch(removeItemFromCart(itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }, [dispatch]);


  const renderStockStatus = useCallback(() => {
    if (!product?.stock) return null;
    
    const stock = parseInt(product.stock);
    if (stock <= 0) {
      return (
        <Chip 
          label="ناموجود" 
          size="small" 
          color="error" 
          sx={{ mr: 1, mb: 1 }} 
        />
      );
    } else if (stock < 5) {
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

  const getPrice = useCallback(() => {
    const price = product?.price?.$numberDecimal || product?.price || 0;
    return new Intl.NumberFormat("fa-IR").format(parseFloat(price)) + " تومان";
  }, [product?.price]);

  const handleCardClick = useCallback((product) => {
    navigate(`/productPage/${product?._id}`);
  }, [product?._id, navigate]);

  const handleImageError = useCallback(() => setImageError(true), []);

  if (loading) {
    return (
      <CardActionArea className={`Card ${ClassName}`} sx={{ position: "relative", height: 400, width: 250, borderRadius: "0px" }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </CardActionArea>
    );
  }

  return (
    <CardActionArea
      className={`Card ${ClassName}`}
      sx={{
        position: "relative",
        maxHeight: "max-content",
        boxShadow: "none",
        padding: "5px",
        display: "flex",
        width: isMobile ? '100%' : '250px',
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          background: "linear-gradient(45deg, #FFA05C, #FF7B54)",
          ">:nth-child(3)": {
            "*": {
              color: "#fff",
            }
          }
        },
      }}
      onClick={()=> handleCardClick(product)}
    >
      {/* Favorite Button */}
      <Tooltip title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}>
        <IconButton
          aria-label="toggle favorite"
          onClick={handleLike}
          disabled={likeLoading}
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
            zIndex: 1,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            background: "linear-gradient(45deg, #FFA05C, #FF7B54)",
            borderRadius: "5px"
          }}
        >
          {likeLoading ? (
            <CircularProgress size={20} color="#fff" />
          ) : isFavorite ? (
            <FavoriteIcon
              sx={{
                transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                color: isAnimating ? '#ff4081' : 'inherit'
              }}
            />
          ) : (
            <FavoriteBorderIcon />
          )}
          <Typography variant="body2" component="div" sx={{ ml: 0.5 }}>
            {likeCount}
          </Typography>
        </IconButton>
      </Tooltip>

      {/* Product Image */}
      <CardActionArea className="img" sx={{ background: "#fff", borderRadius: "8px" }}>
        <CardMedia
          component="img"
          height={isMobile ? "150px" : "200px"}
          src={imageError ? _default : `${Api_Url}/${product?.images?.[0]}`}
          alt={product?.name}
          sx={{ objectFit: "contain", padding: "5px" }}
          onError={handleImageError}
        />
      </CardActionArea>

      {/* Product Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "5px",
          width: "100%"
        }}
      >
        <Box>
          <Typography
            variant="body2"
            component="div"
            sx={{
              mb: 1,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product?.name || "بدون عنوان"}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          {/* Stock Status */}
          {renderStockStatus()}
          
          {/* Category Chips */}
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

        {/* Price and Cart Button */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection:"column"
          }}
        >
          <Typography variant="body2" sx={{ p: 1, color: "#FFA05C", fontWeight: "bold" }}>
            {getPrice()}
          </Typography>

          {isInCart ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5,
              background: "linear-gradient(45deg, #FFA05C, #FF7B54)",
              borderRadius: '20px',
              padding: '2px 6px',
              color: '#fff',
              zIndex:10,
              padding:"5px 10px",
              alignSelf:"flex-end",
              m:1
            }}>
                <IconButton
                aria-label="حذف محصول"
                onClick={() => handleRemoveItem(itemProduct?._id)}
                disabled={cartLoading}
                size="small"
                sx={{ 
                  color: '#fff',
                  padding: '4px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  }
                }}
              >
                {RemovwcartLoading === "loading" ? <CircularProgress size={24} color="#fff" /> : <Delete fontSize="small" />}
              </IconButton>
              <IconButton
                aria-label="کاهش تعداد"
                onClick={handleRemoveFromCart}
                disabled={cartLoading}
                size="small"
                sx={{ 
                  color: '#fff',
                  padding: '4px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  }
                }}
              >
                  <RemoveIcon fontSize="small" />
              </IconButton>
              
              <Typography variant="body2" sx={{ 
                minWidth: '20px', 
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
               {cartLoading ? <CircularProgress size={20} color="#fff" /> : cartQuantity}
              </Typography>
              
              <IconButton
                aria-label="افزایش تعداد"
                onClick={handleAddToCart}
                disabled={cartLoading}
                size="small"
                sx={{ 
                  color: '#fff',
                  padding: '4px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  }
                }}
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
                sx={{ 
                  p: 1, 
                  color: "#fff", 
                  background: "linear-gradient(45deg, #FFA05C, #FF7B54)",
                  alignSelf:"flex-end",
                  '&:hover': {
                    background: "linear-gradient(45deg, #FF7B54, #FFA05C)"
                  },
                  '&:disabled': {
                    background: "#e0e0e0",
                    color: "#9e9e9e"
                  }
                }}
              >
                {cartLoading ? (
                  <CircularProgress size={24} color="#fff" />
                ) : (
                  <ShoppingCartIcon fontSize="medium" sx={{padding:"2px"}} />
                )}
              </IconButton>
            </Tooltip>
          )}
          {totalPrice ? formatPrice(totalPrice) : null}
        </Box>
      </CardContent>
    </CardActionArea>
  );
};

export default React.memo(ProductCard);