import { useState } from "react";
import { useUserAuth } from "./UserContext"; 
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import UserPage from "./UserPage";

const Signup = () => {
  const { handleLogin } = useUserAuth(); // Use handleLogin from context
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  const navigate = useNavigate(); 

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };





  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message
    try {
      const response = await fetch("http://localhost:3600/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        handleLogin(data.token, signUpData.email, signUpData.username); // Log the user in after registration
        
        // Reset sign-up form
        setSignUpData({ username: "", email: "", password: "" });
      } else {
        setErrorMessage(data.message || "Registration failed: Token not received.");
        console.error("Registration failed:", data.message || "Token not received.");
      }
    } catch (error) {
      setErrorMessage("Error during sign-up. Please try again.");
      console.error("Error during sign-up:", error);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message
    try {
      const response = await fetch("http://localhost:3600/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        handleLogin(data.token, data.email, data.username); // Log the user in

        // Store email and username in local storage
        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);

        // Reset sign-in form
        setSignInData({ email: "", password: "" });
      } else {
        setErrorMessage(data.message || "Login failed: Invalid credentials.");
        console.error("Login failed:", data.message || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Error during login. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-serif">
      <div className="bg-orange-100 p-8 rounded shadow-md shadow-orange-200 w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">{isSignUp ? "Register" : "Sign In"}</h2>

        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 py-2 ${isSignUp ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"} rounded-l hover:bg-orange-600 transition`}
            onClick={() => {
              setIsSignUp(true);
              setErrorMessage(""); // Reset error message on toggle
              setSuccessMessage(""); // Reset success message on toggle
            }}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-2 ${!isSignUp ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"} rounded-r hover:bg-orange-600 transition`}
            onClick={() => {
              setIsSignUp(false);
              setErrorMessage(""); // Reset error message on toggle
              setSuccessMessage(""); // Reset success message on toggle
            }}
          >
            Sign In
          </button>
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {isSignUp ? (
          <form onSubmit={handleSignUpSubmit}>
            <input
            id='username'
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 mb-4 border rounded"
              value={signUpData.username}
              onChange={handleSignUpChange}
              required
            />
            <input
            id='email-signup'
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />
            <input
            id='password-signup'
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            <button type="submit" className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-600">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignInSubmit}>
            <input
            id='email-signin'
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
              value={signInData.email}
              onChange={handleSignInChange}
              required
            />
            <input
            id='password-signin'
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />
            <button type="submit" className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-600">
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
