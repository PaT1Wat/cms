export const createContent = async (req, res) => {
  try {
    // เฉพาะผู้ดูแลระบบและบรรณาธิการเท่านั้นที่สามารถสร้างเนื้อหาได้
    if (!['administrator', 'editor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { title, content, category, tags, status } = req.body;
    
    const newContent = await Content.create({
      title,
      content,
      category,
      tags: tags || [],
      authorId: req.user.id,
      status
    });
    
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { title, content, category, tags, status } = req.body;
    
    // ค้นหาเนื้อหา
    const contentItem = await Content.findByPk(contentId, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }]
    });
    
    if (!contentItem) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    // ตรวจสอบสิทธิ์
    if (req.user.role !== 'administrator' && 
        contentItem.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // อัปเดตเนื้อหา
    contentItem.title = title || contentItem.title;
    contentItem.content = content || contentItem.content;
    contentItem.category = category || contentItem.category;
    contentItem.tags = tags || contentItem.tags;
    contentItem.status = status || contentItem.status;
    contentItem.updatedAt = new Date();
    
    await contentItem.save();
    res.json(contentItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    
    // ค้นหาเนื้อหา
    const contentItem = await Content.findByPk(contentId);
    
    if (!contentItem) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    // ตรวจสอบสิทธิ์ (เฉพาะผู้ดูแลระบบหรือผู้เขียนที่เป็นบรรณาธิการเท่านั้นที่สามารถลบได้)
    if (req.user.role !== 'administrator' && 
        (contentItem.authorId !== req.user.id || req.user.role !== 'editor')) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await contentItem.destroy();
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};