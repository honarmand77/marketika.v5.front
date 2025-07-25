import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ShoppingCart, ListAlt, StarBorder, History } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  // Get user data from authSlice and wishlist from cartSlice
  const { user } = useSelector((state) => state.auth);

  
  return (
    <Grid className="AuthStep" item xs={12} md={4} sx={{ bgcolor: "#fcfcfc"}}>
      <Card sx={{ position: "sticky", top: 80, bgcolor: "transparent", boxShadow: "none" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: "20px" }}>
            <Avatar
              component="div"
              variant="img"
              src={user?.profilePicture}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: "3px solid",
                borderColor: "#FFA05C",
              }}
            />
            <Box>
              <Typography variant="body2" component="div">
                {user?.username}
              </Typography>
              <Typography variant="p" component="div">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Box container spacing={2} sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {[
              { icon: <ListAlt />, value: user?.orders?.length || 0, label: "سفارشات" },
              { icon: <StarBorder />, value: user?.wishlist?.length || 0, label: "پسندیده‌ها" },
              { icon: <History />, value: user?.history?.length || 0, label: "تاریخچه" },
            ].map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap:"5px" }}>
                    {React.cloneElement(stat.icon, { fontSize: "small", sx: { mr: 1 } })}
                    <Typography variant="p">{stat.label}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileSection;