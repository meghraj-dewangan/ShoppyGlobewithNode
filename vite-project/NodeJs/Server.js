import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { Product, User, CartSc } from "./Model/Schema.mjs";
import { saveProduct } from "./Controller/SaveToMongodb.js";
 import cors from 'cors'
import router from "./Routes/Producs.routes.js";



export const app = new express();


//Middleware to parse JSON bodies

app.use(express.json());
 app.use(cors({origin: '*'}));


// to connect mongodb compass

mongoose.connect("mongodb://localhost:27017/ShoppyGlobeApi");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Database connection is Succesfull")
});

db.on("error", () => {
    console.log("Database Connection is not Succesfull")
});


//Middleware for authenticating JWT token

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Get the authorization header
    
    if (!authHeader) return res.status(403).json({ message: "Token is required" });

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, 'SecretKey', (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user; // Attach user info from the decoded token to req object
        next();
    });
}




// set routes

app.use("/api",router); // for product and cart related routes













app.listen(3600, () => {
    console.log("Server is running on port 3600");
});
