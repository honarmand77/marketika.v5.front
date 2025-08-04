import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  login, 
  sendOtp,
  registerUser,
  loadUserFromStorage,
  resetAuthError
} from "../../redux/reducers/authSlice";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Fade
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { AuthContainer, StepContainer } from "./Auth.style";

export default function MultiStepAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(role === "admin" ? "/dashboard" : "/profile");
    }
  }, [isAuthenticated, role, navigate, loading]);

  return (
    <AuthContainer maxWidth="sm" sx={{ mt: 8 }}>
      <StepContainer className="AuthStep">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {isSignup ? "ثبت‌نام" : "ورود به حساب کاربری"}
          </Typography>
        </motion.div>
        {isSignup ? (
          <MultiStepSignin setIsSignup={setIsSignup} />
        ) : (
          <MultiStepLogin setIsSignup={setIsSignup} />
        )}
      </StepContainer>
    </AuthContainer>
  );
}

function MultiStepLogin({ setIsSignup }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const dispatch = useDispatch();
  
  const { loading, error, otpSent } = useSelector((state) => state.auth);

const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index <= 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index >= 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };
  
  const handleNext = async () => {
    dispatch(resetAuthError());
    
    if (!email.includes("@")) {
      dispatch(resetAuthError({ error: "لطفا یک ایمیل معتبر وارد کنید" }));
      return;
    }
    
    if (password.length < 8) {
      dispatch(resetAuthError({ error: "رمز عبور باید حداقل 8 کاراکتر باشد" }));
      return;
    }
    
    await dispatch(sendOtp(email));
  };

  const handleLogin = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      dispatch(resetAuthError({ error: "لطفا کد تأیید 6 رقمی را کامل وارد کنید" }));
      return;
    }
    
    await dispatch(login({ email, password, otp: otpCode }));
  };

  useEffect(() => {
    if (otpSent && step === 1) {
      setStep(2);
    }
  }, [otpSent, step]);

  return (
    <Box sx={{ mt: 4 }}>
      <Stepper style={{ direction: "ltr" }} activeStep={step - 1} alternativeLabel>
        <Step >
          <StepLabel >اطلاعات ورود</StepLabel>
        </Step>
        <Step>
          <StepLabel>کد تأیید</StepLabel>
        </Step>
      </Stepper>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            label="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            error={error && error.includes("ایمیل")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="رمز عبور"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            error={error && error.includes("رمز عبور")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            کد تأیید ارسال شده به {email} را وارد کنید
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection:"row-reverse", gap: 2, mt: 4 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                type="tel"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
                sx={{
                  width: "50px",
                  "& input": {
                    textAlign: "center",
                    padding: "10px",
                  },
                }}
              />
            ))}
          </Box>
        </motion.div>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        {step > 1 ? (
          <Button
            variant="outlined"
            onClick={() => setStep(-1)}
            disabled={loading}
            endIcon={<ArrowBack />}
          >
            قبلی
          </Button>
        ) : (
          <div />
        )}
        
        <Button
          variant="contained"
          onClick={step === 1 ? handleNext : handleLogin}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{color:"#fff",background:' #52575D',boxShadow:"none"}}
        >
          {loading 
            ? step === 1 
              ? "در حال ارسال کد..." 
              : "در حال ورود..."
            : step === 1 
              ? "دریافت کد تأیید" 
              : "ورود"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        حساب کاربری ندارید؟{" "}
        <Button 
          onClick={() => setIsSignup(true)} 
          disabled={loading}
          sx={{ minWidth: 0 }}
          
        >
          ثبت نام
        </Button>
      </Typography>
    </Box>
  );
}

function MultiStepSignin({ setIsSignup }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    agreeToTerms: false
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.email.includes("@")) {
        dispatch(resetAuthError({ error: "لطفا یک ایمیل معتبر وارد کنید" }));
        return false;
      }
      if (!formData.agreeToTerms) {
        dispatch(resetAuthError({ error: "لطفا شرایط و قوانین را بپذیرید" }));
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (formData.username.length < 3) {
        dispatch(resetAuthError({ error: "نام کاربری باید حداقل 3 کاراکتر باشد" }));
        return false;
      }
      if (!formData.phone || formData.phone.length < 10) {
        dispatch(resetAuthError({ error: "لطفا شماره تلفن معتبر وارد کنید" }));
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    dispatch(resetAuthError());
    if (!validateStep(step)) return;
    setStep(step + 1);
  };

  const handleRegister = async () => {
    if (formData.password.length < 8) {
      dispatch(resetAuthError({ error: "رمز عبور باید حداقل 8 کاراکتر باشد" }));
      return;
    }
    
    try {
      const result = await dispatch(registerUser({ 
        email: formData.email, 
        username: formData.username, 
        phone: formData.phone, 
        password: formData.password, 
        role: "user" 
      }));
      
      if (registerUser.fulfilled.match(result)) {
        setIsSignup(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Stepper style={{ direction: "ltr" }} activeStep={step - 1} alternativeLabel>
        <Step>
          <StepLabel>اطلاعات اولیه</StepLabel>
        </Step>
        <Step>
          <StepLabel>اطلاعات تکمیلی</StepLabel>
        </Step>
        <Step>
          <StepLabel>تکمیل ثبت‌نام</StepLabel>
        </Step>
      </Stepper>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            name="email"
            label="ایمیل"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={error && error.includes("ایمیل")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                color="primary"
              />
            }
            label="من قوانین و شرایط را می‌پذیرم"
          />
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            name="username"
            label="نام کاربری"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            error={error && error.includes("نام کاربری")}
          />
          <TextField
            fullWidth
            name="phone"
            label="شماره تلفن"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            error={error && error.includes("تلفن")}
            type="tel"
          />
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            fullWidth
            name="password"
            label="رمز عبور"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={error && error.includes("رمز عبور")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
      )}

      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mt: 4,
        flexDirection: { xs: "column", sm: "row" },
        gap: 2
      }}>
        {step > 1 && (
          <Button
            variant="outlined"
            onClick={() => setStep(step - 1)}
            disabled={loading}
            startIcon={<ArrowBack />}
            fullWidth={window.innerWidth < 600}
          >
            قبلی
          </Button>
        )}
        
        <Button
          variant="contained"
          onClick={step < 3 ? handleNext : handleRegister}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} /> : null}
          fullWidth={window.innerWidth < 600}
          sx={{color:"#fff",background:' #52575D',boxShadow:"none"}}

        >
          {loading 
            ? step === 3 
              ? "در حال ثبت‌نام..." 
              : "در حال بررسی..."
            : step === 3 
              ? "ثبت‌نام" 
              : "بعدی"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        حساب کاربری دارید؟{" "}
        <Button 
          onClick={() => setIsSignup(false)} 
          disabled={loading}
          sx={{ minWidth: 0 }}
        >
          ورود
        </Button>
      </Typography>
    </Box>
  );
}