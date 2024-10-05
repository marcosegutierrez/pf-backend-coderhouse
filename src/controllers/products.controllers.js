import * as services from '../services/products.services.js';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const getProducts = async (req, res, next) => {
    try {
        const products = await services.getProducts();
        if (req.session.email) {
            const docs = products.docs
            res.render('home2', {docs: docs, req: req})
        } else return httpResponse.Ok(res, products);
        
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const {pid} = req.params;
        const product = await services.getProductById(pid);
        if (product) return httpResponse.Ok(res, product);
        return httpResponse.NotFound(res, {msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const { role, email } = req.session;
        const product = req.body;
        const newProduct = await services.addProduct(product, role, email);
        return httpResponse.Ok(res, newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { role, email } = req.session;
        const product = req.body;
        const {pid} = req.params;
        const updateProduct = await services.updateProduct(pid, product, role, email);
        if (updateProduct) return httpResponse.Ok(res, updateProduct);
        return httpResponse.NotFound(res, {msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { role, email, first_name } = req.session;
        const {pid} = req.params;
        const deleteProduct = await services.deleteProduct(pid, role, email, first_name);
        if (deleteProduct) return httpResponse.Ok(res, {msg: 'Product successfully removed'});
        return httpResponse.NotFound(res, {msg: 'Product not found'});
    } catch (error) {
        next(error);
    }
}

export const mockingProducts = async (req, res, next) => {
    try {
        const data = await services.mockingProducts();
        return httpResponse.Ok(res, data);
    } catch (error) {
        next(error);
    }
}