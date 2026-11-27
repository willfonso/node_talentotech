import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/', ProductController.getAll);          // GET /api/products
router.get('/:id', ProductController.getById);      // GET /api/products/:id

// Rutas protegidas con JWT
router.post('/create', authenticateToken, ProductController.create); // POST /api/products/create
router.delete('/:id', authenticateToken, ProductController.delete);  // DELETE /api/products/:id

export default router;
