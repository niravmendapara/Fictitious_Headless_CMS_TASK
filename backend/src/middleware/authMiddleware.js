const authService = require('./../services/authService');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access token not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const validate = authService.validateAuthToken(token);
    console.log("validate token", validate);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;