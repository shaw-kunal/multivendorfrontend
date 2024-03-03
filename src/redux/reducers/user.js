import { createAction, createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const LoadUserRequest = createAction("LoadUserRequest")
const LoadUserSucces = createAction("LoadUserSucces")
const LoadUserFail = createAction("LoadUserFail")
const clearErrors = createAction("clearErrors")

const initialState ={
    isAuthenticated:false,
    loading:false,
    error:false,
    user:null,
}


export const userReducer = createReducer(initialState,(builder)=>{
      builder.addCase(LoadUserRequest,(state)=>{
        state.loading = true;
      })
      .addCase(
      LoadUserSucces,(state,action)=>{
        state.isAuthenticated = true;
        state.loading=false;
        state.user = action.payload;
      }).addCase(LoadUserFail,(state,action)=>{
        toast.error("plase Login to continue");
        state.loading = false;
        state.error = true;
        state.isAuthenticated = false;
      })
      .addCase(
      clearErrors,(state)=>{
        state.error = null
      })
})

