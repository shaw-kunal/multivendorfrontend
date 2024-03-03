import axios from "axios";

// load seller
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadSellerRequest" })
     const {data} = await axios.get(import.meta.env.VITE_PROXY + "/shop/getSeller", { withCredentials: true });
        dispatch({
            type: "LoadSellerSucces",
            payload: data.seller
        })
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload:error.response.data.message,
        })
    }
}