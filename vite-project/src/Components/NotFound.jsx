import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
function Error() {
    const error = useRouteError();
    console.log(error)
  
    return (
        
      <div className="h-screen text-white bg-gray-400 flex flex-col justify-center"  style={{ textAlign: "center" }}>
        <h1 className="text-black">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="font-extrabold text-black">
          {error.statusText || error.message}
        </p>
      <Link to="/productlist"><button className="hover:scale-110 text-white bg-yellow-400 shadow-lg p-2 rounded-lg mt-6">Home page</button></Link>  
      </div>
    );
  }
  
  export default Error;