import React from 'react'
import { Outlet } from 'react-router-dom' 

export const AuthLayout = () => {
  return (
    <>
      <h1>Desde AuthLayout</h1>

      <Outlet />
    </>
  )
}
