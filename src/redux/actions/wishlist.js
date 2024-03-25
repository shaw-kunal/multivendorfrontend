
//add to  wishlist
export const  addToWishlist = (data)=>async(dispatch)=>{
    dispatch({
        type:"addToWishlist",
        payload:data
    })
}
//remove from  wishlist
export const  removeFromWishlist = (data)=>async(dispatch)=>{
    dispatch({
        type:"removeFromWishlist",
        payload:data
    })
}