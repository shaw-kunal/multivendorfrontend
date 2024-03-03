import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutStep from '../components/checkout/CheckoutStep'

const CheckoutPage = () => {
  return (
    <div>
        <Header/>
        <CheckoutStep active={1}/>
        
    </div>
  )
}

export default CheckoutPage