import React from 'react'
import { TbError404 } from "react-icons/tb";
import { Navigate, useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center self-center text-center' >
        <TbError404 className='font-bold font-sans text-5xl text-center ' />
        <h1 className='font-bold text-3xl'>Page Not Found</h1>
        <button 
        className='bg-indigo-500 px-5 rounded-md text-white mt-4 py-2 font-semibold'
        onClick={()=>navigate('/')} 
        >Dashboard</button>
    </div>
  )
}
