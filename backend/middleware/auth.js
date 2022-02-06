const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2MzU3ODUsImV4cCI6MTY0MjcyMjE4NX0.9dWPPYUiE0tawnG3-sUk36YRXFb2pFPDyyPqYog44eo');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};