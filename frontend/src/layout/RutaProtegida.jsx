import React from 'react'
import { Outlet } from 'react-router-dom'

export const RutaProtegida = () => {
  return (
    <>
      <h1>Esta es una ruta protegida</h1>
      <Outlet />
    </>
  )
}
