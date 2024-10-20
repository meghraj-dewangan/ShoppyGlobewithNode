import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import UseFetch from "./UseFetch"; // Make sure this fetches based on the URL
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { addItem } from "./Utils/CartSlice";
import { jwtDecode } from "jwt-decode";


function ProductDetail() {
    const { id } = useParams(); // Get the product ID from the URL
    const url = `http://localhost:3600/api/products/${id}`; // Fetch product detail based on ID
    const { data : newData, loading, error } = UseFetch(url);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem("authToken");
    const [userId, setUserId ] = useState('');
    const [addTo , setAddTo ] = useState('');
    
    useEffect(()=>{
        if(token){
        const decodedToken = jwtDecode(token);
        console.log('first',decodedToken);
        const userIdDecoded = decodedToken._id;
        setUserId(userIdDecoded);
        console.log('last',userIdDecoded);
    }
    },[token])
   
    
    useEffect(()=>{
        if(newData && newData.image && newData.image.length > 0 ){
            setImages(newData.image.length > 1 ? newData.image[1]: newData.image[0]);
        }
    },[newData]);
   

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    // Check if product is found
    if (!newData) {
        return <div>Product not found.</div>;
    }

    const handleAddToCart = async () => {
       
        const productToAdd = {
            userId: userId,
            productId:newData._id,
            quantity:quantity,
            title:newData.title,
            price: newData.price,
            stockQuantity: newData.stockQuantity, // Use the field from Product schema
            brand: newData.brand,
            deliveryBy: newData.deliveryBy,
            discount:newData.discount,
            image: newData.image,
        };

        // Dispatch the action to add the item to the Redux store
        dispatch(addItem(productToAdd));

        // API call to add the product to MongoDB cart
        if (token) {
            
            try {
                const response = await fetch("http://localhost:3600/api/cartadd", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Use the token from localStorage
                    },
                    body: JSON.stringify(
                        {
                            userId: userId,
                            productId:newData._id,
                            quantity: 1,
                            title:newData.title,
                            price: newData.price,
                            stockQuantity: newData.stockQuantity, 
                            brand: newData.brand,
                            deliveryBy: newData.deliveryBy,
                            image: newData.image,
                            discount:newData.discount
                        }
                    )

                });
                const result = await response.json();
                
                if(response.ok){
                    
                    console.log(result.message); 
                    setAddTo(result);

                } else {
                    if (response.status === 403) {
                        console.error('403 Forbidden: You may need to log in again.');
                    }
                    throw new Error('Failed to add product to cart in MongoDB');
                }
               
            } catch (error) {
                console.error("Error adding to cart:", error.message);
            }
        }
    };
    
    return (
        <div className="flex flex-col justify-center items-center bg-orange-200 mb-10 font-serif text-sm">
            <div className="p-1 pb-6 bg-gradient-to-r h-auto rounded-3xl mb-10 from-orange-200 to-white mt-10 w-full lg:w-3/4">
               
                <img src={images} alt="Product Detail" className="bg-gradient-to-r from-gray-300 to-white w-full rounded-3xl" />
            
                <div className="mt-3 py-3 pb-7 rounded-3xl lg:text-base px-2 lg:py-10 lg:border-solid lg:border-2">
                    <h1 className="text-2xl font-bold mb-3">{newData.title}</h1>
                    <span className="mr-3 sm:block"><span className="font-extrabold">Category:</span> {newData.category}</span>
                    <span><span className="font-extrabold">Brand:</span> {newData.brand}</span>
                    <span className="block text-yellow-600"><span className="font-extrabold">Rating:</span> {newData.rating} <FontAwesomeIcon icon={faStar} className="text-yellow-600" /></span>
                    <span className="mr-5 block text-green-600"><span className="font-extrabold">Price:</span> ${newData.price}</span>
                    <span className="text-red-400 sm:block block"><span className="font-extrabold">Left:</span> {newData.stockQuantity}</span>
                    <span className="block mt-4"><span className="font-bold">Description:</span> {newData.description}</span>
                </div>
                <div className="flex justify-center lg:mt-7">
                    <button className="hover:scale-110 mr-8 shadow-lg shadow-orange active:scale-95 bg-orange-300 px-2 py-1 rounded-lg text-black" onClick={handleAddToCart}>Add to Cart</button>
                    <Link to="/cart">
                        <button className="hover:scale-110 mr-8 shadow-lg shadow-orange active:scale-95 bg-orange-300 px-2 py-1 rounded-lg text-black">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
