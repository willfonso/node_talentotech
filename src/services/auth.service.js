import jwt from 'jsonwebtoken';

// Credenciales fijas de prueba (o puedes conectar Firestore para usuarios)
const MOCK_USER = {
  email: 'admin@tienda.com',
  password: 'password123',
  id: 'usr_admin_01',
  role: 'admin'
};

export const AuthService = {
  login(email, password) {
    if (!email || !password) {
      throw { status: 400, message: 'Debe ingresar email y contraseña' };
    }

    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      throw { status: 401, message: 'Credenciales inválidas' };
    }

    const payload = {
      sub: MOCK_USER.id,
      email: MOCK_USER.email,
      role: MOCK_USER.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret_default', {
      expiresIn: '2h'
    });

    return { token, user: { email: MOCK_USER.email, role: MOCK_USER.role } };
  }
};
