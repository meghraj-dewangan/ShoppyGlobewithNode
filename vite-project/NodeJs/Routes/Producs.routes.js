import express from "express";
import { fetchallProducts, addProduct, logIn, register, fetchProductById, addProductToCart, removeProductFromCart, fetchCart, getUsernameByEmail, updateProduct, deleteProduct, updateCartItemQuantityPlus, updateCartItemQuantityMinus, clear } from "../Controller/Products.controller.js";
import { authenticateToken } from "../Server.js";

const router = express.Router();

// Set router for products
router.get("/products", fetchallProducts);
router.get("/products/:id", fetchProductById);
router.post("/product", addProduct);
router.put("/product/:id", updateProduct);  
router.delete("/product/:id", deleteProduct);

// router for register and login
router.post("/register", register);
router.post("/login", logIn);

router.get('/getusernamebyemail', getUsernameByEmail);

// Set router for Cart
router.get("/cartsc", authenticateToken, fetchCart); // fetch product in cart from mongoDB
router.post("/cartadd", authenticateToken,addProductToCart); // add cartproduct to mongoDB from
router.put("/cartInc/:id", authenticateToken, updateCartItemQuantityPlus);    // increse no.of product in cart
router.put("/cartDec/:id", authenticateToken, updateCartItemQuantityMinus);  // decrese no.of product in cart
router.delete("/cartdel/:id", authenticateToken, removeProductFromCart);   //delete cart product by id
router.delete("/cartClr", authenticateToken, clear);  //clear cart all product

export default router;
