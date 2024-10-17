import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import './Login.css';

const Login = () => {
  const [cedula, setCedula] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(cedula);
      const token = response.access;
      const id_user = response.id_user;

      if (token) {
        login(token, id_user);
        navigate('/eventos');
      } else {
        setError('Login failed. Token not found.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //   <h1 className="text-2xl mb-6 text-center">Inicio de sesión</h1>
    //             <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
    //             <div className="mb-4">
    //       <label className="block mb-1" htmlFor="email">Correo Electrónico</label>
          
    //               <input
    //                 type="number"
    //                 className="input-login-sesion"
    //                 placeholder="E-mail"
    //                 value={cedula}
    //                 onChange={(e) => setCedula(e.target.value)}
    //                 pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Expresión regular para validar correo electrónico
    //                 title="Ingrese número de cédula válido"
    //                 required
    //               />
    //               <button type="submit" className="mt-4 btn-continue btn m-0 p-1 Bebas-Neue text-center px-3">Continuar</button>
    //           </div>
    //           </form>
    //             {error && <p className="error-message">{error}</p>}
    //             <Link to="/registro" className="text-decoration-none">
    //               <p className="mt-3 Bebas-Neue color-redirect-blue"><span className="color-redirect-white">Crea una cuenta</span></p>
    //             </Link>
              
    //           </div>

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa y regístrate en tus eventos favoritos
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Cédula
              </label>
              <div className="mt-2">
                <input
                  id="cedulo"
                  name="cedulo"
                  type="number"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  className="block w-full rounded-md border-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continuar
              </button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p className="mt-10 text-center text-sm text-gray-500">
            No eres miembro?{' '}
            <Link to="/registro" className="text-decoration-none">
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Crea una cuenta
            </a>
            </Link>
          </p>
        </div>
      </div>

  );
};

export default Login;
