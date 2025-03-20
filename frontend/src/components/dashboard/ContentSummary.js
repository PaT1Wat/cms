// frontend/src/components/dashboard/ContentSummary.js
import React from 'react';
import { Link } from 'react-router-dom';

const ContentSummary = ({ content }) => {
  return (
    <div className="content-summary">
      <table>
        <thead>
          <tr>
            <th>หัวข้อ</th>
            <th>สถานะ</th>
            <th>การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {content.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <span className={`status-badge ${item.status}`}>
                  {item.status === 'published' ? 'เผยแพร่แล้ว' : 'ร่าง'}
                </span>
              </td>
              <td>
                <Link to={`/content/edit/${item.id}`} className="btn btn-sm">
                  <i className="fas fa-edit"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentSummary;