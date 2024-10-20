# ShoppyGlobe

#### ShoppyGlobe is a React-based e-commerce platform with a clean UI, responsive layout, and a dynamic shopping cart. It uses Redux for state management, Tailwind CSS for styling, and FontAwesome for icons. This README outlines both the frontend and backend functionalities of the project.


## Key Features

### Frontend (React)
## Frontend Overview

### Key Features:
- *Responsive Design*: The application is optimized for different screen sizes, offering a smooth experience on desktop, tablet, and mobile devices.
- *Dynamic Shopping Cart*: The cart updates in real-time, reflecting changes such as adding, removing, or updating the quantity of items.
- *Redux State Management*: Redux is used to manage the global state for products and the shopping cart.
- *Custom Hooks*: A UseFetch hook is implemented to fetch data from external APIs while managing loading and error states.
- *Error Handling*: Invalid or non-existent routes are handled gracefully with an error message and a redirect button back to the homepage.

### Components:
1. *Header*:
    - Responsive navigation with a dropdown for mobile users.
    - Cart icon that shows the number of items in the cart.
    
2. *Error Component*:
    - Handles routing errors and offers a button to return to the homepage.

3. *Cart Component*:
    - Displays a list of items added to the cart.
    - Options to clear the cart or adjust the quantity of items.

4. *CartItem Component*:
    - Allows users to modify the quantity of individual items or remove them from the cart.
    - Dynamically recalculates total price based on quantity changes.

5. *Product List*:
    - Fetches and displays a list of products using the UseFetch hook.
    - Users can add products to their cart directly from the product list.

6. *Product Item*:
    - Shows individual product details like thumbnail, price, and stock.
    - A button links to the product’s detailed view.

7. *Product Detail Page*:
    - Displays detailed information about a selected product.
    - Allows users to add products to their cart with customizable quantities.


 
 ### Backend (Node.js & Express)

- **API Routes**: Manages products, users, and cart actions using RESTful API routes.
- **MongoDB**: Stores products and user data.
- **JWT Authentication**: Secures routes with JSON Web Token (JWT)-based authentication.
- **Error Handling**: Handles errors like invalid routes or token issues with clear feedback.

 ## How to Run the Project

### Prerequisites
- **Node.js and npm**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Install and run MongoDB locally.
- **Frontend Technologies**: Familiarity with React, Redux, and Tailwind CSS is helpful.

## Backend API Routes

- *Routes*:


- **Get All Products**  
  `GET /api/products`  
  Fetches all products from the MongoDB database.

- **Get Product by ID**  
  `GET /api/products/:id`  
  Fetches a specific product by its ID.

- **Add a Product**  
  `POST /api/product`  
  Adds a new product to the database.

- **Update a Product**  
  `PUT /api/product/:id`  
  Updates an existing product.

- **Delete a Product**  
  `DELETE /api/product/:id`  
  Deletes a product from the database.

### Cart

- **Get Cart Items**  
  `GET /api/cartsc`  
  Fetches items in the cart for the logged-in user.

- **Add an Item to Cart**  
  `POST /api/cartadd`  
  Adds a product to the cart for the logged-in user.

- **Update Cart Item Quantity (Increment/Decrement)**  
  `PUT /api/cartInc/:id`  
  `PUT /api/cartDec/:id`  
  Increments or decrements the quantity of a cart item.

- **Remove Item from Cart**  
  `DELETE /api/cartdel/:id`  
  Removes a specific item from the cart.

- **Clear Cart**  
  `DELETE /api/cartClr`  
  Clears all items in the cart.

### User Authentication

- **Register a New User**  
  `POST/register`  
  Registers a new user by storing username, email, and password.

- **Login**  
  `POST/login`  
  Logs in the user and returns a JWT token.

## Technologies Used
- **Frontend**: React, Redux, React Router, Tailwind CSS, FontAwesome
- **Backend**: Node.js, Express, MongoDB, JWT for authentication
- **Database**: MongoDB
- **API Integration**: Uses fetch to retrieve product data from an external API and stores it in MongoDB.

- *Protected Routes*: Cart-related routes are accessible only to authenticated users.

### Testing with ThunderClient
- All API routes have been tested with ThunderClient to ensure proper functionality.

### Frontend Usage of Backend APIs
The frontend integrates with the backend through API calls made by the following components:
- *Product List*: Uses the GET /products API to fetch and display all available products.
- *Product Detail Page*: Uses the GET /products/:id API to fetch detailed information about a single product.
- *Cart Component*: Communicates with the backend through POST /cart, PUT /cart/:id, and DELETE /cart/:id to manage cart items.
- *User Authentication*: The login and registration forms on the frontend interact with POST /login and POST /register APIs to manage user authentication and store JWT tokens in local storage.
- *Protected Routes*: Frontend pages related to the cart and user actions are secured, and access is granted only to users who have authenticated using a valid JWT token.



## License

This project is licensed under the MIT License.




