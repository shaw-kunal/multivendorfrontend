import React, { useEffect } from 'react'
import ShopCreate from '../components/shop/ShopCreate'
import { useSelector } from 'react-redux'
import Store from '../redux/store'
import { loadSeller } from '../redux/actions/seller'
import { useNavigate } from 'react-router-dom'

const ShopCreatePage = () => {

  const {isSeller, seller} = useSelector(state=>state.seller)
  const navigate = useNavigate();

  useEffect(()=>{
    Store.dispatch(loadSeller());
  },[])

  if(isSeller)
  {
  navigate(`/dashboard`);
  }
  return (
    <div><ShopCreate/></div>
  )
}

export default ShopCreatePage