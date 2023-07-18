import categoryModal from "../models/categoryModal.js";
import slugify from "slugify";

export const createCategoryController = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return next("name is required")
        }

        const exisistingCategory = await categoryModal.findOne({ name });
        if (exisistingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category Already Exisits",
            });
        }

        const category = await new categoryModal({
            name,
            slug: slugify(name),
        })

        await category.save();

        res.status(201).send({
            success: true,
            message: "new category created",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            errror,
            message: "Error in Category",
        });
    }

}


//getALL category

export const getAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });

    }
}



