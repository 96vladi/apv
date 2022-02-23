import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import axios from 'axios';

export const Registrar = () => {

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setrepetirPassword ] = useState('');

  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg:'Hay campos vacios', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }
    if(password !== repetirPassword){
      setAlerta({msg:'Las contraseñas no son iguales', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    };
    if(password.length < 6){
      setAlerta({msg:'El password es muy corto, agrega minimo 6 caracteres', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    };
    
    // setAlerta({});

    //Crea el usuario en la api
    try {
      const url = "http://localhost:4000/api/veterinarios";

      await axios.post(url, { nombre, email, password });

      setAlerta({
        msg: 'Creado correctamente, revisa tu email para confirmar',
        error: false
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }


  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu Cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { 
          msg && <Alerta 
          alerta={alerta}/>
        }
          
        <form 
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input 
              type="text"
              placeholder='Tu nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input 
              type="email"
              placeholder='Email de registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Password
            </label>
            <input 
              type="password"
              placeholder='Tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Repetir Password
            </label>
            <input 
              type="password"
              placeholder='Repite tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setrepetirPassword(e.target.value)}
            />
          </div>
          <input 
            type='submit'
            value='Crear Cuenta'
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase 
              font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
              to='/'
              className='block text-center my-5 text-gray-500'>
              Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link 
              to='/olvide-password'
              className='block text-center my-5 text-gray-500'>
              Olvide mi password
            </Link>
          </nav>
      </div>
    </>
  )
}
