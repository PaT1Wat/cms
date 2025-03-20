import axios from 'axios';
import {
  GET_USERS,
  UPDATE_USER_ROLE,
  USER_ERROR
} from './types';

// รับผู้ใช้ทั้งหมด
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// อัปเดตบทบาทผู้ใช้
export const updateUserRole = (userId, role) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/users/${userId}/role`, { role }, config);

    dispatch({
      type: UPDATE_USER_ROLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};