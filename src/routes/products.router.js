import { Router } from "express";
import {
  getProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdControler,
  updateProductControler,
  getProductsByCategoryController
} from "../controllers/products.controllers.js";
import upLoader from '../helpers/storageImg.js';

const router = new Router();

router.get("/",getProductsController);

router.post("/", upLoader.single('thumbnail') ,postProductsController);

router.get("/:pid", getProductByIdController);

router.delete("/:pid", deleteProductByIdControler);

router.put("/:pid", upLoader.single('thumbnail'), updateProductControler);

router.get('/categorys/:cat', getProductsByCategoryController);


export default router;
