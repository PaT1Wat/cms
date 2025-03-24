// frontend/src/components/dashboard/Dashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h1 className="large text-primary">แดชบอร์ด</h1>
      <p className="lead">
        <i className="fas fa-user"></i> ยินดีต้อนรับ {user && user.username}
      </p>
      
      <div className="dash-buttons">
        <Link to="/content/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> สร้างเนื้อหาใหม่
        </Link>
        <Link to="/media/upload" className="btn btn-light">
          <i className="fas fa-upload"></i> อัปโหลดสื่อ
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;