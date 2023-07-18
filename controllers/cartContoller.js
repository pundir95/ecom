import cartModal from "../models/cartModal.js";
import productModel from "../models/productModel.js";

export const addTocart = async (req, res, next) => {

    try {
        let id = req.param.id;
        let data = productModel.findById(req.param.id)
        data.cart.push(id)
        data.save()
        console.log(product)
    } catch (error) {

    }

}