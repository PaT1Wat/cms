const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // รับโทเค็นจากส่วนหัว
  const token = req.header('x-auth-token');
  
  // ตรวจสอบว่าโทเค็นมีอยู่หรือไม่
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // ตรวจสอบโทเค็น
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // เพิ่มวัตถุผู้ใช้ลงในคำขอ
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware การตรวจสอบสิทธิ์ตามบทบาท
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};