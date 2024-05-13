import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';

const controller = new CartController()

const router = Router()

// rutas

router.get('/', controller.getAll)

router.post('/', controller.create);

router.get('/:cid', controller.getCartById);

router.put('/:cid', controller.updateCart);

router.put('/:cid/products/:pid', controller.updateQtyProductFromCart);

router.post('/add/:cid/:pid', controller.addProductToCart);

router.delete('/:cid/products/:pid', controller.deleteProductFromCart);

router.delete('/:cid', controller.deleteAllProductsFromCart);

export default router