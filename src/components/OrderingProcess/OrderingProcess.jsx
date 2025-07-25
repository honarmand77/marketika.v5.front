import React from "react";
import { Grid, Card, CardContent, Typography, Box, IconButton, useTheme } from "@mui/material";
import { Search, DollarSign, Plane, Clock4 } from 'lucide-react';
import { ReactComponent as Searchsvg } from '../../assets/svg/undraw_search_re_x5gq.svg';
import { ReactComponent as Backupsvg } from '../../assets/svg/undraw_work_time_re_hdyv.svg';
import { ReactComponent as Securesvg } from '../../assets/svg/undraw_secure_files_re_6vdh.svg';
import { ReactComponent as Sendsvg } from '../../assets/svg/undraw_send_gift_re_t5ni.svg';
import { keyframes } from "@emotion/react";

// انیمیشن‌ها
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const OrderingProcess = () => {
  const theme = useTheme();

  const steps = [
    {
      icon: <Search size={24} />,
      title: "گارانتی بازگشت وجه",
      svg: <Searchsvg />,
      bgColor: "#fff",
    },
    {
      icon: <Clock4 size={24} />,
      title: "پشتیبانی 24 ساعته",
      svg: <Backupsvg />,
      bgColor: "#fff",

    },
    {
      icon: <DollarSign size={24} />,
      title: "پرداخت امن و مطمئن",
      svg: <Securesvg />,
      bgColor: "#fff",

    },
    {
      icon: <Plane size={24} />,
      title: "تحویل اکسپرس",
      svg: <Sendsvg />,
      bgColor: "#fff",
    },
  ];

  return (
    <Box sx={{ 
      width: "100%",
      px: { xs: 2, md: 0 },
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(to bottom, #ffa05c05, transparent)",
        zIndex: -1
      }
    }}>
      <Grid 
        container 
        spacing={4} 
        sx={{
          margin: "0 auto",
          justifyContent: "center",
          padding:"20px 5vw",
          position: "relative"
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
              justifyContent: "center"
            }}
          >
            <Card
            className="Card"
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: 1,
                background: step.bgColor,
                transition: "all 0.3s ease",
                boxShadow: "0",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                  color:"#fff",
                  "&::after": {
                    transform: "scaleY(1)"
                  }
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: theme.palette.primary.main,
                  transform: "scaleY(0)",
                  transformOrigin: "top",
                  transition: "transform 0.3s ease"
                },
                animation: `${fadeIn} 0.5s ease ${index * 0.2}s`,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  mb: 3,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `2px dashed ${theme.palette.primary.main}`,
                    animation: `${pulse} 6s linear infinite`,
                    opacity: 0.3
                  }
                }}
              >
                <IconButton 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    background:"#ffffff70",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": {
                      animation: `${pulse} 0.6s ease`
                    }
                  }}
                >
                  {step.icon}
                </IconButton>
              </Box>
              
              <CardContent sx={{
                textAlign: "center",
                px: 0,
                "&:last-child": {
                  pb: 0
                }
              }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 40,
                      height: 2,
                      background: theme.palette.primary.main,
                      borderRadius: 2
                    }
                  }}
                >
                  {step.title}
                </Typography>
                
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                    height: 120,
                    "& svg": {
                      height: "100%",
                      width: "auto",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)"
                      }
                    }
                  }}
                >
                  {step.svg}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(OrderingProcess);
 