import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, require: true},
    image: { type: String},
    category: { type: String},
    description: { type: String},
    rate: { type: Number},
},{
    versionKey: false,
});
const Product = mongoose.model("Product", ProductSchema);

export default Product;