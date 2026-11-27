import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado: Token no proporcionado (401)'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_default', (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Acceso prohibido: Token inválido o expirado (403)'
      });
    }
    req.user = user;
    next();
  });
};
