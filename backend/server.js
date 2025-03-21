import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './models/index.js';

dotenv.config();

const app = express();

// เชื่อมต่อกับฐานข้อมูลโดยใช้ Sequelize
syncDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// นำเข้าตัวจัดการเส้นทาง
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const contentRoutes = require('./routes/content');
const mediaRoutes = require('./routes/media');

// ใช้เส้นทาง
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));