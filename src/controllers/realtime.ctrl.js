import ProductsManagerFS from "../persistence/daos/filesystem/manager/products.manager.js";
import { __dirname } from "../utils.js";

// const productsManager = new ProductsManagerFS(`${__dirname}/persistence/daos/filesystem/data/products.json`);

// export const postRealTimeProducts = (socketServer) => {
//     return async (req, res) => {
//         try {
//             const product = req.body;
//             const newProduct = await productsManager.addProduct(product);
//             socketServer.emit('newProduct', newProduct);
//             res.send('Producto enviado al socket del cliente');
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
//     }
// }

// export const deleteRealTimeProducts = (socketServer) => {
//     return async (req, res) => {
//         try {
//             const {pid} = req.params;
//             await productsManager.deleteProduct(parseInt(pid));
//             const products = await productsManager.getProducts();
//             socketServer.emit('deleteProduct', products);
//             res.send('Productos enviados al socket del cliente');
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
// }}