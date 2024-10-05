import CartsManagerMongo from "./carts.manager.js";
const cartDao = new CartsManagerMongo();

export default class UserManager {
    constructor(model) {
        this.model = model;
    }

    async register(user) {
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email });
            if (!existUser) {
                const cartUser = await cartDao.addCart();
                return await this.model.create({
                    ...user,
                    cart: cartUser._id,
                })
            }
            else return null;
        } catch (error) {
            throw new Error(error)
        }
    };

    async login(email, password) {
        try {
            return await this.model.findOne({ email, password });
        } catch (error) {
            throw new Error(error)
        }
    };

    async getUser(email) {
        try {
            return await this.model.findOne({ email }).populate("cart");
        } catch (error) {
            throw new Error(error)
        }
    };

    async getUserById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error)
        }
    };

    async update(id, obj) {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUsers() {
        try {
            let users = await this.model.find({});
            if (users) return users;
            else return [];
        } catch (error) {
            throw new Error(error);
        }
    }

}