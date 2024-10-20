import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'



function ProductItem(props) {

    return (

        <div>

            <div className="text-xs bg-gradient-to-r rounded-lg from-gray-300 to-white shadow-lg active:scale-95 shadow-orange-200   sm:text-sm   flex flex-col items-center my-4 w-60  md:text-xl lg:text-xl sm:mx-2 flex-shrink-0 hover:scale-105 transition-all sm:w-64 ">


                <Link to={`/productdetail/${props.product._id}`}><img src={props.product.thumbnail} alt="product img" /></Link>

                <Link to={`/productdetail/${props.product._id}`}><button className="bg-orange-400 px-6 py-1 my-2 font-bold text-white  mt-2 shadow-md hover:scale-110 text-xs sm:text-xs transition-all ">More Details</button></Link>

                <div className=" px-3 py-7 mt-2  w-full sm:text-sm  font-medium border-t-2 border-solid border-gray-300  sm:h-48">

                    <span className="block"><span className="font-extrabold"> Title:</span>  {props.product.title}</span>

                    <span className="mr-3 sm:block" ><span className="font-extrabold">Category:</span>  {props.product.category}</span>
                    <span className="block sm:inline" ><span className="font-extrabold ">Brand:</span> {props.product.brand}</span>
                    <span className="mr-5 block text-green-600" ><span className="font-extrabold">Price</span>:   {props.product.price}</span>
                    <span className="block text-yellow-600"> <span className="font-extrabold">Rating:</span> {props.product.rating} <FontAwesomeIcon icon={faStar} className="text-yellow-600" /></span>

                    <span className="text-red-400 sm:block"> <span className="font-extrabold">Left:</span> {props.product.stockQuantity}</span>

                </div>




            </div>


            <div className="text-xs w-28 sm:text-xl md:text-xl lg:text-xl sm:mx-2 sm:w-36 md:w-40 flex-shrink-0 hover:scale-105 transition-all  ">


            </div>

        </div>
    )
}

export default ProductItem;