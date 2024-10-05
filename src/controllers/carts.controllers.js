import * as services from '../services/carts.services.js';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const addCart = async (req, res, next) => {
    try {
        const cart = await services.addCart();
        if (cart) return httpResponse.Ok(res,cart);
    } catch (error) {
        next(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const { cartId, email, role } = req.session;
        const {pid} = req.params;
        const cart = await services.addProductToCart(cartId, pid, email, role);
        if(cart) return httpResponse.Ok(res, cart);
        return httpResponse.NotFound(res, {msg: 'Product or cart not exist'});
    } catch (error) {
        next(error);
    }
}

export const getCarts = async (req, res, next) => {
    try {
        const carts = await services.getCarts();
        if(carts) return httpResponse.Ok(res, carts);
    } catch (error) {
        next(error);
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await services.getCartById(cid);
        if(cart) return httpResponse.Ok(res, cart.products);
        return httpResponse.NotFound(res, {msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}

export const deleteProductToCart = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const cart = await services.deleteProductToCart(pid, cid);
        if(cart) return httpResponse.Ok(res, cart);
        return httpResponse.NotFound(res, {msg: 'Product or cart not exist'});
    } catch (error) {
        next(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const productsUpdate = req.body.products;
        const cart = await services.updateCart(cid, productsUpdate);
        if(cart) return httpResponse.Ok(res, cart);
        return httpResponse.NotFound(res, {msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}

export const updateProductToCart = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const quantity = req.body.quantity;
        const cart = await services.updateProductToCart(pid, cid, quantity);
        if(cart) return httpResponse.Ok(res, cart);
        return httpResponse.NotFound(res, {msg: "Product or cart not found"});
    } catch (error) {
        next(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await services.deleteCart(cid);
        if(cart) return httpResponse.Ok(res, cart);
        return httpResponse.NotFound(res, {msg: "Cart not found"});
    } catch (error) {
        next(error);
    }
}