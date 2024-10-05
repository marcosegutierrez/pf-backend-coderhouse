import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 30
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        required: false
    },
    owner: {
        type: String,
        default: 'admin'
    }
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('products', ProductSchema);