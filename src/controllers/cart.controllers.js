import Controllers from "./class.controller.js";
import CartServices from "../services/cart.services.js";
const cartService = new CartServices();

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }

    async getCartById(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if (!cart) res.status(404).json({ msg: "Cart not found!" });
            else res.json(cart);
        } catch (error) {
            next(error.message);
        }
    };

    async updateCart(req, res, next) {
        try {
            const { cid } = req.params;
            const productsArray = req.body;
            const updatedCart = await cartService.updateCart(cid, productsArray);
            res.json(updatedCart);
        } catch (error) {
            next(error.message);
        }
    }


    async addProductToCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const newProdCart = await cartService.addProductToCart(cid, pid);
            res.json(newProdCart);
        } catch (error) {
            next(error.message);
        }
    }

    async updateQtyProductFromCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedQtyCart = await cartService.updateQtyProductFromCart(cid, pid, Number(quantity));
            res.json(updatedQtyCart);
        } catch (error) {
            next(error.message);
        }
    };

    async deleteProductFromCart(req, res, next) {
        try {
            const { cid } = req.params;
            const { pid } = req.params;
            const deleteProduct = await cartService.deleteProductFromCart(cid, pid);
            res.json(deleteProduct);
        } catch (error) {
            next(error.message);
        }
    }

    async deleteAllProductsFromCart(req, res, next) {
        try {
            const { cid } = req.params;
            const deleteAllProducts = await cartService.deleteAllProductFromCart(cid);
            res.json(deleteAllProducts);
        } catch (error) {
            next(error.message);
        }
    };

}

