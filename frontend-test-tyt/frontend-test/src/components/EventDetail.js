
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config.js';
import { useNavigate } from 'react-router-dom';
import getEvents from '../services/getEvents.js';
import { useAuth } from '../context/AuthContext.js';
import { useCod } from '../context/CodContext.js'; // Importa el contexto de código
import Header from './Header.js';
import Swal from 'sweetalert2';
import './EventList.css';

const EventList = () => {
  const { token } = useAuth();
  const { setCod } = useCod(); // Usar setCod del contexto de código
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const [cod, setCodInput] = useState('');
  const [response, setResponse] = useState(null);
  const [confirmation, setConfirmation] = useState(false); // Estado para controlar la visibilidad del modal
  const [canRedirect, setCanRedirect] = useState(false);
  const navigate = useNavigate();


  // useEffect(async () =>{
  //   console.log("############");
  //   try {
  //     const response = await getEvents(token);
  //     setEvents(response);
  //   } catch (error) {
  //     setError(error.message || 'No se pudieron cargar los eventos');
  //   } 
    
  // },[])

  const fetchMatches = async () => {
    const response = await getEvents(token)
    console.log("Retrasado por 1 segundo.", response);
    setEvents(response);
  };

  
  useEffect(() => {
    console.log(events);
    
    // fetchMatches();
  }, [events]);

  return (
    <div className="events-container">
      <Header />
      <div className="external-bg-container-include d-flex justify-content-center align-items-start pt-5 vh-100">
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <div className="col-12 m-0 p-0">
          </div>
          
          <div className="col-12 m-0 p-0 mt-5 mb-3">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <div className="col-12 col-lg-10 d-flex justify-content-center align-items-center flex-column">
                <div className="register-container">
                  <button onClick={fetchMatches}>
                    Ver eventos
                  </button>
                  detalles
                  {error && <p className="error-message W-75 d-flex justify-content-center align-items-center text-white">{error}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* {confirmation && (
          // Modal de Bootstrap
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¡Código activado!</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>{response.msg_response}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleCloseModal}>Aceptar</button>
                    </div>
                    </div>
                </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EventList;