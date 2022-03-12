import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

export const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  const { perfil } = auth;
  console.log(perfil)
  console.log(cargando)

  if(cargando) return 'cargando...'

  return (
    <>
      <h1>Esta es una ruta protegida</h1>
      { perfil?._id ? <Outlet /> : <Navigate to={'/'} /> }
    </>
  )
}
