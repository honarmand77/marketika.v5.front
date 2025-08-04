import React, { useState } from 'react';
import {
  NavBarContainer,
  IconContainer,
  MenuContainer,
} from './NavBar.style';
import { ReactComponent as Logo } from "../../../assets/icons/marketika.svg";
import Buttons from '../../../components/Buttons/Buttons';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import PreviewIcon from '@mui/icons-material/Preview';
import StorageIcon from '@mui/icons-material/Storage';
import ServerIcon from '@mui/icons-material/Dns';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const currentPath = useSelector((state) => state.location.currentPath); // اطمینان حاصل کنید که این مقدار دقیقاً مسیر فعلی را نشان می‌دهد
  const navigate = useNavigate();

  // توابع
  const NavbarOpening = () => {
    setOpen(!open);
  };

  // مسیرها و کلاس‌های فعال
  const isActive = (path) => (currentPath === path ? "active" : "");

  return (
    <NavBarContainer className={`AuthStep ${open ? 'open' : 'close'}`}>

      <MenuContainer>
        <div className="humIcon">
          <Buttons
            Lable="بستن"
            type="MenuIcon"
            Icon={open ? <MenuOpenIcon /> : <MenuIcon />}
            OnClick={NavbarOpening}
          />
        </div>

        {/* مسیرهای داشبورد */}
        <Buttons
          Lable="نمای کلی"
          type={`MenuIcon ${isActive("/dashboard")}`}
          Icon={<CalendarViewMonthIcon />}
          OnClick={() => navigate("/dashboard")}
        />
        <Buttons
          Lable="مدیریت"
          type={`MenuIcon ${isActive("/dashboard/Management")}`}
          Icon={<LibraryAddIcon />}
          OnClick={() => navigate("Management")}
        />
        <Buttons
          Lable="تنظیمات"
          type={`MenuIcon ${isActive("/dashboard/Settings")}`}
          Icon={<SettingsIcon />}
          OnClick={() => navigate("Settings")}
        />
        <Buttons
          Lable="حساب"
          type={`MenuIcon ${isActive("/dashboard/Profile")}`}
          Icon={<AccountCircleIcon />}
          OnClick={() => navigate("Profile")}
        />
      </MenuContainer>

      {/* کلیدهای میانبر */}
      <div className="ShortcutButtonss">
        <Buttons
          OnClick={() => window.open('/', '_blank')}
          Icon={<PreviewIcon />}
          Lable="وب‌سایت"
          type="ShortcutButtons"
        />
        <Buttons
          OnClick={() => window.open('/database', '_blank')}
          Icon={<StorageIcon />}
          Lable="دیتابیس"
          type="ShortcutButtons"
        />
        <Buttons
          OnClick={() => window.open('https://cp40.tavanahost.com', '_blank')}
          Icon={<ServerIcon />}
          Lable="پنل هاست"
          type="ShortcutButtons"
        />
      </div>
    </NavBarContainer>
  );
}
