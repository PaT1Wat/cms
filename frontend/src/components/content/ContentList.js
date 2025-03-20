// frontend/src/components/content/ContentList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContents, deleteContent } from '../../actions/content';

const ContentList = ({ getContents, deleteContent, content: { contents, loading }, auth: { user } }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getContents();
  }, [getContents]);

  const onDelete = id => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบเนื้อหานี้?')) {
      deleteContent(id);
    }
  };

  const filteredContents = contents.filter(item => {
    // กรองตามบทบาทและสถานะ
    if (filter === 'mine' && item.author.id !== user.id) return false;
    if (filter === 'draft' && item.status !== 'draft') return false;
    if (filter === 'published' && item.status !== 'published') return false;
    
    // กรองตามคำค้นหา
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="container">
      <h1 className="large text-primary">จัดการเนื้อหา</h1>
      
      <div className="content-actions">
        <Link to="/content/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> สร้างเนื้อหาใหม่
        </Link>
        
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="ค้นหาเนื้อหา..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <select onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="all">ทั้งหมด</option>
            <option value="mine">เนื้อหาของฉัน</option>
            <option value="draft">ร่าง</option>
            <option value="published">เผยแพร่แล้ว</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="content-list">
          {filteredContents.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>หัวข้อ</th>
                  <th>หมวดหมู่</th>
                  <th>สถานะ</th>
                  <th>ผู้เขียน</th>
                  <th>วันที่สร้าง</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'published' ? 'เผยแพร่แล้ว' : 'ร่าง'}
                      </span>
                    </td>
                    <td>{item.author.username}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/content/edit/${item.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        {(user.role === 'administrator' || item.author.id === user.id) && (
                          <button
                            onClick={() => onDelete(item.id)}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>ไม่พบเนื้อหา</p>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  content: state.content,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getContents, deleteContent }
)(ContentList);