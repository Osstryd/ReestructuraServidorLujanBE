import Services from "./class.services.js";
import ProductDaoMongo from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongo();


export default class ProductServices extends Services {
    constructor() {
        super(prodDao);
    }

    async getProducts(queryParams) {
        try {
            const response = await prodDao.getProducts(queryParams);
            if (!response) return false;
            else return response
        } catch (error) {
            console.log(error);
        }
    }

}

