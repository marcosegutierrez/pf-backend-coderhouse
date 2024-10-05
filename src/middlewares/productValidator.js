import { __dirname } from "../utils.js";
// import ProductsManager from "../persistence/daos/filesystem/manager/products.manager.js";
// const productsManager = new ProductsManager(`${__dirname}/persistence/daos/filesystem/data/products.json`);
import ProductsManagerMongo from '../persistence/daos/mongodb/products.manager.js'
const productsManager = new ProductsManagerMongo();

export const productValidator = async (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;
    let objProducts = await productsManager.getProducts();
    let products = objProducts.docs
    if (!title || !description || !code || !price || !stock || !category) 
        res.status(404).json({msg: 'Product with missing fields'});
    else if (products.find(p => p.code === code))
        res.status(404).json({msg: 'Product with existing code'});
    else next();
}