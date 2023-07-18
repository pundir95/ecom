import express from "express";
import { addTocart } from "../controllers/cartContoller.js";


//router object
const router = express.Router();

router.post("/add-cart/:id", addTocart);


export default router;