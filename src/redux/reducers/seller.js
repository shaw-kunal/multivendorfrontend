import { createAction, createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const LoadSellerRequest = createAction("LoadSellerRequest")
const LoadSellerSucces = createAction("LoadSellerSucces")
const LoadSellerFail = createAction("LoadSellerFail")
const sellerLogout = createAction("sellerLogout")
const resetSellerState = createAction("resetSellerState")

const initialState ={
    isSeller:false,
    loading:false,
    error:false,
    seller:null,
}


export const sellerReducer = createReducer(initialState,(builder)=>{
      builder.addCase(LoadSellerRequest,(state)=>{
        state.loading = true;
      })
      .addCase(
        LoadSellerSucces,(state,action)=>{
        state.isSeller = true;
        state.loading=false;
        state.seller = action.payload;
      }).addCase(LoadSellerFail,(state,action)=>{
        state.loading = false;
        state.error = true;
        state.isSeller = false;
      })
      .addCase(
        sellerLogout,(state)=>{
        state.seller = null,
        state.isSeller=false
      })
      .addCase(
        resetSellerState,(state)=>{
        state.error = false,
        state.loading= false
      })
})

