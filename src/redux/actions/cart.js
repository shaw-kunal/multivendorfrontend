import { toast } from "react-toastify"

// add to cart
export const addToCart = (data) => async (dispatch) => {
    dispatch({
        type: "addToCart",
        payload: data,
    })

}

// remove from the cart
export const removeItem =(id)=>async(dispatch)=>{
    dispatch({
        type:"removeFromCart",
        payload:id
    })
    toast.warn("Item removed")
}

// changeQty 
export const changeQty = (data)=>async(dispatch)=>{
    dispatch({
        type:"changeQty",
        payload:data,
    })
}

// remove all item 
export const removeAllItem =()=>async(dispatch)=>{
    dispatch({type:"removeAllItem"})
}