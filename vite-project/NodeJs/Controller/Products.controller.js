import { Product, CartSc, User } from "../Model/Schema.mjs";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

// Fetch all products
export async function fetchallProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Fetch a single product by ID
export async function fetchProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Add a new product
export async function addProduct(req, res) {
    try {
        const { title, price, description, image, thumbnail, stockQuantity, category, brand, rating, discount, deliveryBy } = req.body;

        const addNewProduct = await Product.create({ title, price, description, image, thumbnail, stockQuantity, discount, deliveryBy, category, brand, rating });
        res.status(201).json({ message: "Product added", item: addNewProduct });
    } catch (err) {
        res.status(500).json({ message: "Failed to add product" });
    }
}

// Update product
export async function updateProduct(req, res) {
    const { id } = req.params;
    const { title, price, description, image, thumbnail, stockQuantity, category, brand, rating } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            title,
            price,
            description,
            stockQuantity,
            category,
            brand,
            image,
            thumbnail,
            rating
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", item: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
    }
}

// Delete a product
export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
}

// Register User
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User Registered Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Log in user
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ _id: user._id }, "SecretKey", { expiresIn: '30m' });

        return res.status(200).json({ token, username: user.username, email: user.email });
    } catch (err) {
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Controller to get username by email
export const getUsernameByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Fetch user's cart
export const fetchCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cartItems = await CartSc.find({ userId }).populate('productId', 'title price brand discount deliveryBy quantity image');
        res.status(200).json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Add product to cart
export async function addProductToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await CartSc.findOne({ userId, productId });
        if (cart) {
            cart.quantity += quantity;
        } else {
            cart = new CartSc({
                userId,
                productId,
                quantity,
                title: product.title,
                price: product.price,
                stockQuantity: product.stockQuantity,
                brand: product.brand,
                deliveryBy: product.deliveryBy,
                image: product.image,
                discount: product.discount
            });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "Failed to add product to cart" });
    }
}

// Update product quantity in the cart
export async function updateCartItemQuantityPlus(req, res) {

    const productId = req.params.id;

    try {
        const cart = await CartSc.findById(productId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.quantity += 1;
        ;
        await cart.save();
        res.status(200).json({ cart: cart, message: "Cart updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart" });
    }
}

// Update product quantity in the cart
export async function updateCartItemQuantityMinus(req, res) {

    const productId = req.params.id;

    try {
        const cart = await CartSc.findById(productId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (cart.quantity > 1) {
            cart.quantity -= 1;
            await cart.save();
            res.status(200).json({ cart: cart, message: "Cart updated" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart" });
    }
}

// Remove product from cart
export async function removeProductFromCart(req, res) {
   
    const productId = req.params.id;

    try {
        const cart = await CartSc.findByIdAndDelete(productId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove product from cart" });
    }
}



// clear cart 
export async function clear(req, res) {
    const userId = req.user._id;

    try {
        const cart = await CartSc.deleteMany({userId});
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove product from cart" });
    }
};
