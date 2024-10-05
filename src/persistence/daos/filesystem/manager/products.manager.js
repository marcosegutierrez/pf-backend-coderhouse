import fs from 'fs';
import { logger } from '../../../../utils/logger.js';

export default class ProductsManagerFS {
    constructor(path) {
        this.path = path;
        this.#productManagerGenerator();
    }

    async #productManagerGenerator() {
        if (!fs.existsSync(this.path)) {
            let products = [];
            fs.promises.writeFile(this.path, JSON.stringify(products));
        }
    }

    async #idGenerator() {
        let products = await this.getProducts();
        let max = 0;
        if (products) {
            products.forEach((p) => {
                if (p.id > max) max = p.id;
            });
        }
        return max;
    }

    async addProduct(obj) {
        const { title, description, code, price, status, stock, category, thumbnails } = obj;
        const product = {
            id: await this.#idGenerator() + 1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || []
        };
        let products = await this.getProducts();
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return product;
    }

    async getProducts() {
        let products = await fs.promises.readFile(this.path, 'utf-8');
        if (products) return JSON.parse(products);
        else return [];
    }

    async getProductById(id) {
        let products = await this.getProducts();
        let productFound = products.find(p => p.id === parseInt(id));
        if (productFound) return productFound;
        else return null;
    }

    async updateProduct(id, obj) {
        let products = await this.getProducts();
        let product = await this.getProductById(id);
        if (product) {
            let newProducts = products.filter((product) => product.id !== parseInt(id));
            const newProduct = {
                ...product,
                ...obj,
                id: product.id
            };
            newProducts.push(newProduct);
            newProducts.sort((a, b) => a.id - b.id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
            return newProduct;
        } else return null;
    }

    async deleteProduct(id) {
        try {
            let product = await this.getProductById(parseInt(id));
            if (product) {
                let products = await this.getProducts();
                let newProducts = products.filter((product) => product.id != parseInt(id));
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                return product;
            } else return null;
        } catch (error) {
            logger.error(error);
        }
    }
}