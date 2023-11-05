import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
