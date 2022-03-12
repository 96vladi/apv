import React from 'react'

export const Paciente = ({paciente}) => {

  const { eamil, fecha, nombre, propietario, sintomas, _id } = paciente;

  return (
    <div className='mx-5 my-5 bg-white shadow-md px-6 py-10 rounded-xl'>
      <p className='font-bold uppercase text-gray-600'>Nombre: {''}
        <span className='font-normal normal-case text-black'>{nombre}</span>
      </p>
    </div>
  )
}
