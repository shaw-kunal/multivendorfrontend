import axios from "axios";
import { toast } from "react-toastify";

//create product
export const createProduct = (product,navigate) => async (dispatch) => {
    try {
        dispatch({ type: "clearErrors" })
        dispatch({ type: "productCreateRequest" });
        const { data } = await axios.post(import.meta.env.VITE_PROXY + "/product/createProduct", product, { withCredentials: true })
        dispatch({ type: "productCreateSuccess", action: data })
        toast.success("product created Successfully")
        navigate("/Dashboard")
    } catch (error) {
        dispatch({ type: "productCreateFail" });
        toast.error("Something went wrong")
    }
}


export const resetProductState = () => async (dispatch) => {
    dispatch({ type: 'resetProductState' })
}


//get all product
export const getAllProductShop = (sellerId) => async (dispatch) => {
    try {
        dispatch({ type: "getAllProductsShopRequest" });
        const { data } = await axios.get(import.meta.env.VITE_PROXY + `/product/get-all-products-shop/${sellerId}`)
        console.log(data)
        dispatch({ type: "getAllProductsShopSuccess", payload: data?.products })
    } catch (error) {
        dispatch({ type: "getAllProductsShopFail" })
    }
}

//delete product of a shop
export const deleteProduct = (productID) => async (dispatch) => {
    try {
        dispatch({ type: "deleteProductRequest" });
        const { data } = await axios.delete(import.meta.env.VITE_PROXY + `/product/delete-shop-product/${productID}`, { withCredentials: true })
        dispatch({ type: "deleteProductSuccess", payload: {message:"Product deleted Succesfully",id:productID} })
        toast.success("product deleted  Successfully")
    } catch (error) {
        dispatch({ type: "deleteProductFail", payload: "Something went wrong" })
        toast.success("Something went wrong")
        
    }
}
