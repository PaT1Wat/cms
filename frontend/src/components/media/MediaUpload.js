import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadMedia } from '../../actions/media';

const MediaUpload = ({ uploadMedia }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    uploadMedia(formData);
  };

  return (
    <div className="container">
      <h2>Upload Media</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>File</label>
          <input
            type="file"
            onChange={onChange}
            required
          />
          <small>{filename}</small>
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default connect(null, { uploadMedia })(MediaUpload);
