const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) { return res.status(401).json({ message: 'Invalid token' }); }
};

exports.authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};
