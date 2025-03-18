import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers, updateUserRole } from '../../actions/users';

const UserManagement = ({ getUsers, updateUserRole, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={e => onRoleChange(user._id, e.target.value)}
                >
                  <option value="administrator">Administrator</option>
                  <option value="editor">Editor</option>
                  <option value="visitor">Visitor</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, { getUsers, updateUserRole })(UserManagement);