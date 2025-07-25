import React, { useState, useEffect } from 'react';
import { 
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';
import { SearchContainer } from './Search.style';
import { Product_Container } from '../../components/ProductSections/ProductSections.style';

export default function Search (){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // دریافت محصولات از Redux store
  const { products: allProducts, loading, error } = useSelector(state => state.products);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // دریافت محصولات هنگام mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // جستجو در محصولات
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    setSearchQuery(query);

    if (allProducts.length > 0) {
      performSearch(query);
    }
  }, [location.search, allProducts]);

  const performSearch = (query) => {
    try {
      const normalizedQuery = query.toLowerCase().trim();
      
      if (!normalizedQuery) {
        setSearchResults(allProducts);
        return;
      }
  
      const searchFields = ['name', 'description', 'category'];
      
      const results = allProducts.filter(product => {
        return searchFields.some(field => {
          const fieldValue = product[field];
          if (fieldValue == null) return false;
          return fieldValue.toString().toLowerCase().includes(normalizedQuery);
        });
      });
  
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <SearchContainer className="scroller">
      {/* عنوان و تعداد نتایج */}
      <Box sx={{ mb: 4 ,p:1,width:"100%"}}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
          {searchQuery ? `نتایج جستجو برای "${searchQuery}"` : 'همه محصولات'}
        </Typography>
        {!loading && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {searchResults.length} محصول یافت شد
          </Typography>
        )}
      </Box>

      {/* نتایج جستجو */}
      {loading ? (
        <Box sx={{ display:'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ py: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      ) : searchResults.length === 0 ? (
        <Typography sx={{ py: 4, textAlign: 'center' }}>
          {searchQuery 
            ? `هیچ نتیجه‌ای برای "${searchQuery}" یافت نشد`
            : 'هیچ محصولی موجود نیست'}
        </Typography>
      ) : (
        <Product_Container style={{width:"100vw"}}>
          {searchResults.map((product) => (
            <ProductCard 
              key={product._id}
              product={product}
            />
          ))}
        </Product_Container>
      )}
    </SearchContainer>
  );
};