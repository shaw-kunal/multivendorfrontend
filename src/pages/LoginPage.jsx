import React, { useEffect } from 'react'
import Login from "../components/login/Login.jsx"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomePage from './HomePage.jsx'
const LoginPage = () => {

   const navigate  = useNavigate();
   const {isAuthenticated} = useSelector(state=>state.user)
  useEffect(()=>{
     if(isAuthenticated===true){
        navigate("/")
     }
  },[])

  return (
    <div>{
      isAuthenticated?<HomePage/>: <Login/>}</div>
  )
}

export default LoginPage