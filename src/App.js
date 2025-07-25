import './App.css';
import React, { useEffect, useCallback, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LocationTracker from './components/LocationTracker/LocationTracker';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';

// Static imports for critical data and components
import { routes } from './routes/routes';
import { fetchBanners } from './redux/reducers/bannersSlice';
import { fetchProducts } from './redux/reducers/productsSlice';
import { fetchCategories } from './redux/reducers/categoriesSlice';
import { loadUserFromStorage } from './redux/reducers/authSlice';

// Lazy load heavy components
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard/AdminDashboard'));

// Lazy imports for secondary data
const fetchSubcategories = () => import('./redux/reducers/subcategoriesSlice')
  .then(module => module.fetchSubcategories);
const fetchCart = () => import('./redux/reducers/cartSlice')
  .then(module => module.fetchCart);

// Async import for admin routes
let dashboardroutes = null;
import('./routes/routes').then(module => {
  dashboardroutes = module.dashboardroutes;
});

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // Memoized data fetching function
  const fetchInitialData = useCallback(async () => {
    try {
      // Critical data (render-blocking)
      await Promise.all([
        dispatch(fetchProducts()),
        dispatch(fetchCategories()),
        dispatch(loadUserFromStorage())
      ]);
      
      // Secondary data (non-blocking)
      setTimeout(async () => {
        dispatch(fetchBanners());
        dispatch((await fetchSubcategories())());
        dispatch((await fetchCart(user?.id))());
      }, 100);
      
    } catch (error) {
      console.error("Initial data loading failed:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="App">
      <Router>
        <LocationTracker />
        <Header />
        
        <Routes>
          {routes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={route.component} 
              errorElement={route.errorElement} 
            />
          ))}
          
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<Loader />}>
                <AdminDashboard />
              </Suspense>
            }
          >
            {dashboardroutes && dashboardroutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.component} 
                errorElement={route.errorElement} 
              />
            ))}
          </Route>
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default React.memo(App);