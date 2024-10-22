import express from "express";
import mongoose from "mongoose";

// Product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //  title is required
    },
    price: {
        type: Number,
        required: true //  price is required
    },
    image: {
        type: [String] 
    },
    thumbnail: {
        type: String
    },
    description: {
        type: String,
        required: true //  description is required
    },
    stockQuantity: {
        type: Number,
        required: true // stock quantity is required
    },
    category: {
        type: String,
        required: true //  category is required
    },
    brand: {
        type: String,
       // required: true //  brand is required
    },
    rating: {
        type: Number,
        min: 0, // Added minimum rating constraint
        max: 5  // Added maximum rating constraint
    },
    discount: {
        type: Number,
        min: 0 //  discount cannot be negative
    },
    deliveryBy: {
        type: String
    }
});

// Model for product schema
export const Product = mongoose.model("Product", productSchema);

// Cart schema
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, required: true }
});

// Model for cart schema
export const CartSc = mongoose.model("CartSc", cartSchema);

// User schema for registration and authentication
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Username is required
        trim: true       // Remove extra spaces
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,  // Password is required
        minlength: 6     
    }
});

// Model for user schema
export const User = mongoose.model('User', userSchema);
