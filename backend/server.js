import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './models/index.cjs'; // เพิ่มการนำเข้า syncDatabase
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import contentRoutes from './routes/content.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();

// เชื่อมต่อกับฐานข้อมูลโดยใช้ Sequelize
syncDatabase(); // เรียกใช้ฟังก์ชัน syncDatabase

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ใช้เส้นทาง
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5001; // เปลี่ยนจาก 5000 เป็น 5001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// จัดการข้อผิดพลาดเมื่อพอร์ตถูกใช้งาน
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1); // ออกจากโปรแกรม
  } else {
    console.error('Server error:', err);
  }
});