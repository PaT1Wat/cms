const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed'));
    }
  }
});

const uploadMedia = async (req, res) => {
  try {
    // Only administrators and editors can upload media
    if (!['administrator', 'editor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Upload is handled by multer middleware
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const newMedia = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path,
      size: req.file.size,
      uploadedBy: req.user.id
    });
    
    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    
    // Find the media
    const media = await Media.findById(mediaId);
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Check permissions
    if (req.user.role !== 'administrator' && 
        media.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Delete the file from the filesystem
    fs.unlink(media.path, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file', error: err.message });
      }
      
      // Delete the media record from the database
      await Media.findByIdAndDelete(mediaId);
      res.json({ message: 'Media deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
