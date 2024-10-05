import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TicketSchema = new Schema({
    code: {
        type: String,
        default: uuidv4()
    },
    purchase_datetime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

export const TicketModel = model('ticket', TicketSchema);