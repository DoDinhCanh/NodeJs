import express from "express";
import ProductController from "../controllers/products.js";
import { CheckPermission } from "../middlewaves/CheckPermission.js";
const productRouter = express.Router();

const productController = new ProductController();
productRouter.get("/", productController.getAllProduct);
productRouter.get("/:id", productController.getProductDetail);
productRouter.post("/", CheckPermission, productController.creatProduct);
productRouter.put("/:id", CheckPermission, productController.updateProduct);
productRouter.delete("/:id", CheckPermission, productController.deleteProduct);

export default productRouter;
