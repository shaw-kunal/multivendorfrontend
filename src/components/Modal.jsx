import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const Modal = ({open=false,setOpen ,children }) => {
  return (
    <div className={` ${open?"flex":"hidden"} bg-black bg-opacity-20 w-screen min-h-screen absolute top-0 left-0 z-40  justify-center items-center `}>
      <div className="w-4/5 bg-white z-40 rounded-xl shadow-lg  min-h-[80vh] opacity-100 relative 800px:w-1/2">
        {children}
        <div onClick={()=>setOpen(false)} className='absolute right-2 top-2 cursor-pointer'><AiFillCloseCircle size={"30"} fill='gray' /></div>
      </div>
    
    </div>

  )
}

export default Modal