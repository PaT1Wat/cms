import axios from 'axios';

// ฟังก์ชันสำหรับตั้งค่า token ใน header ของ axios
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;