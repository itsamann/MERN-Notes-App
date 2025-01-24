import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Get a product
router.get("/", getProduct);

// Create a product
router.post("/", createProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
