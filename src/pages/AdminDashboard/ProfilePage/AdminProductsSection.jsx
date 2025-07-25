import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { fetchProductsByAdmin } from '../../../api/products';
import Loader from '../../../components/Loader/Loader';

const AdminProductsSection = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductsByAdmin(userId);
        setProducts(data);
      } catch (error) {
        console.error("خطا در دریافت محصولات ادمین:", error);
        setError("خطا در دریافت محصولات ادمین.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [userId]);

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
            🛒 محصولات ادمین
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  backgroundColor: '#ffe5cc',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <EmojiEventsIcon sx={{ color: '#ffa05c', fontSize: '40px' }} />
                <Box sx={{ marginTop: '8px' }}>
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    نام محصول: {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    قیمت: {product.price}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    موجودی: {product.stock}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    دسته‌بندی: {product.category.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffa05c' }}>
                    زیردسته‌بندی: {product.subCategory.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdminProductsSection;