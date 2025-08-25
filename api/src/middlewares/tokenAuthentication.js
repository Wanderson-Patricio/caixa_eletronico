import jwt from "jsonwebtoken";

/**
 *
 * @param {String | Bufffer | Object} obj
 * @returns {String}
 */
const generateToken = (obj) => {
  const JWT_SECRET_HASH = process.env.JWT_SECRET_HASH;
  const token = jwt.sign(obj, JWT_SECRET_HASH, { expiresIn: "1h" });
  return token;
};

/**
 *
 * @param {String} token
 * @returns {String | Bufffer | Object}
 */
const decodeToken = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "É necessário informar um token válido." });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "O formato do token é inválido." });
  }

  jwt.verify(token, process.env.JWT_SECRET_HASH, (err, decodedData) => {
    if (err) {
      
      return res.status(403).json({ message: "O token informado não corresponde a um token válido." });
    }

    req.userData = decodedData;
    next();
  });
};

export { generateToken, verifyToken };
