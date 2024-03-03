import axios from "axios";

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" })
     const {data} = await axios.get(import.meta.env.VITE_PROXY + "/user/getuser", { withCredentials: true });
        dispatch({
            type: "LoadUserSucces",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload:error.response.data.message,
        })
    }
}

