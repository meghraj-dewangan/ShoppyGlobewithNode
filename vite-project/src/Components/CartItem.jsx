import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addItem, removeItem } from './Utils/CartSlice';

function CartItem({ item , fetchCartData}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [totalAmount, setTotalAmount] = useState(item.productId.price * quantity);
  const token = localStorage.getItem("authToken");

  // Update total amount when quantity changes
  useEffect(() => {
    setTotalAmount(item.productId.price * quantity);
  }, [quantity, item.productId.price]);


  // Increment quantity and update store with mongoDb
  async function handleIncrement() {
    try {
      const response = await fetch(`http://localhost:3600/api/cartInc/${item._id}`, {
        method: 'PUT',
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      const result = await response.json();

      if (response.ok) {
        console.log('increment successfull');
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(addItem({ ...item.quantity, quantity: newQuantity }));

      } else {
        console.log('error in increment');
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  // Decrement quantity and update store with mongoDb
  async function handleDecrement() {
    try {
      const response = await fetch(`http://localhost:3600/api/cartDec/${item._id}`, {
        method: 'PUT',
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      const result = await response.json();

      if (response.ok && quantity > 1) {
        console.log('decrement successfull');
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        dispatch(addItem({ ...props.cartProduct, quantity: newQuantity }));

      } else {
        console.log('error in decrement');
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };


  // Remove item from the cart with mongoDb
  async function handleRemove() {
    try {
      const response = await fetch(`http://localhost:3600/api/cartdel/${item._id}`, {
        method: 'DELETE',
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      const result = await response.json();

      if (response.ok) {
        console.log('remove successfull');
        dispatch(removeItem(item.productId._id));
        fetchCartData();

      } else {
        console.log('error in removing');
      }
    } catch(error){
      console.log('error', error.message);
    };
  };


  return (
    <>
      <div className="font-serif text-sm sm:flex sm:justify-center w-full">
        <div className="flex mt-2 py-3 bg-gradient-to-r from-slate-200 to-white sm:shadow-md sm:w-1/2 sm:mt-3 sm:mb-8">
          <div className="p-2 mr-2">
            {item.productId.image && item.productId.image.length > 0 ? (
              <img
                src={item.productId.image[0]}
                alt="Product"
                className="bg-gradient-to-r from-gray-100 to-white w-24 rounded-3xl"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="pr-2 lg:ml-11">
            <div className="lg:flex">
              <div>
                <h1 className="font-extrabold">{item.productId.title}</h1>
                <span className="block">
                  <span className="font-extrabold text-red-400">Brand:</span> {item.productId.brand}
                </span>
                <span className="mr-5 block text-green-600">
                  <span className="font-extrabold">Price:</span> ${item.productId.price}
                </span>
                <span className="mr-5 block text-green-600">
                  <span className="font-extrabold">Discount:</span> {item.productId.discount}%
                </span>
                <span className="mr-5 block text-green-600">
                  <span className="font-extrabold">Delivery by:</span> {item.productId.deliveryBy}
                </span>
                <span className="block text-base">
                  <span className="font-semibold">Quantity:</span> {quantity}
                </span>
              </div>

              <span className="block text-base xl:left-36 xl:relative bg-cyan-400 lg:h-14 px-3 shadow-lg rounded-md text-center">
                <span className="font-semibold lg:block">Total:</span> ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={handleIncrement}
                className="mr-5 px-3 py-2 hover:scale-110 active:scale-95 shadow-lg shadow-gray-300 bg-orange-400 text-white rounded-full">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                onClick={handleDecrement}
                className="px-3 mr-5 py-2 hover:scale-110 active:scale-95 shadow-lg shadow-gray-300 bg-orange-400 text-white rounded-full">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button
                onClick={handleRemove}
                className="px-3 py-2 hover:scale-110 active:scale-95 shadow-lg shadow-gray-300 bg-orange-400 text-white rounded-full">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
