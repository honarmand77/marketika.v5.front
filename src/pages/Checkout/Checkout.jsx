import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  CardActionArea,
CardMedia,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { createOrder, getOrderInvoice } from '../../api/orders';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUserCart,
  selectCartItems,
  selectCartTotalPrice,
} from '../../redux/reducers/cartSlice';
import { Api_Url } from '../../api';
import { HomeContainer } from '../Home/Home.style';



const steps = ['اطلاعات ارسال', 'روش پرداخت', 'مرور سفارش'];

// تابع کمکی برای نمایش اعداد به صورت فارسی
const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('fa-IR').format(price);
};
const CheckoutPage = ({ onOrderCreated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotalPrice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'ایران',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // محاسبه قیمت‌ها با مقادیر پیش‌فرض ایمن
  const shipping = 25000;
  const tax = Math.round((cartTotal || 0) * 0.09);
  const total = (cartTotal || 0) + shipping + tax;

  // هدایت به صفحه فروشگاه اگر سبد خرید خالی باشد
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/shop', { state: { from: 'empty-cart' } });
    }
  }, [cartItems, navigate]);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await submitOrder();
    } else {
      if (activeStep === 0 && !validateAddress()) {
        setError('لطفاً اطلاعات آدرس را به طور کامل وارد کنید');
        setSnackbarOpen(true);
        return;
      }
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError(null);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const validateAddress = () => {
    const requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'country', 'phone'];
    return requiredFields.every(field => address[field]?.trim());
  };

  const submitOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateAddress()) {
        throw new Error('اطلاعات آدرس ناقص است');
      }

      const orderData = {
        items: cartItems.map(item => ({
          product: item?.product?.id || '',
          name: item?.product?.name || 'محصول بدون نام',
          quantity: item?.quantity || 0,
          price: item?.product?.price || 0,
          image: item?.price?.images[0] || ''
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: cartTotal || 0,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total
      };

      const createdOrder = await createOrder(orderData);
      
      if (!createdOrder?._id) {
        throw new Error('پاسخ سرور نامعتبر است');
      }

      // پاک کردن سبد خرید پس از ثبت موفقیت‌آمیز سفارش
      dispatch(clearUserCart());
      
      setOrderId(createdOrder._id);
      setActiveStep(prev => prev + 1);
      
      if (onOrderCreated) {
        onOrderCreated(createdOrder);
      }
    } catch (error) {
      console.error('خطا در ثبت سفارش:', error);
      setError(error.message || 'خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async () => {
    try {
      if (!orderId) return;
      
      const invoiceBlob = await getOrderInvoice(orderId);
      const url = window.URL.createObjectURL(new Blob([invoiceBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('خطا در دریافت فاکتور:', error);
      setError('خطا در دریافت فاکتور');
      setSnackbarOpen(true);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (


          <Box component="form" noValidate sx={{ mt: 3}}>
            <Grid container spacing={2} sx={{width:isMobile ? "100%" : "500px"}}>
              {[
                { name: 'firstName', label: 'نام', required: true, xs: 12, sm: 6 },
                { name: 'lastName', label: 'نام خانوادگی', required: true, xs: 12, sm: 6 },
                { name: 'address1', label: 'آدرس', required: true, xs: 12 },
                { name: 'address2', label: 'آدرس تکمیلی (اختیاری)', required: false, xs: 12 },
                { name: 'city', label: 'شهر', required: true, xs: 12, sm: 6 },
                { name: 'state', label: 'استان', required: true, xs: 12, sm: 6 },
                { name: 'zip', label: 'کد پستی', required: true, xs: 12, sm: 6 },
                { name: 'country', label: 'کشور', required: true, xs: 12, sm: 6 },
                { name: 'phone', label: 'تلفن همراه', required: true, xs: 12, inputProps: { pattern: "[0-9]{11}" } }
              ].map((field) => (
                <Grid item xs={field.xs} sm={field.sm} key={field.name}>
                  <TextField
                    required={field.required}
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={address[field.name]}
                    onChange={handleAddressChange}
                    error={field.required && !address[field.name]?.trim()}
                    inputProps={field.inputProps}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" defaultChecked />}
                  label="آدرس صورتحساب همانند آدرس ارسال است"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              روش پرداخت
            </Typography>
            <Grid container spacing={2}>
              {[
                { method: 'credit-card', label: 'پرداخت با کارت اعتباری' },
                { method: 'paypal', label: 'پرداخت با پی‌پال' },
                { method: 'bank-transfer', label: 'پرداخت آنلاین بانکی' }
              ].map(({ method, label }) => (
                <Grid item xs={12} key={method}>
                  <Button
                    fullWidth
                    variant={paymentMethod === method ? 'contained' : 'outlined'}
                    onClick={() => handlePaymentChange(method)}
                    sx={{ py: 2, mb: method !== 'bank-transfer' ? 2 : 0 }}
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{width:isMobile ? "100%" : "700px"}}>
            <Typography variant="h6" gutterBottom>
              خلاصه سفارش
            </Typography>
            <List disablePadding >
              {cartItems?.map((item) => {
                const price = item?.product?.price || 0;
                const quantity = item?.quantity || 0;
                const itemTotal = price * quantity;
                
                return (
                  <ListItem  key={item?.product?.id || Math.random()} sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        
                        <CardActionArea className="img" sx={{objectFit:"contain", padding:"5px", height:isMobile ? "100px" : "150px", width:isMobile ? "100px" : "150px"}} >
                          <CardMedia
                            component="img"
                            src={`${Api_Url}/${item?.product?.images?.[0]}`}
                            alt={item?.product?.name}
                            sx={{objectFit:"contain", padding:"5px", height:isMobile ? "100px" : "150px", width:isMobile ? "100px" : "150px"}}
                            placeholder="blur"
                          />
                        </CardActionArea>
                    <ListItemText
                    sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}
                      primary={item?.product?.name || 'محصول بدون نام'}
                      secondary={`${quantity} × ${formatPrice(price)} تومان`}
                    />
                    <Typography variant="body2">
                      {formatPrice(itemTotal)} تومان
                    </Typography>
                  </ListItem>
                );
              })}
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="جمع کل" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatPrice(cartTotal)} تومان
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="هزینه ارسال" />
                <Typography variant="body1">{formatPrice(shipping)} تومان</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="مالیات" />
                <Typography variant="body1">{formatPrice(tax)} تومان</Typography>
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="مبلغ قابل پرداخت" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatPrice(total)} تومان
                </Typography>
              </ListItem>
            </List>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              آدرس ارسال
            </Typography>
            <Typography gutterBottom>
              {address.firstName} {address.lastName}
            </Typography>
            <Typography gutterBottom>
              {address.address1}, {address.address2 && `${address.address2}, `}
              {address.city}, {address.state} {address.zip}, {address.country}
            </Typography>
            <Typography gutterBottom>
              تلفن: {address.phone}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ my: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          در حال انتقال به صفحه فروشگاه...
        </Typography>
      </Container>
    );
  }

  return (
    <HomeContainer className="scroller" sx={{ mb: 4 }}>
      <Box variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3,height:"100%" } }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          تسویه حساب
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5,flexDirection:"row-reverse" }}>
          {steps.map((label) => (
            <Step key={label} >
              <StepLabel sx={{gap:"10px"}}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h5" gutterBottom>
              سفارش شما با موفقیت ثبت شد.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              شماره سفارش شما: #{orderId}
            </Typography>
            <Typography variant="body1" paragraph>
              ایمیل تایید به آدرس ایمیل شما ارسال خواهد شد.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="contained"
                onClick={downloadInvoice}
                startIcon={<i className="fas fa-file-download" />}
              >
                دریافت فاکتور
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/orders')}
                startIcon={<i className="fas fa-list" />}
              >
                مشاهده سفارشات
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/shop')}
                startIcon={<i className="fas fa-shopping-bag" />}
              >
                ادامه خرید
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  بازگشت
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isLoading}
                endIcon={isLoading && <CircularProgress size={24} />}
              >
                {activeStep === steps.length - 1 ? 'تایید و پرداخت' : 'ادامه'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </HomeContainer>
  );
};

export default CheckoutPage;