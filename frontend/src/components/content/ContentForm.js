import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createContent } from '../../actions/content';

const ContentForm = ({ createContent, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    status: 'draft'
  });

  const { title, content, category, tags, status } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createContent({
      ...formData,
      tags: tags.split(',').map(tag => tag.trim())
    }, history);
  };

  return (
    <div className="container">
      <h1>Create New Content</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={content}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={status} onChange={onChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Content</button>
      </form>
    </div>
  );
};

export default connect(null, { createContent })(ContentForm);