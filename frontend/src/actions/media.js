import axios from 'axios';
import {
  GET_MEDIA,
  GET_MY_MEDIA,
  MEDIA_ERROR,
  UPLOAD_MEDIA,
  DELETE_MEDIA
} from './types';

// รับสื่อทั้งหมด
export const getMedia = () => async dispatch => {
  try {
    const res = await axios.get('/api/media');

    dispatch({
      type: GET_MEDIA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEDIA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// รับสื่อของฉัน
export const getMyMedia = () => async dispatch => {
  try {
    const res = await axios.get('/api/media/me');

    dispatch({
      type: GET_MY_MEDIA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEDIA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// อัปโหลดสื่อ
export const uploadMedia = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/media', formData, config);

    dispatch({
      type: UPLOAD_MEDIA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEDIA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ลบสื่อ
export const deleteMedia = id => async dispatch => {
  try {
    await axios.delete(`/api/media/${id}`);

    dispatch({
      type: DELETE_MEDIA,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: MEDIA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};