import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css'; // Importa el archivo CSS para estilos
import { Button } from 'react-bootstrap';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const { username, logout, token } = useAuth(); // Obtiene el nombre de usuario, la función de logout y el token
  const [availableCodes, setAvailableCodes] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();



  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  useEffect(() => {
    const handleNavToggle = () => {
      const navContainer = document.querySelector(".navbar.navbar-expand-md.navbar-light.bg-light");
      navContainer.classList.toggle("nav-expanded");
    };

    const navbarToggler = document.querySelector(".navbar-toggler.order-2.order-md-1");
    if (navbarToggler) {
      navbarToggler.addEventListener("click", handleNavToggle);
    }

    return () => {
      if (navbarToggler) {
        navbarToggler.removeEventListener("click", handleNavToggle);
      }
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="">
      {/* <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler order-2 order-md-1" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse order-3 order-md-2" id="navbar-left">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <h5 className="Bebas-Neue mx-2 text-title-name mt-5 pt-5 mb-5 mt-md-0 pt-md-0 mb-md-0">
                  Bienvenido, {username}. Tienes <span className="text-pts">14 pts</span> Códigos disponibles <span className="text-pts">{availableCodes}</span> 
                </h5>
              </li>
            </ul>
          </div>
          <a className="navbar-brand order-1 order-md-3" href="#">
            <img src="/logo.png" alt="logo" />
          </a>
          <div className="collapse navbar-collapse order-4 order-md-4" id="navbar-right">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item items-menu-mobile">
                <Link to="/predicciones" className={`nav-link Bebas-Neue text-items-nav ${isActive('/predicciones')}`}>Predicciones</Link>
              </li>
              <li className="nav-item items-menu-mobile">
                <Link to="/eventos" className={`nav-link Bebas-Neue text-items-nav ${isActive('/eventos')}`}>Activar Códigos</Link>
              </li>
              <li className="nav-item items-menu-mobile">
                <Link to="/ranking" className={`nav-link Bebas-Neue text-items-nav ${isActive('/ranking')}`}>Ranking</Link>
              </li>
              <li className="nav-item items-menu-mobile">
                <div onClick={handleLogout} className="nav-link Bebas-Neue text-items-nav btn btn-link">
                  <img src="/ico-back.png" className="icon-back" alt="logout" />
                  salis
                  <button>dhdghdhg</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))} */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={handleLogout}>
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))} */}
        </div>
      </DisclosurePanel>
    </Disclosure>
    </header>
  );
};

export default Header;
