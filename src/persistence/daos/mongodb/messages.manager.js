import { MessageModel } from "./models/messages.model.js";

export default class MessageManagerMongo {
    constructor(path) {
        this.path = path;
    }

    async createMsg(obj) {
        try {
            const msg = {
                user: obj.username,
                message: obj.message
            };
            await MessageModel.create(msg);
            return msg;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            return MessageModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        const msg = await MessageModel.findById(id);
        if (msg) {
            return msg
        }
        return false;
    }
}