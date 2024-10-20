import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCart } from "./Utils/CartSlice";
import CartItem from "./CartItem";
import Signup from "./SignUp";
import { useUserAuth } from "./UserContext";

function Cart() {
  const{authenticated} = useUserAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
 
  

   // Clear item from the cart
   async function handleClearCart() {
    try {
      const response = await fetch(`http://localhost:3600/api/cartClr`, {
        method: 'DELETE',
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        console.log('remove successfull');
        dispatch(clearCart());
        fetchCartData();

      } else {
        console.log('error in Clear');
      }
    } catch(error){
      console.log('error', error.message);
    };
  };


  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:3600/api/cartsc', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}` // Pass the JWT token
        }
      })
      const cartData = await response.json();
      if (response.ok) {
        dispatch(setCart(cartData));     // update the Redux state of the cart with the data fetched from mongoDb
        setData(cartData);
        console.log('cartData successfull');
      }


    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  useEffect(()=>{
    fetchCartData();
  },[]);


  return (
    <>
      {!authenticated ? (
        <Signup/>
      ) : (
        <div className="min-h-screen flex flex-col justify-between font-serif">
          <div className="cart-container font-serif flex-grow">
            {data.length > 0 ? (
              <>
                {data.map((item) => (
                  <CartItem key={ item._id } item={item} fetchCartData={fetchCartData}  />
                ))}
                <button onClick={handleClearCart} className="mt-4 px-4 py-2 bg-red-500 ml-8 text-white rounded-lg hover:bg-red-600">
                  Clear Cart
                </button>
              </>
            ) : (
              <p className="text-orange-400 text-lg text-center font-extrabold">
                Your cart is empty.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
