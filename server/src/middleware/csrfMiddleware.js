// csrfMiddleware.js
const jwt = require("jsonwebtoken");

const generateCsrfToken = (req, res, next) => {
  const csrfToken = jwt.sign(
    {
      email: req.user.email,
      userTypes: req.user.userTypes,
    },
    process.env.CSRF_TOKEN_KEY,
    { expiresIn: "1h" }
  );
  req.csrfToken = csrfToken;
  next();
};

module.exports = generateCsrfToken;
