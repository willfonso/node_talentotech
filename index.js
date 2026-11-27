import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales requeridos
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas base
app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);

// Ruta de comprobación de salud
app.get('/', (req, res) => {
  res.json({ message: 'API REST Catálogo de Productos activa' });
});

// Requerimiento #3 & #7: Manejo de rutas no definidas (Error 404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

// Middleware global de errores 500
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor (500)'
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;
