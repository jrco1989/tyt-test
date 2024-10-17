import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import registerService from '../services/registerService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    cedula: '',
    name: '',
    city: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cedulaRegex = /^\d{10}$/;
    const phoneRegex = /^\d{10}$/;

    const newErrors = {};

    // Validating email
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, ingrese una dirección de correo electrónico válida.';
    }

    // Validating cedula
    if (!formData.cedula || !cedulaRegex.test(formData.cedula)) {
      newErrors.cedula = 'Por favor, ingrese una cédula válida (10 dígitos).';
    }

    // Validating phone
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Por favor, ingrese un número de teléfono válido (10 dígitos).';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await registerService.register(formData);
        setSuccessMessage('¡Registro exitoso! Ahora puede iniciar sesión.');
        setFormData({
          email: '',
          cedula: '',
          name: '',
          city: '',
          phone: ''
        });
      } catch (err) { 
        setErrors(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Conviértete en miembro y disfruta de tus eventos favoritos
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
              id="cedula"
              name="cedula"
              type="number"
              value={formData.cedula}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.cedula && <p className="error-message m-0 p-0 text-white Bebas-Neue">{errors.cedula}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Correo
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <p className="error-message m-0 p-0 text-white Bebas-Neue">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Celular
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="cedula"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone && <p className="error-message m-0 p-0 text-white Bebas-Neue">{errors.phone}</p>}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crea cuenta
          </button>
        </div>
      </form>
      {errors && <p className="error-message">{errors}</p>}
      <p className="mt-10 text-center text-sm text-gray-500">
        Ya eres miembro?{' '}
        <Link to="/login" className="text-decoration-none">
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        Ingresa
        </a>
        </Link>
      </p>
    </div>
  </div>
  );
};

export default Register;
