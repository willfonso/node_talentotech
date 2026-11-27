import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await_auth(email, password);
      return res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        token_type: 'Bearer',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Error en el proceso de autenticación'
      });
    }
  }
};

function await_auth(email, password) {
  return AuthService.login(email, password);
}
