import React from 'react'
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Search from '../pages/Search/Search';
import OverviewPage from '../pages/AdminDashboard/OverviewPage/OverviewPage';
import ManagementPage from '../pages/AdminDashboard/ManagementPage/ManagementPage';
import SettingPage from '../pages/AdminDashboard/SettingPage/SettingPage';
import ProfilePage from '../pages/AdminDashboard/ProfilePage/ProfilePage';
import Auth from '../pages/auth/Auth';
import Profile from '../pages/Profile/Profile';
import ProductPage from '../components/ProductPage/ProductPage';
import Cart from '../pages/Cart/Cart';






export const routes =  [

  {
    path: '/',
        component: <Home />

},
{
        path: 'shop',
        component: <Products />

},
{
        path: 'search',
        component: <Search />

},
{
        path: 'auth',
        component: <Auth/>

},
{
        path: 'profile',
        component: <Profile/>

},
{
        path: 'ProductPage/:productId',
        component: <ProductPage />

},
{
  path: 'cart',
  component: <Cart/>

},


]


export const dashboardroutes = [
        {
          path: 'OverviewPage',
          component: <OverviewPage />,
        },
        {
          path: 'Management',
          component: <ManagementPage />,
        },
        {
          path: 'Settings',
          component: <SettingPage/>,
        },
        {
          path: 'Profile',
          component: <ProfilePage/>,
        },
        {
          path: '*',
          errorElement: <div>رای مدیریت مسیرهای نامعتبر</div>, // برای مدیریت مسیرهای نامعتبر
        },
      ];
      