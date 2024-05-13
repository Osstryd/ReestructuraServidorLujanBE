import Services from "./class.services.js";
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const cartDao = new CartDaoMongoDB();
const productDao = new ProductDaoMongoDB();

export default class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    async getCartById(cid) {
        try {
            const item = await cartDao.getCartById(cid);
            if (!item) return false;
            else return item;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(cid, productsArray) {
        try {
            const updatedCart = await cartDao.updateCart(cid, productsArray);
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartDao.getCartById(cid);
            const product = await productDao.getProductById(pid);

            if (!product) throw new Error("Product not found");
            if (!cart) throw new Error("Cart not found");

            const newProdCart = await cartDao.addProductToCart(cid, pid);
            return newProdCart;
        } catch (error) {
            console.log(error);
        }
    }

    async updateQtyProductFromCart(cid, pid, quantity) {
        try {
            const updatedQty = await cartDao.updateQtyProductInCart(cid, pid, quantity);
            return updatedQty;
        } catch (error) {
            throw error;
        }
    };


    async deleteProductFromCart(cid, pid) {
        try {
            const deleteProdCart = await cartDao.deleteProductFromCart(cid, pid);
            return deleteProdCart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProductFromCart(cid) {
        try {
            const deleteAllProdCart = await cartDao.deleteAllProductsFromCart(cid);
            return deleteAllProdCart;
        } catch (error) {
            console.log(error);
        }
    }
}




