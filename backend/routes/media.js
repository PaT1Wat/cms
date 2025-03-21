import express from 'express';
import { uploadMedia, deleteMedia } from '../controllers/mediaController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// เส้นทางสำหรับอัปโหลดสื่อ (เฉพาะผู้ดูแลระบบและบรรณาธิการ)
router.post('/', authenticate, authorize(['administrator', 'editor']), uploadMedia);

// เส้นทางสำหรับลบสื่อ
router.delete('/:id', authenticate, authorize(['administrator', 'editor']), deleteMedia);

export default router;