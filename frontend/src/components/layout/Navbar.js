// frontend/src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-tachometer-alt"></i>{' '}
          <span className="hide-sm">แดชบอร์ด</span>
        </Link>
      </li>
      <li>
        <Link to="/content">
          <i className="fas fa-file-alt"></i>{' '}
          <span className="hide-sm">เนื้อหา</span>
        </Link>
      </li>
      <li>
        <Link to="/media">
          <i className="fas fa-images"></i>{' '}
          <span className="hide-sm">สื่อ</span>
        </Link>
      </li>
      {user && user.role === 'administrator' && (
        <li>
          <Link to="/admin/users">
            <i className="fas fa-users-cog"></i>{' '}
            <span className="hide-sm">จัดการผู้ใช้</span>
          </Link>
        </li>
      )}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">ออกจากระบบ</span>
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
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-layer-group"></i> CMS
        </Link>
      </h1>
      {!loading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);