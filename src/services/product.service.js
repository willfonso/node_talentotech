import { ProductModel } from '../models/product.model.js';

export const ProductService = {
  async getAllProducts() {
    return await ProductModel.getAll();
  },

  async getProductById(id) {
    if (!id) {
      throw { status: 400, message: 'El ID del producto es requerido' };
    }
    const product = await ProductModel.getById(id);
    if (!product) {
      throw { status: 404, message: `Producto con ID ${id} no encontrado` };
    }
    return product;
  },

  async createProduct(data) {
    const { name, price, stock, category } = data;
    if (!name || price === undefined) {
      throw { status: 400, message: 'Campos obligatorios faltantes: nombre y precio son requeridos' };
    }
    return await ProductModel.create({
      name,
      price: Number(price),
      stock: stock !== undefined ? Number(stock) : 0,
      category: category || 'General'
    });
  },

  async deleteProduct(id) {
    if (!id) {
      throw { status: 400, message: 'El ID del producto es requerido' };
    }
    const deleted = await ProductModel.delete(id);
    if (!deleted) {
      throw { status: 404, message: `No se pudo eliminar: Producto con ID ${id} no encontrado` };
    }
    return deleted;
  }
};
