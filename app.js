import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoute.js"
import errroMiddelware from "./middleware/errorMiddlware.js";
const app = express();

//configure env
dotenv.config();

//databse config
connectDB();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/upload', express.static("upload/images"))


app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app9999</h1>");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use(errroMiddelware);

//PORT
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
    );
});