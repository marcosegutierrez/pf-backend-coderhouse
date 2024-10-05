import { model, Schema } from "mongoose";

export const messageCollectionName = 'message';

const MessageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export const MessageModel = model(messageCollectionName, MessageSchema);