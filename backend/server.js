import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './models/index.js'; // เพิ่มการนำเข้า syncDatabase
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));