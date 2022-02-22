import React from 'react'
import { Outlet } from 'react-router-dom' 

export const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-12 p-5 items-center border-8'>
        <Outlet />
      </main>
    </>
  )
}
