import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { token, logout } = useAuth();

  return (
    <div className="external-container d-flex justify-content-center align-items-center vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className="col-12 m-0 p-0">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <img src="/logo.png" className="container-logo" alt="logo" />
          </div>
        </div>
        <div className="col-12 m-0 p-0 mt-3 mb-3">
          <div className="col-12 d-flex justify-content-center align-items-center">
            {token ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="col-12 mx-3 d-flex justify-content-center align-items-start">
                  <button className="btn-login" onClick={logout}>
                    <h4 className="m-0 p-1 Bebas-Neue text-center px-3">Cerrar sesión</h4>
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="col-6 mx-3 d-flex justify-content-end align-items-start">
                  <Link to="/login" className="btn-login">
                    <h4 className="m-0 p-1 Bebas-Neue text-center px-3">Ingresar</h4>
                  </Link>
                </div>
                <div className="col-6 mx-3 d-flex justify-content-start align-items-center">
                  <Link to="/registro" className="btn-register">
                    <h4 className="m-0 p-1 Bebas-Neue text-center px-3">Registrarse</h4>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 m-0 p-0">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <img src="/allpackage.png" className="container-Bag-of-chips" alt="image-allpackage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
