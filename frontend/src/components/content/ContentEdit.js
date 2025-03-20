// frontend/src/components/content/ContentEdit.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getContent, updateContent } from '../../actions/content';

const ContentEdit = ({ 
  getContent, 
  updateContent, 
  content: { currentContent, loading },
  auth: { user },
  match,
  history 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    status: ''
  });

  useEffect(() => {
    getContent(match.params.id);
  }, [getContent, match.params.id]);

  useEffect(() => {
    if (currentContent) {
      setFormData({
        title: currentContent.title || '',
        content: currentContent.content || '',
        category: currentContent.category || '',
        tags: currentContent.tags ? currentContent.tags.join(', ') : '',
        status: currentContent.status || 'draft'
      });
    }
  }, [currentContent]);

  const { title, content, category, tags, status } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateContent(match.params.id, {
      ...formData,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">แก้ไขเนื้อหา</h1>
      
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="content-edit">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>หัวข้อ</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>เนื้อหา</label>
              <textarea
                name="content"
                value={content}
                onChange={onChange}
                required
                rows="10"
              />
            </div>
            
            <div className="form-group">
              <label>หมวดหมู่</label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>แท็ก (คั่นด้วยเครื่องหมายจุลภาค)</label>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={onChange}
              />
            </div>
            
            <div className="form-group">
              <label>สถานะ</label>
              <select name="status" value={status} onChange={onChange}>
                <option value="draft">ร่าง</option>
                <option value="published">เผยแพร่</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                บันทึกการเปลี่ยนแปลง
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => history.goBack()}
              >
                ยกเลิก
              </button>
            </div>
          </form>
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
  { getContent, updateContent }
)(ContentEdit);