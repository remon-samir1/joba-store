"use client";

import { useState } from "react";
import Cookies from "cookie-universal";
import Notification from '../../components/Notification'

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import juba from '../../src/assets/juba.svg'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cookie = Cookies();
const nav = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://goba-ecommerce.sunmedagency.com/api/auth/login", {
        email,
        password,
      }).then((res)=>{

        const token = res.data.data.access_token;
        cookie.set("token", token , {path: '/'});

        console.log(token);
        toast.success('Login Succssefly')
        window.location.pathname = '/'
        // nav('/')
      });
    } catch (err) {
      toast.error('Invalid email or password !')
  console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Notification/>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-8 border-[#F15A24]"
        >
          <div className="flex justify-center">

<img src={juba} alt="juba" />
          </div>
        <h2 className="text-2xl font-bold mb-6 text-[#F15A24] text-center">
        Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Email</label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1"> Password</label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F15A24] hover:bg-orange-800 text-white duration-300"
        >
          {loading ? "Loading..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
        
}
