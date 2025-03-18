const getAllUsers = async (req, res) => {
    try {
      // Only administrators can access all users
      if (req.user.role !== 'administrator') {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  const updateUserRole = async (req, res) => {
    try {
      // Only administrators can update user roles
      if (req.user.role !== 'administrator') {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const { userId, newRole } = req.body;
      
      // Check if role is valid
      if (!['administrator', 'editor', 'visitor'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      
      const user = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
      ).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };