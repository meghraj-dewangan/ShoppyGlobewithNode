import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.jsx"


const appStore = configureStore({

    reducer:{
        cart:cartReducer
    }
});


export default appStore;