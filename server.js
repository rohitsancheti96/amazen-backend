const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

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
