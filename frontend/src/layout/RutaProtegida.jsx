import React from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

export const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  const { perfil } = auth;

  if(cargando) return 'cargando...'

  return (
    <>
      <Header />
      { perfil?._id ? <Outlet /> : <Navigate to={'/'} /> }
      <Footer />
    </>
  )
}
