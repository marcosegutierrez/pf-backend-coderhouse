import { __dirname } from "../utils.js";
import factory from "../persistence/daos/factory.js";
const { prodDao, cartDao } = factory;

export const addCart = async () => {
    try {
        return await cartDao.addCart();
    } catch (error) {
        throw new Error(error);
    }
}

export const addProductToCart = async (cid, pid, email, role) => {
    try {
        const existCart = await cartDao.getCartById(cid);
        if (!existCart) return null;
        const existProd = await prodDao.getProductById(pid);
        if (!existProd) return null;
        if (existProd.owner === email && role === "premium") return null; // No puede añadir un producto que es suyo
        return await cartDao.addProductToCart(pid, cid);
    } catch (error) {
        throw new Error(error);
    }
}

export const getCarts = async () => {
    try {
        return await cartDao.getCarts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (cid) => {
    try {
        return await cartDao.getCartById(cid);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductToCart = async (idProduct, idCart) => {
    try {
        return await cartDao.deleteProductToCart(idProduct, idCart);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (id, productsUpdate) => {
    try {
        return await cartDao.updateCart(id, productsUpdate);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductToCart = async (idProduct, idCart, quantity) => {
    try {
        return await cartDao.updateProductToCart(idProduct, idCart, quantity);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (idCart) => {
    try {
        return await cartDao.deleteCart(idCart);
    } catch (error) {
        throw new Error(error);
    }
}