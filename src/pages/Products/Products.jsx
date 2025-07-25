import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Chip,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  Skeleton,
  useTheme,
  useMediaQuery,
  Stack,
  IconButton,
  Paper,
  Collapse,
  Divider,
  Fab,
  Button
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { CategoriesContainer } from '../../components/BannerSlider/BannerSlider';
import { categoryData } from '../../api/categories';
import { subcategoriesData } from '../../api/subcategories';
import ProductCard from '../../components/ProductCard/ProductCard';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Products_Container } from "./Products.style";
import { useSelector } from 'react-redux';
import { 
  selectAllSubcategories,
} from '../../redux/reducers/subcategoriesSlice';
import { 
  selectAllCategories,
} from '../../redux/reducers/categoriesSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Products() {
  const theme = useTheme();
  const [categories, setCategories] = useState([
    {subCategories:[1,2,3,4]},
    {subCategories:[1,2,3,4]},
    {subCategories:[1,2,3,4]},
    {subCategories:[1,2,3,4]},
    {subCategories:[1,2,3,4]},
  ]
  );
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [priceBuckets, setPriceBuckets] = useState([]);
  const [selectedPriceBuckets, setSelectedPriceBuckets] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const { products , loading} = useSelector(state => state.products);
  const categoriesData = useSelector(selectAllCategories);
  const subcategoriesData = useSelector(selectAllSubcategories);
  useEffect(() => {
    const loadData = async () => {
      try {
        setCategories(categoriesData);
        // ایجاد لیست کامل زیردسته‌ها با اطلاعات دسته‌بندی والد
        const enrichedSubCategories = subcategoriesData?.map(sub => {
          const parentCategory = categoriesData.find(cat => 
            cat.subCategories?.some(sc => sc._id === sub._id)
          );
          return {
            _id: sub._id,
            name: sub.name,
            categoryId: parentCategory?._id,
            categoryName: parentCategory?.name
          };
        });
        setSubCategories(enrichedSubCategories);

        // ایجاد دسته‌های قیمتی هوشمند
        const validPrices = products
          .map(p => p.price)
          .filter(price => price > 0)
          .sort((a, b) => a - b);

        // اگر محصولی وجود ندارد، دسته‌بندی پیش‌فرض ایجاد کن
        if (validPrices.length === 0) {
          const defaultBuckets = [
            { id: 'bucket-0', start: 0, end: 100000, count: 0, label: 'تا ۱۰۰ هزار تومان' },
            { id: 'bucket-1', start: 100000, end: 500000, count: 0, label: '۱۰۰ تا ۵۰۰ هزار تومان' },
            { id: 'bucket-2', start: 500000, end: 1000000, count: 0, label: '۵۰۰ هزار تا ۱ میلیون تومان' },
            { id: 'bucket-3', start: 1000000, end: 2000000, count: 0, label: '۱ تا ۲ میلیون تومان' },
            { id: 'bucket-4', start: 2000000, end: 5000000, count: 0, label: 'بیش از ۲ میلیون تومان' }
          ];
          setPriceBuckets(defaultBuckets);
          return;
        }

        const minPrice = Math.floor(validPrices[0]);
        const maxPrice = Math.ceil(validPrices[validPrices.length - 1]);
        
        // تعیین محدوده‌های قیمتی بر اساس توزیع واقعی محصولات
        const priceRanges = [
          { min: 0, max: 1000000 },
          { min: 1000000, max: 5000000 },
          { min: 5000000, max: 20000000 },
          { min: 20000000, max: 50000000 },
          { min: 50000000, max: Infinity }
        ];

        const buckets = priceRanges.map((range, index) => {
          const productsInRange = products.filter(p => 
            p.price && p.price >= range.min && p.price <= range.max
          );
          
          let label = '';
          if (range.max === Infinity) {
            label = `بیش از ${(range.min/1000000).toFixed(0)} میلیون تومان`;
          } else if (range.max >= 1000000) {
            label = `${(range.min/1000000).toFixed(0)} تا ${(range.max/1000000).toFixed(0)} میلیون تومان`;
          } else if (range.max >= 1000) {
            label = `${(range.min/1000).toFixed(0)} تا ${(range.max/1000).toFixed(0)} هزار تومان`;
          } else {
            label = `تا ${range.max.toLocaleString()} تومان`;
          }

          return {
            id: `bucket-${index}`,
            start: range.min,
            end: range.max === Infinity ? maxPrice : range.max,
            count: productsInRange.length,
            label: label
          };
        });

        setPriceBuckets(buckets);
      } catch (error) {
        console.error('Error loading data:', error);
      } 
    };
    loadData();
  }, [subcategoriesData]);

  // داده‌های چارت دایره‌ای با برچسب‌های خوانا
  const priceChartData = {
    labels: priceBuckets.map(bucket => bucket.label),
    datasets: [
      {
        data: priceBuckets.map(bucket => bucket.count),
        backgroundColor: [
          '#FF6384', // قرمز
          '#36A2EB', // آبی
          '#FFCE56', // زرد
          '#4BC0C0', // فیروزه‌ای
          '#9966FF', // بنفش
          '#FF9F40', // نارنجی
          '#8AC24A', // سبز
          '#F06292', // صورتی
          '#7986CB', // آبی خاکستری
          '#4DB6AC'  // سبز آبی
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC24A',
          '#F06292',
          '#7986CB',
          '#4DB6AC'
        ],
        borderWidth: 1,
      }
    ]
  };

  // بقیه توابع و کدها بدون تغییر مانند قبل...
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
    
    if (selectedCategories.includes(categoryId)) {
      const subCatsToRemove = subCategories
        .filter(sub => sub.categoryId === categoryId)
        .map(sub => sub._id);
      
      setSelectedSubCategories(prev => 
        prev.filter(id => !subCatsToRemove.includes(id))
      );
    }
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategoryId)
        ? prev.filter(id => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
    
    if (!selectedSubCategories.includes(subCategoryId)) {
      const subCategory = subCategories.find(sub => sub._id === subCategoryId);
      if (subCategory && !selectedCategories.includes(subCategory.categoryId)) {
        setSelectedCategories(prev => [...prev, subCategory.categoryId]);
      }
    }
  };

  const handlePriceBucketSelect = (bucketId) => {
    setSelectedPriceBuckets(prev => 
      prev.includes(bucketId)
        ? prev.filter(id => id !== bucketId)
        : [...prev, bucketId]
    );
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    if (!isMobile) {
      setFilterPanelOpen(true);
    }
  }, [isMobile]);

  const subCategoryCounts = subCategories.reduce((acc, sub) => {
    const count = products.filter(p => 
      p.subCategory?._id === sub._id
    ).length;
    return {...acc, [sub._id]: count};
  }, {});

  const filteredProducts = products
    .filter(product => {
      if (selectedCategories.length > 0 && 
          !selectedCategories.includes(product.category?._id)) {
        return false;
      }

      if (selectedSubCategories.length > 0 && 
          (!product.subCategory || !selectedSubCategories.includes(product.subCategory._id))) {
        return false;
      }

      if (selectedPriceBuckets.length > 0 && product.price) {
        const inSelectedBuckets = selectedPriceBuckets.some(bucketId => {
          const bucket = priceBuckets.find(b => b.id === bucketId);
          return product.price >= bucket.start && product.price <= bucket.end;
        });
        if (!inSelectedBuckets) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') return (b.likes?.length || 0) - (a.likes?.length || 0);
      if (sortBy === 'views') return (b.viewers?.length || 0) - (a.viewers?.length || 0);
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'newest') return (new Date(b.createdAt || 0)) - (new Date(a.createdAt || 0));

      return 0;
    });


  return (
    <Products_Container className="scroller">
      <CategoriesContainer className="horcat" />
      
      {/* نمایش فیلترهای فعال */}
      <Box  sx={{ display: 'flex', gap: 2, padding: "5px 10px", flexWrap: 'wrap' }}>
        {selectedCategories.map(catId => {
          const category = categories.find(c => c._id === catId);
          return (
            <Chip
              key={catId}
              label={category?.name}
              onDelete={() => handleCategoryChange(catId)}
              sx={{ background: 'linear-gradient(45deg, #FFA05C, #FF7B54)', color: 'white', p: 1 }}
            />
          );
        })}
        {selectedSubCategories.map(subId => {
          const subCategory = subCategories.find(s => s._id === subId);
          return (
            <Chip
              key={subId}
              label={`${subCategory?.categoryName} - ${subCategory?.name}`}
              onDelete={() => handleSubCategoryChange(subId)}
              sx={{ background: 'linear-gradient(45deg, #FFA05C, #FF7B54)', color: 'white', p: 1 }}
            />
          );
        })}
        {selectedPriceBuckets.map(bucketId => {
          const bucket = priceBuckets.find(b => b.id === bucketId);
          return (
            <Chip
              key={bucketId}
              label={bucket?.label}
              onDelete={() => handlePriceBucketSelect(bucketId)}
              sx={{ background: 'linear-gradient(45deg, #FFA05C, #FF7B54)', color: 'white', p: 1 }}
            />
          );
        })}
      </Box>

      {/* دکمه فیلتر برای موبایل */}
      {!filterPanelOpen && (
        <Fab
          aria-label="filter"
          sx={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '30px',
            right: '20px',
            zIndex: 1005,
            background:"linear-gradient(45deg, #FFA05C, #FF7B54)",
            boxShadow:0,
            padding:"2px 10px",
            borderRadius:"5px",
            height:"35px",
            width:"max-content",
            display:"flex",
            alignItems:"center",
            gap:"5px"

          }}
          onClick={() => setFilterPanelOpen(true)}
        >
          <TuneIcon fontSize='small' sx={{color:"#fff"}}/>
          <Typography variant='p' sx={{color:"#fff"}}>فیلترها</Typography>
        </Fab>
      )}

      {/* پنل فیلتر */}
      <Paper
      className="filter"
        sx={{
          position: 'fixed',
          zIndex: 1005,
          width: isMobile ? '100vw' : '300px',
          height: isMobile ? '70vh' : '100vh',
          right: !isMobile ? (filterPanelOpen ? 0 : -300) : 0,
          bottom: isMobile ? (filterPanelOpen ? 0 : -1000) : 0,
          transition: 'all 0.3s ease',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ 
          p: 1, 
          background:"linear-gradient(45deg, #FFA05C, #FF7B54)",
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6">فیلترها</Typography>
          <IconButton color="inherit" onClick={() => setFilterPanelOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* بخش دسته‌بندی‌ها */}
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('categories')}
          >
            <Typography variant="subtitle1">دسته‌بندی‌ها</Typography>
            <Typography>{expandedSection === 'categories' ? '−' : '+'}</Typography>
          </Box>
          <Collapse in={expandedSection === 'categories' || !isMobile}>
            <FormGroup sx={{ mt: 1 }}>
              {categories.map(category => {
                const productCount = products.filter(p => p.category?._id === category._id).length;
                return (
                  <FormControlLabel
                    key={category._id}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                    }
                    label={`${category.name} (${productCount})`}
                  />
                );
              })}
            </FormGroup>
          </Collapse>
        </Box>


        {/* بخش زیردسته‌ها */}
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('subcategories')}
          >
            <Typography variant="subtitle1">زیردسته‌ها</Typography>
            <Typography>{expandedSection === 'subcategories' ? '−' : '+'}</Typography>
          </Box>
          <Collapse in={expandedSection === 'subcategories' || !isMobile}>
            <FormGroup sx={{ mt: 1 }}>
              {subCategories
                .filter(sub => 
                  selectedCategories.length === 0 || 
                  selectedCategories.includes(sub.categoryId)
                )
                .map(sub => (
                  <FormControlLabel
                    key={sub._id}
                    control={
                      <Checkbox
                        checked={selectedSubCategories.includes(sub._id)}
                        onChange={() => handleSubCategoryChange(sub._id)}
                        disabled={subCategoryCounts[sub._id] === 0}
                      />
                    }
                    label={sub.name || "بدون زیر دسته "}
                    sx={{
                      opacity: subCategoryCounts[sub._id] === 0 ? 0.5 : 1,
                      ml: 2
                    }}
                  />
                ))}
            </FormGroup>
          </Collapse>
        </Box>
        <Divider />

        {/* بخش قیمت با چارت دایره‌ای بهبود یافته */}
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('price')}
          >
            <Typography variant="subtitle1">توزیع قیمت‌ها</Typography>
            <Typography>{expandedSection === 'price' ? '−' : '+'}</Typography>
          </Box>
          <Collapse in={expandedSection === 'price' || !isMobile}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {selectedPriceBuckets.length > 0
                  ? `${selectedPriceBuckets.length} محدوده انتخاب شده`
                  : 'برای انتخاب محدوده قیمت روی بخش‌های نمودار کلیک کنید'}
              </Typography>
              
              <Box sx={{ height: '300px', position: 'relative', mb: 2 }}>
                <Pie 
                  data={priceChartData} 
                  options={{
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const bucketIndex = elements[0].index;
                        const bucketId = priceBuckets[bucketIndex].id;
                        handlePriceBucketSelect(bucketId);
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = Math.round((value / products.length) * 100);
                            return `${label}: ${value} محصول (${percentage}%)`;
                          }
                        }
                      },
                      legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                          usePointStyle: true,
                          boxWidth: 10,
                          padding: 20,
                          font: {
                            family: 'IRANSans',
                            size: isMobile ? 10 : 12
                          }
                        }
                      }
                    },
                    maintainAspectRatio: false
                  }}
                />
              </Box>

              {selectedPriceBuckets.length > 0 && (
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="error"
                  onClick={() => setSelectedPriceBuckets([])}
                  sx={{ mt: 2 }}
                >
                  حذف انتخاب‌ها
                </Button>
              )}
            </Box>
          </Collapse>
        </Box>
        <Divider />

        {/* بخش مرتب‌سازی */}
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('sort')}
          >
            <Typography variant="subtitle1">مرتب‌سازی</Typography>
            <Typography>{expandedSection === 'sort' ? '−' : '+'}</Typography>
          </Box>
          <Collapse in={expandedSection === 'sort' || !isMobile}>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <FormControlLabel value="likes" control={<Radio />} label="محبوب‌ترین" />
                <FormControlLabel value="views" control={<Radio />} label="پربازدیدترین" />
                <FormControlLabel value="price-low" control={<Radio />} label="ارزان‌ترین" />
                <FormControlLabel value="price-high" control={<Radio />} label="گران‌ترین" />
                <FormControlLabel value="newest" control={<Radio />} label="جدیدترین" />
              </RadioGroup>
            </FormControl>
          </Collapse>
        </Box>
      </Paper>

      {/* لیست محصولات */}
      <Box sx={{ 
        width:"100vw",
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 1,
        p: 2,
        pr: !isMobile && filterPanelOpen ? '320px' : 2,
        transition: 'padding 0.3s ease'
      }}>
        {loading ? (
          Array(12).fill().map((_, i) => (
            <Stack key={i} spacing={1} className="Card" sx={{ bgcolor: "#ffffff10", padding: "5px", width: "260px" }}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "2px", bgcolor: "#cccccc50" }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: "#cccccc50", borderRadius: "2px" }} />
              <Skeleton variant="text" width="60%" sx={{ fontSize: '1rem', bgcolor: "#cccccc50", borderRadius: "2px" }}  />
            </Stack>
          ))
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            <Typography variant="h6">محصولی یافت نشد</Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSubCategories([]);
                setSelectedPriceBuckets([]);
                setSortBy('');
              }}
            >
              حذف همه فیلترها
            </Button>
          </Box>
        ) : (
          filteredProducts.map(product => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </Box>
    </Products_Container>
  );
}