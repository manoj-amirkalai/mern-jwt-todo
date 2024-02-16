const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token;
  let autheader = req.headers.Authorization || req.headers.authorization;

  if (autheader && autheader.startsWith("Bearer")) {
    token = autheader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send({ auth: false, message: "Failed to authenticate" });
      }
      req.id = decoded.user.id;
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401).send({ message: "No token provided" });
  }
};
module.exports = validateToken;
