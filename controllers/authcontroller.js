import userModel from "../models/userModel.js";
export const registerController = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        // if (!answer) {
        //     return next("answer is required")
        // }
        //check user 
        const existinguser = await userModel.findOne({ email });
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password
        })
        await user.save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }

}

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        //compare password

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next("invalid Username and Password")
        }
        user.password = undefined;
        //token
        const token = user.getJWTToken();
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};