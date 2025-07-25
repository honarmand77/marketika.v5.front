import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { fetchPendingOrdersForAdmin } from '../../../api/orders'; // import the new function
import Loader from '../../../components/Loader/Loader';

const OrdersSection = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const pendingData = await fetchPendingOrdersForAdmin(); // استفاده از تابع جدید
        setPendingOrders(pendingData);
      } catch (error) {
        console.error("خطا در دریافت سفارشات در حال انتظار:", error);
        setError("خطا در دریافت سفارشات در حال انتظار.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
<Loader/>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Card sx={{ background:"transparent", borderRadius: '8px' }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#ffa05c', fontWeight: 'bold' }}>
            📜 سفارشات در حال انتظار (ادمین)
          </Typography>
        }
      />
      <CardContent>
        <List>
          {pendingOrders.map((order, index) => (
            <Paper
              key={index}
              sx={{
                backgroundColor: '#ffe5cc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <ListItem>
                <ListItemIcon>
                  <EmojiEventsIcon sx={{ color: '#ffa05c' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                      کاربر: {order.user.username}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: '#ffa05c' }}>
                        وضعیت: در حال انتظار
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ffa05c' }}>
                        تاریخ: {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <List>
                {order.products.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ color: '#ffa05c' }}>
                          {item.product.name} - تعداد: {item.quantity}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;