const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({
      error: 'You must be logged in to access this resource.',
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
