import axios  from "axios";
import { toast } from "react-toastify";

//creat event
export const createEvent = (event,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:"EventCreateRequest"})
        const { data } = await axios.post(import.meta.env.VITE_PROXY + "/event/create-event", event, { withCredentials: true })
        dispatch({type:"EventCreateSuccess",payload:data.event});
        toast.success("Event Create Successfully")
        navigate("/dashboard")
    } catch (error) {
        
        dispatch({type:"EventCreateFail"})
    }
}

//reset event state
export const resetEventState = ()=>(dispatch)=>{
    dispatch({type:"resetEventState"})
}

export const allEvents =()=>async(dispatch)=>{
    try {
        dispatch({type:"EventCreateRequest"})
        const { data } = await axios.get(import.meta.env.VITE_PROXY + "/event/get-all-events");
        dispatch({type:"AllEvents",payload:data.events})
    } catch (error) {
        dispatch({type:"EventCreateFail"})
    }
}