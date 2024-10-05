import CartsManagerFS from "./filesystem/manager/carts.manager.js";
import ProductsManagerFS from "./filesystem/manager/products.manager.js";
import CartsManagerMongo from "./mongodb/carts.manager.js";
import ProductsManagerMongo from "./mongodb/products.manager.js";
import {__dirname} from '../../utils.js';
import { logger } from "../../utils/logger.js";

let cartDao = null;
let prodDao = null;

let persistence = process.argv[2];

switch (persistence) {
    case 'fs': // persistence filesystem no funcional para deploy web
        logger.debug("Persistence: ", persistence);
        // prodDao = new ProductsManagerFS(`${__dirname}/persistence/daos/filesystem/data/products.json`);
        // cartDao = new CartsManagerFS(`${__dirname}/persistence/daos/filesystem/data/carts.json`);
        break;
    case 'mongo':
        logger.debug("Persistence: ", persistence);
        prodDao = new ProductsManagerMongo();
        cartDao = new CartsManagerMongo();
        break;
    default:
        logger.debug('Persistence: default');
        prodDao = new ProductsManagerMongo();
        cartDao = new CartsManagerMongo();
        break;
}

export default {cartDao, prodDao};