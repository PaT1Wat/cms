import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> ไม่พบหน้า
      </h1>
      <p className="large">ขออภัย ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="btn btn-primary">
        กลับสู่หน้าหลัก
      </Link>
    </div>
  );
};

export default NotFound;