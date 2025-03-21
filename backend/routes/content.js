import express from 'express';
import { createContent, updateContent, deleteContent } from '../controllers/contentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// เส้นทางสำหรับสร้างเนื้อหา (เฉพาะผู้ดูแลระบบและบรรณาธิการ)
router.post('/', authenticate, authorize(['administrator', 'editor']), createContent);

// เส้นทางสำหรับอัปเดตเนื้อหา
router.put('/:id', authenticate, authorize(['administrator', 'editor']), updateContent);

// เส้นทางสำหรับลบเนื้อหา
router.delete('/:id', authenticate, authorize(['administrator', 'editor']), deleteContent);

export default router;