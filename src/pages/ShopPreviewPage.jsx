import React from 'react'
import ShopInfo from '../components/shop/ShopInfo'
import ShopProfileData from '../components/shop/ShopProfileData'

const ShopPreviewPage = () => {
  
    return (
        <div className={`w-11/12 mx-auto bg-slate-50`}>
          <div className="w-full flex py-10 justify-between relative">
          <div className="hidden w-[300px] 400px:block 800px:w-1/4 bg-white h-fit rounded shadow-sm   sticky top-2 left-0 z-100">
            <ShopInfo isOwner={false} />
          </div>
          <div className="w-[72%] rounded">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
        </div >
      
  )
}

export default ShopPreviewPage