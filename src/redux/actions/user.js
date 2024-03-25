import axios from "axios";
import { toast } from "react-toastify";

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });
        const { data } = await axios.get(
            import.meta.env.VITE_PROXY + "/user/getuser",
            { withCredentials: true }
        );
        dispatch({
            type: "LoadUserSucces",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message,
        });
    }
};

//update user
export const updateUser = (updatedUser) => async (dispatch) => {
    try {
        dispatch({ type: "userRequest" });
        const { data } = await axios.put(
            import.meta.env.VITE_PROXY + `/user/`,
            updatedUser,
            { withCredentials: true }
        );
        dispatch({
            type: "userRequest",
            payload: data.user,
        });
        toast.success("Success fully updated");
    } catch (error) {
        dispatch({
            type: "userFail",
            payload: error?.response?.data?.message,
        });
    }
};

//update user
export const updateUserAddress = (address) => async (dispatch) => {
    try {
        dispatch({ type: "userRequest" });
        const { data } = await axios.put(
            import.meta.env.VITE_PROXY + `/user/update-user-address`,
            address,
            { withCredentials: true }
        );
        dispatch({
            type: "UpdateUserAddress",
            payload: data.updatedUser,
        });
        toast.success("Success fully updated");
    } catch (error) {
        dispatch({
            type: "userFail",
        });
        toast.error(error?.response?.data?.message);
    }
};

// delete the userAddress

export const deleteUserAddress = (addressId) => async (dispatch) => {
    try {
        dispatch({ type: "userRequest" });
        const { data } = await axios.delete(
            import.meta.env.VITE_PROXY + `/user/delete-user-address/${addressId}`,
            { withCredentials: true }
        );
        dispatch({
            type: "deleteUserAddress",
            payload: addressId
        })
        toast.success("Address deleted successfully")
    } catch (error) {
            dispatch({
                type:"userFail",
            })
    }
};
