import { createAction, createReducer } from "@reduxjs/toolkit"
import { saveToLocalStorage } from "../../utils/saveToLocalStorage"


const addToCart = createAction("addToCart")
const removeFromCart = createAction("removeFromCart")
const changeQty = createAction("changeQty")
const removeAllItem = createAction("removeAllItem")

const initalState = {
    cart: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],

}



export const cartReducer = createReducer(initalState, (builder) => {
    builder
        .addCase(addToCart, (state, action) => {
            const item = action.payload;

            const isItemExist = state.cart.find((i) => i._id === item._id)
            let updatedState;

            if (isItemExist) {
                updatedState = { ...state, cart: state.cart.map((i) => i._id === item._id ? item : i) }
            }
            else {
                updatedState = { ...state, cart: [...state.cart, item] }
            }
            saveToLocalStorage('cartItems', updatedState.cart);
            return updatedState;
        })
        .addCase(removeFromCart, (state, action) => {

            const  updatedState= {...state, cart: state.cart.filter((i) => i._id !== action.payload)}
            saveToLocalStorage('cartItems',updatedState.cart)
            return updatedState;
        })
        .addCase(changeQty, (state, action) => {
            const item = action.payload;
            const updateItem = state.cart.map((i) => i._id === item._id ? item : i);
            const updatedState = { ...state, cart: updateItem }
            saveToLocalStorage('cartItems', updatedState.cart)
            return updatedState;
        })
        .addCase(removeAllItem,(state,action)=>({
            cart:[]
        }))
})