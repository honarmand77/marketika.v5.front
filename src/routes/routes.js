import React, { lazy } from "react";

const Products = lazy(()=> import('../pages/Products/Products'));
const Home = lazy(()=> import('../pages/Home/Home'));
const OverviewPage = lazy(()=> import('../pages/AdminDashboard/OverviewPage/OverviewPage'));
const Search = lazy(()=> import('../pages/Search/Search'));
const ManagementPage = lazy(()=> import('../pages/AdminDashboard/ManagementPage/ManagementPage'));
const SettingPage = lazy(()=> import('../pages/AdminDashboard/SettingPage/SettingPage'));
const ProfilePage = lazy(()=> import('../pages/AdminDashboard/ProfilePage/ProfilePage'));
const Auth = lazy(()=> import('../pages/auth/Auth'));
const Profile = lazy(()=> import('../pages/Profile/Profile'));
const ProductPage = lazy(()=> import('../components/ProductPage/ProductPage'));
const Cart = lazy(()=> import('../pages/Cart/Cart'));
const Checkout = lazy(()=> import('../pages/Checkout/Checkout'));






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

},{
  path: 'Checkout',
  component: <Checkout/>

}

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
      