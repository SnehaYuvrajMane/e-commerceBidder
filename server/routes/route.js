import { authUser,registerUser } from "../controllers/userController.js";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/productController.js";
import { getBids,getBidsByProductId,getBidsByUserId,getBidsByUserIdAndProductId,createBid,updateBid,deleteBid } from "../controllers/bidController.js";
import express from "express";
const router = express.Router();

router.post("/users/login", authUser);
router.post("/users", registerUser);

router.route("/products").get(getProducts).post(createProduct).put(updateProduct).delete(deleteProduct);
router.route("/products/:id").get(getProductById);

router.route("/bids").get(getBids).post(createBid).put(updateBid).delete(deleteBid);
router.route("/bids/:id").get(getBidsByProductId);
router.route("/bids/users/:id").get(getBidsByUserId);
router.route("/bids/users/:userId/products/:productId").get(getBidsByUserIdAndProductId);

export default router;