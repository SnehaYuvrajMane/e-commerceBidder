import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    user_id: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    bid_price: { type: Number, required: true },

},{
    timestamps:true
});

const bidModel = mongoose.model("Bid", bidSchema);

export default bidModel;