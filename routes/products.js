const express = require("express");
const router = express.Router();

let products = [
    {
        id: 1,
        name: "ps4",
        price: 2500
    },
    {
        id: 2,
        name: "Nintendo switch",
        price: 2300
    },
    {
        id: 3,
        name: "xbox",
        price: 2500
    }
]

router.get("/products", (req, res) => {
    // http://localhost:8080/products?more_than=2500
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        products: products
            .filter((product) => {
                return moreThan < product.price
        })
    })
})

router.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => {
        return product.id === id;
    });
    res.json({
        product
    })
})

router.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    res.json({
        product: newProduct
    })
})

router.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => {
        return product.id === id;
    })
    if (!product) {
        return res.status(404).json({message: "Product not found"});
    }
    product.name = req.body.name;
    product.price = req.body.price;
    res.json({
        product
    })
})

router.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    products = products.filter((product) => {
        return product.id !== id;
    })
    res.status(204).send();
})

module.exports = {
    router
}