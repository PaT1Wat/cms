const authenticate = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user object to request
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  // Role-based authorization middleware
  const authorize = (roles = []) => {
    return (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };