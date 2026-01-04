import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-purple-100 mix-blend-multiply  text-white'>
    <nav className='flex justify-between mx-18 p-4 items-center '>
        <h1 className='font-bold text-black text-2xl'>
          <span className='text-purple-700'>&lt;</span>SAAS-PrOD <span className='text-blue-700'>/&gt;</span></h1>
        <div className='flex justify-center items-center gap-2 px-1 bg-purple-300 rounded-full'>
          <img className='my-1' width={25} src="/icons/github.svg" alt="Github" />
          <span className='text-black'>GitHub</span>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
