// frontend/src/components/media/MediaList.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMedia, deleteMedia } from '../../actions/media';
import MediaUpload from './MediaUpload';

const MediaList = ({ getMedia, deleteMedia, media: { mediaItems, loading }, auth: { user } }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    getMedia();
  }, [getMedia]);

  const onDelete = id => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบสื่อนี้?')) {
      deleteMedia(id);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    // กรองตามบทบาท
    if (filter === 'mine' && item.uploadedBy.id !== user.id) return false;
    if (filter === 'images' && !item.mimetype.startsWith('image/')) return false;
    if (filter === 'documents' && !item.mimetype.includes('pdf') && !item.mimetype.includes('doc')) return false;
    
    // กรองตามคำค้นหา
    if (searchTerm && !item.originalName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="container">
      <h1 className="large text-primary">จัดการสื่อ</h1>
      
      <div className="media-actions">
        <button 
          className="btn btn-primary"
          onClick={() => setShowUpload(!showUpload)}
        >
          <i className="fas fa-upload"></i> {showUpload ? 'ยกเลิกการอัปโหลด' : 'อัปโหลดสื่อใหม่'}
        </button>
        
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="ค้นหาสื่อ..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <select onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="all">ทั้งหมด</option>
            <option value="mine">สื่อของฉัน</option>
            <option value="images">รูปภาพ</option>
            <option value="documents">เอกสาร</option>
          </select>
        </div>
      </div>
      
      {showUpload && <MediaUpload />}
      
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="media-grid">
          {filteredMedia.length > 0 ? (
            filteredMedia.map(item => (
              <div key={item.id} className="media-card">
                <div className="media-preview">
                  {item.mimetype.startsWith('image/') ? (
                    <img src={`/uploads/${item.filename}`} alt={item.originalName} />
                  ) : (
                    <div className="file-icon">
                      <i className="fas fa-file"></i>
                      <span>{item.originalName.split('.').pop()}</span>
                    </div>
                  )}
                </div>
                <div className="media-info">
                  <h4>{item.originalName}</h4>
                  <p>
                    <span>{(item.size / 1024).toFixed(2)} KB</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
                <div className="media-actions">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(`/uploads/${item.filename}`);
                      alert('คัดลอกที่อยู่เรียบร้อยแล้ว');
                    }}
                  >
                    <i className="fas fa-link"></i>
                  </button>
                  {(user.role === 'administrator' || item.uploadedBy.id === user.id) && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>ไม่พบสื่อ</p>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  media: state.media,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMedia, deleteMedia }
)(MediaList);