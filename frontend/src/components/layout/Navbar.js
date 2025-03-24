// frontend/src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">แดชบอร์ด</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          ออกจากระบบ
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">สมัครสมาชิก</Link>
      </li>
      <li>
        <Link to="/login">เข้าสู่ระบบ</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <h1>
        <Link to="/">CMS</Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;