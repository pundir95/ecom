import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    allcart: [
        {
            type: mongoose.ObjectId,
            ref: "Products",
        },
    ],

    qnty: {
        type: Number,
    },
    total: {
        type: Number
    }

})

export default mongoose.model("Cart", cartSchema)