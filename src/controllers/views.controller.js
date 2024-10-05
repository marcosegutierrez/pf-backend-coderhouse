import ProductsManagerFS from "../persistence/daos/filesystem/manager/products.manager.js";
import { __dirname } from "../utils.js";
import { HttpResponse } from "../utils/http.response.js";

// const productsManager = new ProductsManagerFS(`${__dirname}/persistence/daos/filesystem/data/products.json`);
const httpResponse = new HttpResponse();

export const viewLogin = async (req, res, next) => {
    try {
        if (req.session.email) {
            res.redirect('/api/products')
        } else res.render('login');
    } catch (error) {
        next(error);
    }
}

export const viewRegister = (req, res, next) => {
    try {
        res.render('register');   
    } catch (error) {
        next(error);
    }
}

export const viewProfile = (req, res, next) => {
    try {
        res.render('profile');
    } catch (error) {
        next(error);
    }
}

// export const realTimeProducts = async (req, res, next) => {
//     try {
//         const products = await productsManager.getProducts();
//         res.render('realTimeProducts', { products });
//     } catch (error) {
//         next(error);
//     }
// }

export const viewChat = (req, res, next) => {
    try {
        if(req.session.role != 'user') {
            return httpResponse.Unauthorized(res, {msg: "Este endpoint es solo para usuarios"});
        } else res.render('chat')
    } catch (error) {
        next(error);
    }
}

export const viewUpdatePass = (req, res, next) => {
    try {
        res.render('updatepass');   
    } catch (error) {
        next(error);
    }
}