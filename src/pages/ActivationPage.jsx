import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from "sweetalert2"

const ActivationPage = () => {

    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            setLoading(true);
            axios.post(import.meta.env.VITE_PROXY + "/user/activation", {
                activation_token
            })
                .then((res) => {
                    swal.fire({
                        title: "Account created Successfully",
                        icon: 'success',
                        timer: 10000
                    })
                    navigate("/");
                })
                .catch((err) => {
                    setError(true)
                    swal.fire({
                        title: "Token has been expired",
                        icon: 'error',
                        timer: 5000
                    })
                })
                .finally(()=>setLoading(false))  
        }
    }, [])

    return (
        <div className='h-screen bg-white flex items-center justify-center font-semibold text-xl'>{loading ?"loading...":error ? "Your token has been expired" : "Your account succesfully created"}</div>
    )
}

export default ActivationPage