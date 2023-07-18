import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import { createProductController, deleteProductController, fetchProductWithCategory, getProductController, updateController, upload } from "../controllers/productController.js";
// import singleUpload from "../middleware/multer.js";

import multer from "multer";
import { updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

router.post(
    "/create-product",
    isAuthenticated,
    isAdmin,
    upload.single('photo'),
    createProductController
);

router.get(
    "/get-product",
    isAuthenticated,
    getProductController
);

//delete rproduct
router.delete("/delete-product/:id", isAuthenticated,
    isAdmin, deleteProductController);

//update product

router.put("/update-product/:id", isAuthenticated, isAdmin, upload.single('photo'), updateController);

router.get("/product-category/:catId", isAuthenticated, fetchProductWithCategory)

export default router;