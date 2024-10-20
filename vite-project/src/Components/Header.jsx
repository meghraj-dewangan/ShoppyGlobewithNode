import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMagnifyingGlass, faCartShopping, faTimes, faBars,faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AboutPage from './AboutPage';

function Header() {

    // state for mobile screen hamberger menu open and close
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const selector = useSelector((state) => state.cart.items);


    const navigate = useNavigate();
    // for dropdown option navigate use


    function handleSelectChange(e) {
        const selectedValue = e.target.value;
        if (selectedValue) {
            navigate(selectedValue); //programmatically navigate to the selected route

        }

    };

    

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 font-serif shadow-lg md:py-7 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl md:text-3xl font-bold"><span className='text-orange-400'>S</span>hoppy<span className='text-orange-400'>G</span>lobe</div>

                {/* navigation design for tablet and large screen */}
                <nav className="hidden md:flex ">
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/productlist"><span

                                className="hover:text-yellow-300 md:text-lg hover:scale-110   transition-all ease-in-out"
                                aria-label="Home"
                            >
                                Home
                            </span> </Link>
                        </li>


                        <li>
                            <Link to="/cart"><span 

                                className="hover:text-yellow-300 transition-all md:text-2xl hover:scale-110  ease-in-out"
                                aria-label="Home"
                            >
                                {selector.length >= 1 ? selector.length : ""}  <FontAwesomeIcon icon={faCartShopping} />
                            </span></Link>
                        </li>

                         {/* Signup Button */}
                         <li>
                            <Link to="/userpage">
                                <button className=" text-orange-500 hover:text-white px-2 text-2xl  rounded transition duration-300 ease-in-out">
                                <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                            </Link>
                        </li>


                    </ul>

                    <select onChange={handleSelectChange} defaultValue="" className='  ml-4 bg-transparent md:text-lg text-white hover:text-yellow-300'>
                        <option value="" className='w-6 text-black hover:scale-105 ' disabled  >Nav Menu</option>
                        <option value="/about" className='w-6 text-black hover:scale-110' >  About</option>
                    </select>
                </nav>

                <button
                    className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-white rounded-md"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faBars} />}
                </button>
            </div>
            {isMenuOpen && (

                // navigation design for mobile size screen
                <nav className="md:hidden mt-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link to="/productlist"><span

                                className="block hover:text-yellow-300 transition duration-300 ease-in-out"
                                aria-label="Home"
                            >
                                Home
                            </span></Link>
                        </li>
                        <li>
                            <Link to="/about"> <span

                                className="block hover:text-yellow-300 transition duration-300 ease-in-out"
                                aria-label="About Us"
                            >
                                About
                            </span></Link>
                        </li>
                        <li>
                            <Link to="/cart"><span

                                className="hover:text-yellow-300 transition duration-300 ease-in-out"
                                aria-label="Home"
                            >
                                {selector.length >= 1 ? selector.length : ""}  <FontAwesomeIcon icon={faCartShopping} />
                            </span></Link>
                        </li>

                        <Link to="/userpage">
                                <button className="bg-orange-500 hover:bg-orange-400 text-white px-2 py-1 rounded transition duration-300 ease-in-out">
                                <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                            </Link>


                    </ul>

                </nav>
            )}


        </header>
    );
}
export default Header;