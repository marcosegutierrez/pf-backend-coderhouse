import fs from 'fs';
import { __dirname } from '../../../../utils.js';
import ProductsManagerFS from './products.manager.js';

// const productsManager = new ProductsManagerFS(`${__dirname}/persistence/daos/filesystem/data/products.json`);
const productsManager = null;

export default class CartsManagerFS {
    
    constructor (path) {
        this.path = path;
        this.#cartManagerGenerator();
    }

    async #cartManagerGenerator() {
        if(!fs.existsSync(this.path)) {
            let carts = [];
            fs.promises.writeFile(this.path, JSON.stringify(carts));
        }
    }

    async #idGenerator() {
        let carts = await this.getCarts()
        let max = 0;
        if (carts) {
            carts.forEach((p) => { 
                if (p.id > max) max = p.id;
            });
        }
        return max;
    }

    async addCart () {
        const cart = {
            id: await this.#idGenerator()+1,
            products: []
        }
        let carts = await this.getCarts();
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return cart;
    }

    async getCarts() {
        let carts = await fs.promises.readFile(this.path, 'utf-8');
        if (carts) return JSON.parse(carts);
        else return [];
    }

    async getCartById(id) {
        let carts = await this.getCarts();
        let cartFound = carts.find(c => c.id === parseInt(id));
        if (cartFound) return cartFound;
        else return null;
    }

    async addProductToCart(idProduct, idCart) {
        const cart = await this.getCartById(parseInt(idCart));
        if(!cart) return null;
        const productExist = await productsManager.getProductById(parseInt(idProduct));
        if(productExist){
            const productExistInCart = cart.products.find(p => p.id === parseInt(idProduct))
            if (productExistInCart) {
                productExistInCart.quantity++;
            } else {
                const product = {
                    id: idProduct,
                    quantity: 1
                }
                cart.products.push(product)
            }
            const carts = await this.getCarts()
            const newCarts = carts.map(c => {
                if(c.id === parseInt(idCart)) {
                    return cart;
                }
                return c
            })
            fs.promises.writeFile(this.path, JSON.stringify(newCarts));
            return cart;
        }
        return null;
    }

}