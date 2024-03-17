import { createAction, createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const LoadUserRequest = createAction("LoadUserRequest")
const LoadUserSucces = createAction("LoadUserSucces")
const LoadUserFail = createAction("LoadUserFail")
const UpdateUser = createAction("UpdateUser")
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
        state.loading = false;
        state.error = true;
        state.isAuthenticated = false;
      })
      .addCase(UpdateUser,(state,action)=>({
       ...state,
       loading:false,
       success:true,
       user:action.payload
      }))
      .addCase(
      clearErrors,(state)=>{
        state.error = null
      })
})

