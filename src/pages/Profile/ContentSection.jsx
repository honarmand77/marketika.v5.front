import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { ListAlt, ShoppingBasket, StarBorder, History, Delete, ImageNotSupported, ShoppingCart } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import Swipers from "../../components/Swiper/Swipers";
import ProductCard from '../../components/ProductCard/ProductCard';
import { removeFromCart, updateCartItemQuantity, getCart } from "../../api/cart";

const ContentSection = ({
  activeTab,
  handleTabChange,
  renderEmptyState,
  isMobile,
}) => {
  const [loading, setLoading] = useState(false);
  
  // Get data from Redux stores
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box item xs={12} md={8}>
      <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Swipers>
          <Box className="AuthStep" sx={{ width: "max-content" ,  bgcolor: "#fcfcfc"}}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: "divider", width: "max-content" }}
            >
              <Tab icon={<ListAlt fontSize="small" />} sx={{ display: "flex", gap: "5px" }} iconPosition="start" label="سفارشات" value="orders" />
              <Tab icon={<StarBorder fontSize="small" />} sx={{ display: "flex", gap: "5px" }} iconPosition="start" label="پسندیده‌ها" value="wishlist" />
              <Tab icon={<History fontSize="small" />} sx={{ display: "flex", gap: "5px" }} iconPosition="start" label="تاریخچه" value="history" />
            </Tabs>
          </Box>
        </Swipers>

        <Box sx={{ padding: "10px 0" }}>
          {activeTab === "orders" && (
            user?.orders?.length > 0 ? (
              <List disablePadding>
                {user.orders.map((order) => (
                  <ListItem key={order._id} divider>
                    <ListItemText
                      primary={`سفارش #${order._id.slice(-6)}`}
                      secondary={`تاریخ: ${new Date(order.createdAt).toLocaleDateString("fa-IR")}`}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "تحویل شده" ? "success" :
                          order.status === "در حال پردازش" ? "warning" : "default"
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2">
                        {order.totalAmount.toLocaleString()} تومان
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            ) : renderEmptyState(<ListAlt sx={{ color: "action.disabled" }} />, "هیچ سفارشی ثبت نشده است")
          )}

          {activeTab === "wishlist" && (
            user?.wishlist?.length > 0 ? (
              <Grid container spacing={1}>
                {user?.wishlist.map((itemId) => {
                  const product = products.find(p => p._id === itemId);
                  return product && (
                    <ProductCard product={product}/>
                  );
                })}
              </Grid>
            ) : renderEmptyState(<StarBorder sx={{ color: "action.disabled" }} />, "هیچ محصولی پسندیده نشده است")
          )}

          {activeTab === "history" && (
            user?.history?.length > 0 ? (
              <List disablePadding>
                {user.history.map((item) => (
                  <ListItem key={item._id} divider>
                    <ListItemText
                      primary={item.productName}
                      secondary={`تاریخ: ${new Date(item.date).toLocaleDateString("fa-IR")}`}
                    />
                    <Typography variant="body2" color="text.secondary">
                      مشاهده محصول
                    </Typography>
                  </ListItem>
                ))}
              </List>
            ) : renderEmptyState(<History sx={{ color: "action.disabled" }} />, "هیچ تاریخچه‌ای وجود ندارد")
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ContentSection;