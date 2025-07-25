import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPath } from '../../redux/reducers/locationSlice';

const LocationTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // به‌روزرسانی مسیر در Redux
    dispatch(setPath(location.pathname));
  }, [location, dispatch]);

  return null;
};

export default LocationTracker;
