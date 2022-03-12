import React from 'react'

export const Paciente = ({paciente}) => {

  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
  // console.log(fecha)
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
  };

  // console.log(fecha)

  return (
    <div className='mx-5 my-5 bg-white shadow-md px-6 py-10 rounded-xl'>
      <p className='font-bold uppercase text-indigo-600 my-2'>Nombre: {''}
        <span className='font-normal normal-case text-black'>{nombre}</span>
      </p>
      <p className='font-bold uppercase text-indigo-600 my-2'>Propietario: {''}
        <span className='font-normal normal-case text-black'>{propietario}</span>
      </p>
      <p className='font-bold uppercase text-indigo-600 my-2'>Email: {''}
        <span className='font-normal normal-case text-black'>{email}</span>
      </p>
      <p className='font-bold uppercase text-indigo-600 my-2'>Fecha Alta: {''}
        <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
      </p>
      <p className='font-bold uppercase text-indigo-600 my-2'>Sintomas: {''}
        <span className='font-normal normal-case text-black'>{sintomas}</span>
      </p>
      <div className='flex justify-between my-5'>
        <button
          type='button'
          className='py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase
          font-bold rounded-lg'
        >
          Editar
        </button>
        <button
          type='button'
          className='py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase
          font-bold rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
