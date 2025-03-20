import axios from 'axios';
import {
  GET_CONTENTS,
  GET_CONTENT,
  GET_MY_CONTENT,
  CONTENT_ERROR,
  CREATE_CONTENT,
  UPDATE_CONTENT,
  DELETE_CONTENT
} from './types';

// รับเนื้อหาทั้งหมด
export const getContents = () => async dispatch => {
  try {
    const res = await axios.get('/api/content');

    dispatch({
      type: GET_CONTENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// รับเนื้อหาโดย ID
export const getContent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/content/${id}`);

    dispatch({
      type: GET_CONTENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// รับเนื้อหาของฉัน
export const getMyContent = () => async dispatch => {
  try {
    const res = await axios.get('/api/content/me');

    dispatch({
      type: GET_MY_CONTENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// สร้างเนื้อหาใหม่
export const createContent = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/content', formData, config);

    dispatch({
      type: CREATE_CONTENT,
      payload: res.data
    });

    history.push('/content');
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// อัปเดตเนื้อหา
export const updateContent = (id, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/content/${id}`, formData, config);

    dispatch({
      type: UPDATE_CONTENT,
      payload: res.data
    });

    history.push('/content');
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ลบเนื้อหา
export const deleteContent = id => async dispatch => {
  if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบเนื้อหานี้?')) {
    try {
      await axios.delete(`/api/content/${id}`);

      dispatch({
        type: DELETE_CONTENT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};