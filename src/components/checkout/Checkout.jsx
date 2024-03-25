import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const  {user} = useSelector(state=>state.user)
  const  {Cart} = useSelector(state=>state.cart)
  const navigate = useNavigate();

  const initialState = {
    country:"",
    city:'',
    userInfo:'',
    address1:"",
    address2:'',
    zipCode:'',
    couponCode:"",
    couponCodeData:'',
  }

  return (
    <div></div>
  )
}

export default Checkout