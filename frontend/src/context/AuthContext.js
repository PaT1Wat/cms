import React, { createContext, useState } from 'react';
import axios from 'axios';

// สร้าง Context
export const AuthContext = createContext();

// สร้าง Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
  const [isAuthenticated, setIsAuthenticated] = useState(false); // เก็บสถานะการเข้าสู่ระบบ
  const [loading, setLoading] = useState(false); // สถานะการโหลด

  // ฟังก์ชันเข้าสู่ระบบ
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data.user); // เก็บข้อมูลผู้ใช้ที่ได้จาก API
      setIsAuthenticated(true); // ตั้งค่าสถานะการเข้าสู่ระบบ
      localStorage.setItem('token', res.data.token); // เก็บ token ใน localStorage
    } catch (err) {
      console.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // ลบ token ออกจาก localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};