import React from "react";
import { Grid, Card, CardContent, Typography, Box, IconButton, useTheme } from "@mui/material";
import { Search, DollarSign, Plane, Clock4 } from 'lucide-react';
import { ReactComponent as Searchsvg } from '../../assets/svg/undraw_search_re_x5gq.svg';
import { ReactComponent as Backupsvg } from '../../assets/svg/undraw_work_time_re_hdyv.svg';
import { ReactComponent as Securesvg } from '../../assets/svg/undraw_secure_files_re_6vdh.svg';
import { ReactComponent as Sendsvg } from '../../assets/svg/undraw_send_gift_re_t5ni.svg';
import { keyframes } from "@emotion/react";

// انیمیشن‌های سه بعدی
const float3D = keyframes`
  0%, 100% {
    transform: translateY(0) rotateX(0) rotateY(0);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
  }
`;

const cardHover = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0) rotateY(0) translateZ(0);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  100% {
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(20px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }
`;

const OrderingProcess = () => {
  const theme = useTheme();

  const steps = [
    {
      icon: <Search size={24} />,
      title: "گارانتی بازگشت وجه",
      svg: <Searchsvg />,
      bgColor: "linear-gradient(135deg, #f5f7fa50 0%, #c3cfe250 100%)",
    },
    {
      icon: <Clock4 size={24} />,
      title: "پشتیبانی 24 ساعته",
      svg: <Backupsvg />,
      bgColor: "linear-gradient(135deg, #e0f7fa50 0%, #b2ebf250 100%)",
    },
    {
      icon: <DollarSign size={24} />,
      title: "پرداخت امن و مطمئن",
      svg: <Securesvg />,
      bgColor: "linear-gradient(135deg, #e8f5e950 0%, #c8e6c950 100%)",
    },
    {
      icon: <Plane size={24} />,
      title: "تحویل اکسپرس",
      svg: <Sendsvg />,
      bgColor: "linear-gradient(135deg, #fff3e050 0%, #ffe0b250 100%)",
    },
  ];

  return (
    <Box sx={{ 
      width: "100%",
      px: { xs: 2, md: 0 },
      py: 6,
      position: "relative",
      perspective: "1000px",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        zIndex: -1
      }
    }}>
      <Grid 
        container 
        spacing={4} 
        sx={{
          margin: "0 auto",
          p:2,
          justifyContent: "center",
          position: "relative",
          height:"100%"
        }}
      >
        {steps.map((step, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              transformStyle: "preserve-3d"
            }}
          >
            <Card
              sx={{
                height: "100%",
                width: "100%",
                minHeight: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: "16px",
                background: step.bgColor,
                transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
                boxShadow:0,
                position: "relative",
                overflow: "hidden",
                transform: "perspective(1000px)",
                animation: `${float3D} 6s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
                "&:hover": {
                  animation: "none",
                  "& .card-content": {
                    transform: "translateZ(30px)"
                  },
                  "& .card-icon": {
                    transform: "translateZ(50px) scale(1.1)"
                  },
                  "& .card-svg": {
                    transform: "translateZ(20px) scale(1.05)"
                  }
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(5px)",
                  zIndex: 1
                }
              }}
            >
              <Box
                className="card-icon"
                sx={{
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  mb: 3,
                  position: "relative",
                  zIndex: 2,
                  transition: "all 0.5s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `2px dashed ${theme.palette.primary.main}`,
                    animation: `${float3D} 4s linear infinite reverse`,
                    opacity: 0.3
                  }
                }}
              >
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    width: "100%",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1) rotate(10deg)"
                    }
                  }}
                >
                  {step.icon}
                </IconButton>
              </Box>
              
              <CardContent 
                className="card-content"
                sx={{
                  textAlign: "center",
                  px: 0,
                  zIndex: 2,
                  transition: "all 0.5s ease",
                  "&:last-child": {
                    pb: 0
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    position: "relative",
                    color: theme.palette.text.primary,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {step.title}
                </Typography>
                
                <Box 
                  className="card-svg"
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                    height: 140,
                    transition: "all 0.5s ease",
                    zIndex: 2,
                    "& svg": {
                      height: "100%",
                      width: "auto",
                      filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1))"
                    }
                  }}
                >
                  {step.svg}
                </Box>
              </CardContent>

              {/* افکت نور پس‌زمینه */}
              <Box sx={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                opacity: 0.3,
                transform: "rotate(45deg)",
                transition: "all 0.5s ease",
                zIndex: 1
              }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(OrderingProcess);