import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    product: null,
    isSuccess: false,
    isError: false
}

const productCreateRequest = createAction("productCreateRequest")
const productCreateSuccess = createAction("productCreateSuccess")
const productCreateFail = createAction("productCreateFail")
const clearErrors = createAction("clearErrors")
const resetProductState = createAction("resetProductState")
const getAllProductsShopRequest = createAction("getAllProductsShopRequest")
const getAllProductsShopSuccess = createAction("getAllProductsShopSuccess")
const getAllProductsShopFail = createAction("getAllProductsShopFail")
// delete product of a shop
const deleteProductRequest = createAction("deleteProductRequest")
const deleteProductSuccess = createAction("deleteProductSuccess")
const deleteProductFail = createAction("deleteProductFail")

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(productCreateRequest, (state) => {
            state.isLoading = true
        })
        .addCase(productCreateSuccess, (state, action) => {
            state.isLoading = false
            state.product = action.payload;
            state.isSuccess = true;
        })
        .addCase(productCreateFail, (state) => {
            state.isLoading = false,
                state.isError = true,
                state.isSuccess = false
        })           //getAllProducts of a shop
        .addCase(getAllProductsShopRequest, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProductsShopSuccess, (state, action) => {
            state.isLoading = false,
                state.isSuccess = true,
                state.product = action.payload;
        })
        .addCase(getAllProductsShopFail, (state) => {
            state.isError = true,
                state.isLoading = false
        })
        // delete product of  a shop
        .addCase(deleteProductRequest, (state) => {
            state.isLoading = true
        })
        .addCase(deleteProductSuccess, (state, action) => {
            const updateProduct = state.product.filter((item) => item._id !== action.payload.id)
            console.log("updateProduct")
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess:true,
                message: action.payload.message,
                product: updateProduct
            }
        })
        .addCase(deleteProductFail, (state, action) => (
            {
                ...state,
                isLoading: false,
                isError: true
            }
        ))

        .addCase(clearErrors, (state) => {
            state.isError = false
        })
        .addCase(resetProductState, (state) => {
               state.isError = false,
               state.isLoading = false,
               state.isSuccess = false
        })

})