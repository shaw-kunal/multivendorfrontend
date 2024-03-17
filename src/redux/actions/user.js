import axios from "axios";
import { toast } from "react-toastify";

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" })
        const { data } = await axios.get(import.meta.env.VITE_PROXY + "/user/getuser", { withCredentials: true });
        dispatch({
            type: "LoadUserSucces",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message,
        })
    }
}


//update user 
export const updateUser = (updatedUser) => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" })
        const { data } = await axios.put(import.meta.env.VITE_PROXY + `/user/`, updatedUser,{ withCredentials: true });
        dispatch({
            type: "UpdateUser",
            payload: data.user
        })
        toast.success("Success fully updated")
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message,
        })
    }
}

