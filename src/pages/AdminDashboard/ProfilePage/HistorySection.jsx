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
import { getAllOrders } from '../../../api/orders'; // import the new function
import Loader from '../../../components/Loader/Loader';

const HistorySection = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const historyData = await getAllOrders(); // استفاده از تابع جدید
        setOrderHistory(historyData);
      } catch (error) {
        console.error("خطا در دریافت تاریخچه سفارشات:", error);
        setError("خطا در دریافت تاریخچه سفارشات.");
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
            📜 تاریخچه سفارشات (ادمین)
          </Typography>
        }
      />
      <CardContent>
        <List>
          {orderHistory.map((order, index) => (
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
                        وضعیت: {order.status === 'completed' ? 'ارسال شده' : 'مرجوع شده'}
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

export default HistorySection;