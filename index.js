const express = require("express");

const server = express();
server.use(express.json());

server.get("/health", (req, res) => {
    res.json({
        status: "Running"
    })
})

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

server.get("/products", (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        products: products
            .filter((product) => {
                return moreThan < product.price
        })
    })
})

server.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => {
        return product.id === id;
    });
    res.json({
        product
    })
})

server.post("/products", (req, res) => {
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

server.put("/products/:id", (req, res) => {
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

server.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    products = products.filter((product) => {
        return product.id !== id;
    })
    res.status(204).send();
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});