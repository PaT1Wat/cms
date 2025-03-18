// โหลดข้อมูลผู้ใช้
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // เพิ่ม endpoint เพื่อรับข้อมูลผู้ใช้จากโทเค็น
    const res = await axios.get('/api/auth/me');
    
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};