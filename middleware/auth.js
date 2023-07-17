
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next("Authentication Failed");
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.Id = payload._id
        next()
    } catch (error) {
        next("Auth Failed")
    }

}


//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        let userData = await userModel.findById(req.Id)
        if (userData.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};


