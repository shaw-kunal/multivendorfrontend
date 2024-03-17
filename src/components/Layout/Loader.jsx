import React from 'react'
import Lottie from "react-lottie"
import animationData from '../../assets/animation/e-commerceAnimation.json'

const Loader = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
            perserveAspectRatio: "xMidyMid slice"
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Lottie options={defaultOptions} width={300} height={300} />

        </div>
    )
}

export default Loader