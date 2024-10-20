import { Product } from "../Model/Schema.mjs";
import fetch from 'node-fetch';
import express from "express";





// Save products fetched from external API into MongoDB 

const app = new express();
app.use(express.json());

export async function saveProduct(req,res){

    try{
        // Fetch data from the dummyjson API

        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            return res.status(500).json({message:'Failed to fetch data from external API'})
        }

        const data = await response.json();
        const products = data.products;

        // map api data to mongodb schema structure

        const formattedProducts = products.map(product => ({
            title: product.title,
            price: product.price,
            description: product.description,
            stockQuantity: product.stock,  
            category: product.category,
            brand: product.brand,
            rating: product.rating,
            image: product.images,
            thumbnail:product.thumbnail,
            discount:product.discountPercentage,
            deliveryBy:product.shippingInformation,

        }));


        let savedProducts=[];

        for(let productData of formattedProducts){
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();
            savedProducts.push(savedProduct);
        }

        res.status(201).json({message:'Products saved Successfully',savedProducts})


    } catch(err){
        return res.status(500).json({message:"error occurred while fetching data",error:err.message})
    }


}