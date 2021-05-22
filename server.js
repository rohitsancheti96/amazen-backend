import express from "express";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

var port = process.env.PORT || 5000;

const mongodbUrl = config.MONGODB_URL;

mongoose
    .connect(
        mongodbUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log("MongoDB connected")
    )
    .catch((error) => console.log(error.reason));

app.listen(port, () => {
    console.log(`Server running at Port: ${port}`);
});
