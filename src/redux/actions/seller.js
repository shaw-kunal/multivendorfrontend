import axios from "axios";
import { toast } from "react-toastify";

// load seller
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadSellerRequest" })
        const { data } = await axios.get(import.meta.env.VITE_PROXY + "/shop/getSeller", { withCredentials: true });
        dispatch({
            type: "LoadSellerSucces",
            payload: data.seller
        })
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response.data.message,
        })
    }
}

// reset seller
export const resetSellerState = () => async (dispatch) => {
    console.log("reset seller state")
    dispatch({ type: "resetSellerState" })
}

export const sellerLogout = (navigate) => async (dispatch) => {
    try {
        await axios.get(import.meta.env.VITE_PROXY + "/shop/logout",{withCredentials:true});
        dispatch(sellerLogout());
        toast.success("Successfully logout")
        window.location.reload();
        navigate("/login")
    } catch (error) {

    }
}