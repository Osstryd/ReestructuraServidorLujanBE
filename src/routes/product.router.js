import { Router } from "express";
import ProductController from '../controllers/product.controllers.js'
import { productValidator } from "../middlewares/productValidator.js";

const controller = new ProductController()

const router = Router()

// rutas

router
    .get('/', controller.getProducts)
    .get('/:id', controller.getById)
    .post('/', productValidator, controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router