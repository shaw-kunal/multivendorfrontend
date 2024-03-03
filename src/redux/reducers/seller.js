import { createAction, createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const LoadSellerRequest = createAction("LoadSellerRequest")
const LoadSellerSucces = createAction("LoadSellerSucces")
const LoadSellerFail = createAction("LoadSellerFail")
const clearErrors = createAction("clearErrors")

const initialState ={
    isSeller:false,
    loading:false,
    error:false,
    user:null,
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
        toast.error("please Login to continue");
        state.loading = false;
        state.error = true;
        state.isSeller = false;
      })
      .addCase(
      clearErrors,(state)=>{
        state.error = null
      })
})

