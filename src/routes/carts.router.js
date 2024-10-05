import { Router } from "express";
import * as controllers from '../controllers/carts.controllers.js';

const router = Router();

router.route('/')
    .post(controllers.addCart)
    .get(controllers.getCarts)

router.post('/product/:pid', controllers.addProductToCart);

router.route('/:cid')
    .get(controllers.getCartById)
    .put(controllers.updateCart)
    .delete(controllers.deleteCart)

router.route('/:cid/products/:pid')
    .delete(controllers.deleteProductToCart)
    .put(controllers.updateProductToCart)

export default router;