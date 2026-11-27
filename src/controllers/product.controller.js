import { ProductService } from '../services/product.service.js';

export const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json({ success: true, data: products });
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ success: false, message: error.message || 'Error interno del servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      return res.status(200).json({ success: true, data: product });
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ success: false, message: error.message || 'Error interno del servidor' });
    }
  },

  ///async create(req, res) {
    ///try {
      ///const newProduct = await ProductService.createProduct(req.body);
      ///return res.status(201).json({ 
        ///success: true, 
        ///message: 'Producto creado exitosamente', 
        ///data: newProduct 
      ///});
    ///} catch (error) {
      ///const status = error.status || 400;
      ///return res.status(status).json({ success: false, message: error.message || 'Datos de producto inválidos' });
    ///}
  ///},

  async create(req, res) {
  try {
    console.log("1. Llegó al controlador con body:", req.body);
    const newProduct = await ProductService.createProduct(req.body);
    console.log("2. Guardado exitoso:", newProduct);
    return res.status(201).json({ 
      success: true, 
      message: 'Producto creado exitosamente', 
      data: newProduct 
    });
    } catch (error) {
    console.error("Error capturado:", error);
    const status = error.status || 400;
    return res.status(status).json({ success: false, message: error.message || 'Datos de producto inválidos' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      return res.status(200).json({ 
        success: true, 
        message: `Producto ${id} eliminado correctamente` 
      });
    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ success: false, message: error.message || 'Error al eliminar producto' });
    }
  }
};
