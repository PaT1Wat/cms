// frontend/src/components/dashboard/Dashboard.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyContent } from '../../actions/content';
import { getMyMedia } from '../../actions/media';
import ContentSummary from './ContentSummary';
import MediaSummary from './MediaSummary';

const Dashboard = ({ 
  auth: { user },
  content: { myContent },
  media: { myMedia },
  getMyContent,
  getMyMedia
}) => {
  useEffect(() => {
    getMyContent();
    getMyMedia();
  }, [getMyContent, getMyMedia]);

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

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="text-primary">เนื้อหาล่าสุดของฉัน</h2>
          {myContent && myContent.length > 0 ? (
            <ContentSummary content={myContent.slice(0, 5)} />
          ) : (
            <p>คุณยังไม่มีเนื้อหา</p>
          )}
          <Link to="/content" className="btn btn-light">
            ดูทั้งหมด
          </Link>
        </div>

        <div className="dashboard-card">
          <h2 className="text-primary">สื่อล่าสุดของฉัน</h2>
          {myMedia && myMedia.length > 0 ? (
            <MediaSummary media={myMedia.slice(0, 5)} />
          ) : (
            <p>คุณยังไม่มีสื่อ</p>
          )}
          <Link to="/media" className="btn btn-light">
            ดูทั้งหมด
          </Link>
        </div>

        {user && (user.role === 'administrator' || user.role === 'editor') && (
          <div className="dashboard-card">
            <h2 className="text-primary">การจัดการระบบ</h2>
            <div className="admin-links">
              {user.role === 'administrator' && (
                <Link to="/admin/users" className="btn btn-dark">
                  <i className="fas fa-users-cog"></i> จัดการผู้ใช้
                </Link>
              )}
              <Link to="/content" className="btn btn-dark">
                <i className="fas fa-file-alt"></i> จัดการเนื้อหา
              </Link>
              <Link to="/media" className="btn btn-dark">
                <i className="fas fa-images"></i> จัดการสื่อ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content,
  media: state.media
});

export default connect(
  mapStateToProps,
  { getMyContent, getMyMedia }
)(Dashboard);