const express = require("express");
const {
  saveProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  buyProductByUser,
} = require("../database/products");
const auth = require("../middleware/auth");
const z = require("zod");
const router = express.Router();

const ProductSchema = z.object({
  name: z.string({
    required_error: "Name must be required",
    invalid_type_error: "Name must be a string",
  }),
  price: z.number().min(0).default(0),
});

router.get("/products", auth, async (req, res) => {
  const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
  const products = await getAllProducts(moreThan);
  res.json({
    products,
  });
});

router.get("/products/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const product = await getProductById(id);
  res.json({
    product,
  });
});

router.post("/products", auth, async (req, res) => {
  try {
    const newProduct = ProductSchema.parse(req.body);
    const savedProduct = await saveProduct(newProduct);
    res.json({
      product: savedProduct,
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/products/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const product = ProductSchema.parse(req.body);
  const updatedProduct = await updateProduct(id, product);
  res.json({
    product: updatedProduct,
  });
});

router.delete("/products/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  await deleteProduct(id);
  res.status(204).send();
});

router.post("/products/buy", auth, async (req, res) => {
  const user = req.user;
  const productAndQuantity = req.body.products;
  for (let item of productAndQuantity) {
    await buyProductByUser(user.userId, item.id, item.quantity);
  }
  res.status(201).json({
    success: true,
  });
});

module.exports = {
  router,
};
