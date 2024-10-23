import { ProductModel } from "./models/product.model.js";

export default class ProductsManagerMongo {

    async addProduct(obj, role, email) {
        let owner = 'admin';
        if (role === 'premium') {
            owner = email; // Se establece como owner el mail del usuario premium
        }
        const product = await ProductModel.create({owner, ...obj});
        return product;
    }

    async getProducts(page = 1, limit = 10, query, sort) {
        try {
            const filter = query ? { 'query': query } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const products = await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
            if (products) return products;
            else return [];
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {
        try {
            let product = await ProductModel.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, obj, role, email = null) {
       try {
            const productToUpdate = await ProductModel.findById(id);
            if (!productToUpdate) return null;
            let product = null;
            if (role === "premium" && productToUpdate.owner === email) {
                product = await ProductModel.findByIdAndUpdate(id, obj, {new: true});
            } else if (role === 'admin') {
                product = await ProductModel.findByIdAndUpdate(id, obj, {new: true});
            }
            return product;
       } catch (error) {
            throw new Error(error);
       }
    }

    async deleteProduct(id, role, email) {
        try {
            if (id.length != 24) return null;
            const productToDelete = await ProductModel.findById(id);
            if (!productToDelete) return null;
            let product = null;
            if (role === "premium" && productToDelete.owner === email) {
                product = await ProductModel.findByIdAndDelete(id);
            } else if (role === 'admin') {
                product = await ProductModel.findByIdAndDelete(id);
            }
            return product;
        } catch (error) {
            throw new Error(error)
        }
    }
}