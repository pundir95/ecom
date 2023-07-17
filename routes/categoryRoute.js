import express from "express";
import { createCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
const router = express.Router();

//routes
// create category
router.post(
    "/create-category",
    isAuthenticated,
    isAdmin,
    createCategoryController
);
//getALl category
router.get("/get-category", isAuthenticated, isAdmin, getAllCategoryController);
router.put(
    "/update-category/:id",
    isAuthenticated,
    updateCategoryController
);

export default router;