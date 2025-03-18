const createContent = async (req, res) => {
    try {
      // Only administrators and editors can create content
      if (!['administrator', 'editor'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const { title, content, category, tags, status } = req.body;
      
      const newContent = new Content({
        title,
        content,
        category,
        tags: tags || [],
        author: req.user.id,
        status
      });
      
      await newContent.save();
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  const updateContent = async (req, res) => {
    try {
      const contentId = req.params.id;
      const { title, content, category, tags, status } = req.body;
      
      // Find the content
      const contentItem = await Content.findById(contentId);
      
      if (!contentItem) {
        return res.status(404).json({ message: 'Content not found' });
      }
      
      // Check permissions
      if (req.user.role !== 'administrator' && 
          contentItem.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Update content
      contentItem.title = title || contentItem.title;
      contentItem.content = content || contentItem.content;
      contentItem.category = category || contentItem.category;
      contentItem.tags = tags || contentItem.tags;
      contentItem.status = status || contentItem.status;
      contentItem.lastModified = Date.now();
      
      await contentItem.save();
      res.json(contentItem);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  const deleteContent = async (req, res) => {
    try {
      const contentId = req.params.id;
      
      // Find the content
      const contentItem = await Content.findById(contentId);
      
      if (!contentItem) {
        return res.status(404).json({ message: 'Content not found' });
      }
      
      // Check permissions (only administrators or the author who is an editor can delete)
      if (req.user.role !== 'administrator' && 
          (contentItem.author.toString() !== req.user.id || req.user.role !== 'editor')) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      await Content.findByIdAndDelete(contentId);
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };