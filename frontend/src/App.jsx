import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { RutaProtegida } from './layout/RutaProtegida';

import { Login } from './paginas/Login';
import { Registrar } from './paginas/Registrar';
import { OlvidePassword } from './paginas/OlvidePassword';
import { ConfirmarCuenta } from './paginas/ConfirmarCuenta';
import { NuevoPassword } from './paginas/NuevoPassword';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import AdministrarPacientes from './paginas/AdministrarPacientes';


function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Area publica */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path='registrar' element={<Registrar />}/>
              <Route path='olvide-password' element={<OlvidePassword />}/>
              <Route path='olvide-password/:token' element={<NuevoPassword />}/>
              <Route path='confirmar/:id' element={<ConfirmarCuenta />}/>
            </Route>

            {/* Area protegida */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />}/>
            </Route>
          </Routes>
        </PacientesProvider>PacientesProvider
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
