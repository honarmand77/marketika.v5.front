import React ,{useEffect}from 'react';
import { AdminDashboardContainer } from './AdminDashboard.style';
import NavBar from './NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import OverviewPage from './OverviewPage/OverviewPage';
import ManagementPage from './ManagementPage/ManagementPage';
import SettingPage from './SettingPage/SettingPage';
import ProfilePage from './ProfilePage/ProfilePage';
import { useDispatch , useSelector} from "react-redux";
import { loadUserFromStorage } from "../../redux/reducers/authSlice";
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <>
    {
     user ? user?.role === "admin" ? (
    <AdminDashboardContainer className="AdminDashboard scroller">
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="Management" element={<ManagementPage />} />
        <Route path="Settings" element={<SettingPage />} />
        <Route path="Profile" element={<ProfilePage />} />
      </Routes>
      <NavBar />
    </AdminDashboardContainer>
    ) : (
      <h1>این صفحه برای شما در دسترس نیست </h1>
    ) : (
      <h1>این صفحه برای شما در دسترس نیست </h1>
    )
    }
    </>
  );
}
