const express = require("express");
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require("../util");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});

    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found." });
    }
});

router.post("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate(productId, {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.count,
        description: req.body.description,
    });
    if (updatedProduct) {
        return res
            .status(200)
            .send({ message: "Product Updated", data: updatedProduct });
    }

    return res.status(500).send({ message: " Error in Updating Product." });
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res
            .status(201)
            .send({ message: "New Product is created", data: newProduct });
    } else {
        return res.status(500).send({ message: "Error in creating Product." });
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: "Product Deleted" });
    } else {
        res.send("Error in Deletion.");
    }
});

module.exports = router;
