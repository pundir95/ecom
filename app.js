import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import errroMiddelware from "./middleware/errorMiddlware.js";
const app = express();

//configure env
dotenv.config();

//databse config
connectDB();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use(errroMiddelware);

//PORT
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
    );
});