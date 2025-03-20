// frontend/src/components/dashboard/MediaSummary.js
import React from 'react';

const MediaSummary = ({ media }) => {
  return (
    <div className="media-summary">
      <div className="media-grid">
        {media.map(item => (
          <div key={item.id} className="media-item">
            {item.mimetype.startsWith('image/') ? (
              <img src={`/uploads/${item.filename}`} alt={item.originalName} />
            ) : (
              <div className="file-icon">
                <i className="fas fa-file"></i>
                <span>{item.originalName.split('.').pop()}</span>
              </div>
            )}
            <p>{item.originalName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSummary;