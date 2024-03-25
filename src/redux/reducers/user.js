import { createAction, createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const LoadUserRequest = createAction("LoadUserRequest")
const LoadUserSucces = createAction("LoadUserSucces")
const LoadUserFail = createAction("LoadUserFail")
const UpdateUser = createAction("UpdateUser")
const userRequest = createAction("UpdateUserRequest")
const UpdateUserAddress = createAction("UpdateUserAddress")
const userFail = createAction("UpdateUserFail")
const deleteUserAddress = createAction("deleteUserAddress")
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
      }).addCase(LoadUserFail,(state)=>{
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
      .addCase(userRequest,(state)=>{
        state.loading=true,
        state.error=false
      })
      .addCase(UpdateUserAddress,(state,action)=>({
        ...state,
        user:action.payload
      }))
      .addCase(deleteUserAddress,(state,action)=>({
        ...state,
        user:{...state.user,addresses:state.user.addresses.filter(item=>item._id!==action.payload)}
      }))
      .addCase(userFail,(state)=>{
        state.loading= false,
        state.error = true
      })
      .addCase(
      clearErrors,(state)=>{
        state.error = null
      })
})

