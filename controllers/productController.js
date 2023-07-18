import productModel from "../models/productModel.js";
import fs from "fs";
import multer from "multer";
import slugify from "slugify";
import path from "path"

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    console.log(file)
    let sp = file.originalname.split('.')[0]
    return cb(
      null,
      `${sp}_${Date.now()}${path.extname(file.originalname)}`
    )
  }
});

// Create the Multer upload instance
export const upload = multer({ storage });

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;

    let photo = req.file

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "image is Required and should be less then 1mb" });

    }

    let data = {
      name, description, price, category, quantity,
      photo: `upload/${req.file.filename}`,
      slug: slugify(name)
    }

    const products = new productModel(data);
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });

  }


}



export const getProductController = async (req, res, next) => {
  try {

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // let products = await productModel.find().skip(skip).limit(limit);

    const pipeline = [
      // Pagination stage
      { $skip: skip },
      { $limit: limit }
    ];
    const products = await productModel.aggregate(pipeline);

    //jobs count
    const totalJobs = await productModel.countDocuments();
    const numOfPage = Math.ceil(totalJobs / limit);

    res.status(200).send({
      success: true,
      totalJobs,
      numOfPage,
      products
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }

}


export const deleteProductController = async (req, res, next) => {
  try {
    const oldProduct = await productModel.findOne({ _id: req.params.id });
    fs.unlink('./upload/images/' + oldProduct.photo, function (err) {
      if (err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });
    await productModel.findByIdAndDelete(req.params.id)
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
}



export const updateController = async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;

    let photo = req.file

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "image is Required and should be less then 1mb" });

    }

    let data = {
      name, description, price, category, quantity,
      photo: `upload/${req.file.filename}`,
      slug: slugify(name)
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );
    await updatedProduct.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      updatedProduct,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });

  }

}

export const fetchProductWithCategory = async (req, res, next) => {
  try {
    let id = req.params.catId;
    let product = await productModel.find({ category: id });
    res.status(200).send({
      success: true,
      message: "Product Successfully",
      product
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in  product",
    });
  }

}


