import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// เส้นทางสำหรับดึงข้อมูลผู้ใช้ทั้งหมด (เฉพาะผู้ดูแลระบบ)
router.get('/', authenticate, authorize(['administrator']), getAllUsers);

// เส้นทางสำหรับอัปเดตบทบาทผู้ใช้ (เฉพาะผู้ดูแลระบบ)
router.put('/:id/role', authenticate, authorize(['administrator']), updateUserRole);

export default router;