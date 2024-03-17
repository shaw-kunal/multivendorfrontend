import React, { useEffect } from 'react'
import ShopLogin from "../components/shopLogin/ShopLogin.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ShoploginPage = () => {
  const navigate = useNavigate();
  const {isSeller , loading, seller} = useSelector(state => state.seller);
  
  useEffect(()=>{

    if(isSeller)
    {
      navigate(`/dashboard`);

    }
  },[loading,isSeller])

  return (
    <div><ShopLogin/></div>
  )
}

export default ShoploginPage