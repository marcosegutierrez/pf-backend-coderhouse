import { TicketModel } from "./models/ticket.model.js";

export default class TicketDaoMongo {

    async getAll() {
        try {
            return await TicketModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            return await TicketModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(obj) {
        try {
            return await TicketModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            return await TicketModel.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            return await TicketModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
};

