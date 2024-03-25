import { createAction, createReducer } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../utils/saveToLocalStorage";

const addToWishlist = createAction("addToWishlist")
const removeFromWishlist = createAction("removeFromWishlist")


const initalState={
    wishlist:JSON.parse(localStorage.getItem("wishlistItems"))|| []
}


export const wishlistReducer = createReducer(initalState,(builder)=>{

    builder
    .addCase(addToWishlist,(state,action)=>{
        const item = action.payload;
        const updatedState = {...state, wishlist:[...state.wishlist,item]}  ;
        saveToLocalStorage('wishlistItems', updatedState.wishlist);
        return updatedState;
    })
    .addCase(removeFromWishlist,(state,action)=>{
        const item = action.payload;
        const updatedState = {...state,wishlist:state.wishlist.filter((i)=>i._id!==item._id)}
        saveToLocalStorage('wishlistItems', updatedState.wishlist);
        return updatedState;

    })

})