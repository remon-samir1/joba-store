import React, { useEffect, useState } from 'react';
import Cookies from 'cookie-universal';
import { Outlet } from 'react-router-dom';
import AdminLogin from '../../components/AdminLogin/AdminLogin';
import axios from 'axios'; // تأكد من استيراد axios
import { Axios } from '../../components/Helpers/Axios';

const RequireAuth = () => {
  const cookie = Cookies();
  const token = cookie.get("token");

  const [auth, setAuth] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const res = await Axios.get("/admin/dashboard");
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (auth) {
    return <Outlet />;
  }

  return <AdminLogin />;
};

export default RequireAuth;
