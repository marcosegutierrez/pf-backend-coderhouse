import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import * as controllers from '../controllers/products.controllers.js';
import { checkRole } from "../middlewares/checkRole.js";

const router = Router();

router
    .get('/', controllers.getProducts)
    .post('/', [checkRole, productValidator], controllers.addProduct);

// Genera productos a traves de la librería Faker
router.get('/mockingproducts', controllers.mockingProducts);

router.route('/:pid')
    .get(controllers.getProductById)
    .put(checkRole, controllers.updateProduct)
    .delete(checkRole, controllers.deleteProduct);

export default router;