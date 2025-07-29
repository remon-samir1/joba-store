import React from 'react';
import Cookies from "cookie-universal";
import { Outlet } from 'react-router-dom';
import AdminLogin from '../../components/AdminLogin/AdminLogin';

const cookie = Cookies();
const token = cookie.get("token");

const RequireAuth = () => {
  return (
    <div>
      {
        token ? <Outlet/> : <AdminLogin/>
      }
    </div>
  );
}

export default RequireAuth;
