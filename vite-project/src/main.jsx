import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { lazy , Suspense} from 'react';
import App from './App.jsx'
import './index.css';
import NotFound from './Components/NotFound.jsx';
import SignUp from './Components/SignUp.jsx';

import UserPage from './Components/UserPage.jsx';



// Lazy load components
const ProductList = lazy(()=>import("./Components/ProductList.jsx"));
const ProductDetail = lazy(()=>import("./Components/ProductDetail.jsx"));
const Body = lazy(()=>import("./Components/Body.jsx"));
const Cart = lazy(()=>import("./Components/Cart.jsx"));
const AboutPage = lazy(()=>import('./Components/AboutPage.jsx'));


const appRouter = createBrowserRouter([
{
path:"/",
element:<App/>,

children:[
  {

    path:"",
    element:(
          <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
            <Body/>
          </Suspense>
    ),

  },
  {
    path:"/productlist",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
        <ProductList/>
      </Suspense>
    ),
  },
  {
    path:"/productdetail/:id",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
        <ProductDetail/>
      </Suspense>
    ),
  },
  {
    path:"/cart",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading... </div>}>
        <Cart/>
      </Suspense>
    ),
  },
  {
    path:"/about",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
        <AboutPage/>
      </Suspense>
    )
  },
  {
    path:"/signup",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
        <SignUp/>
      </Suspense>
    )
  },
  {
    path:"/userpage",
    element:(
      <Suspense fallback={<div className='text-orange-400 font-semibold font-serif'>Loading...</div>}>
        <UserPage/>
      </Suspense>
    )
  },
  
  

  
],

  errorElement:<NotFound/>,
},




])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {appRouter}/>
  </StrictMode>,
)
