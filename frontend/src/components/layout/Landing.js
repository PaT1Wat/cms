// frontend/src/components/layout/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ระบบจัดการเนื้อหา</h1>
          <p className="lead">
            สร้าง จัดการ และเผยแพร่เนื้อหาของคุณอย่างง่ายดาย
          </p>
          <div className="buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary">
                  สมัครสมาชิก
                </Link>
                <Link to="/login" className="btn btn-light">
                  เข้าสู่ระบบ
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn btn-primary">
                ไปที่แดชบอร์ด
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);