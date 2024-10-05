import {CartModel} from './models/cart.model.js';
import ProductsManagerMongo from './products.manager.js';

const prodDao = new ProductsManagerMongo();

export default class CartsManagerMongo {

    async addCart () {
        const cart = await CartModel.create({ products: []});
        return cart;
    }

    async getCarts() {
        let carts = await CartModel.find({});
        if (carts) return carts;
        else return [];
    }

    async getCartById(id) {
        const cartFound = await CartModel.findById(id).populate('products.product');
        if (cartFound) return cartFound;
        else return null;
    }

    async addProductToCart(idProduct, idCart) {
        const cart = await CartModel.findById(idCart);
        if (!cart) return null;
        const prod = await prodDao.getProductById(idProduct);
        if (!prod) return null;
        const existProdIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
        if(existProdIndex !== -1) {
          cart.products[existProdIndex].quantity++;
        } else cart.products.push({ product: idProduct});
        await cart.save();  
        return cart;
    }

    async deleteProductToCart(idProduct, idCart) {
        const cart = await CartModel.findById(idCart);
        if (!cart) return null;
        const existProdIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
        if(existProdIndex === -1) {
          return null;
        } else cart.products = cart.products.filter(p => p.product.toString() !== idProduct);
        await cart.save();  
        return cart;
    }

    async updateCart(id, productsUpdate) {
        const cartFound = await CartModel.findById(id);
        if (!cartFound) return null;
        productsUpdate.forEach(idProduct => {
            const existProdIndex = cartFound.products.findIndex(p => p.product.toString() === idProduct);
            if(existProdIndex !== -1) {
                cartFound.products[existProdIndex].quantity++;
            } else cartFound.products.push({ product: idProduct});
        });
        cartFound.save();
        return cartFound;
    }

    async updateProductToCart(idProduct, idCart, quantity) {
        const cart = await CartModel.findById(idCart);
        if (!cart) return null;
        const existProdIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
        if(existProdIndex === -1) {
          return null;
        } else {
            return await CartModel.findOneAndUpdate(
                { _id: idCart, 'products.product': idProduct },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            );
        }        
    }
    
    async deleteCart(idCart) {
        const cartFound = await CartModel.findById(idCart);
        if(!cartFound) return null;
        cartFound.products = [];
        cartFound.save();
        return cartFound;
    }

}