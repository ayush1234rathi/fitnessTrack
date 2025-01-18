import React from 'react'
import { MdCopyright } from "react-icons/md";

const Footer = () => {
    return(
        <div className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-4 max-w-5xl flex justify-between h-12 items-center ">
        <p>This is a Team Project</p>
        <p>Copyright<MdCopyright className='inline'/> 2025</p>
      </div>

        </div>
    );
}

export default Footer;