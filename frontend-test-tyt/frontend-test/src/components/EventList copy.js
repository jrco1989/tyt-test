import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config.js';
import { useNavigate } from 'react-router-dom';
import getComments from '../services/getComments';
import getEvents from '../services/getEvents';
import getUserEvents from '../services/getUserEvents';
import registerComment from '../services/registerComment';
import registerEvent from '../services/registerEvent';
import { useAuth } from '../context/AuthContext';
import { useCod } from '../context/CodContext'; // Importa el contexto de código
import Header from './Header';
import Swal from 'sweetalert2';
import './EventList.css';

const EventList = () => {
  const { token } = useAuth();
  const { setCod } = useCod(); // Usar setCod del contexto de código
  const [comments, setComments] = useState([]);
  const [events, setEvents] = useState([]);
  const [infoEvent, setInfoEvent] = useState([]);
  const [isRegistered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const [userEvents, setUserEvents] = useState([]);
  const [response, setResponse] = useState(null);
  const [confirmation, setConfirmation] = useState(false); // Estado para controlar la visibilidad del modal
  const [canRedirect, setCanRedirect] = useState(false);
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);

  const fetchMatches = async () => {
    if(token){
    const responseUserEvents = await getUserEvents()
    const response = await getEvents(token)
    
    console.log("Retrasado por 1 segundo.", response, responseUserEvents);
    setEvents(response);
    const id_event = responseUserEvents.map(id=>id.event) 
    setUserEvents(id_event)

  }
  };
  const get_coments = async (id) =>{

    const response = await getComments(id)
    setComments(response)

  }

  const handleShowDetail = (info) => {
    setInfoEvent(info)
    setShowDetail(true)
    const state = userEvents.includes(info.id)
    get_coments(info.id)
    setRegistered(state)
    


  };
  const closeShowDetail = async () => {
    setShowDetail(false)
  };
  const handleInscription = async (info) => {
    setRegistered(!isRegistered);
    const data = {
      event: info
    }
    console.log(info);
    
    registerEvent(info)

  };
  console.log("userEvents", userEvents);
  
  useEffect(() => {
    console.log(events);
    console.log(token);
    fetchMatches();
  }, [token]);

  const buttonText = isRegistered ? 'Abandonar' : 'Registrarse';
  const buttonColor = isRegistered ? 'red' : 'green'; 
  const [comentario, setComentario] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e, eventId, texto) => {
    console.log("222222222222222");
    e.preventDefault();
    
    if (comentario.trim()) {
      setComments([...comments, comentario]);
      setComentario('');
      registerComment(eventId, comentario)
      get_coments(eventId)

    }
  };

  const toggleFormulario = () => {
    setIsVisible(!isVisible);
  };


  if (showDetail) {
    
    return <div className="events-container">
    <Header />
    <div className="external-bg-container-include d-flex justify-content-center align-items-start pt-5 vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className="col-12 m-0 p-0">
        </div>
        
    <div className="events-container"><p> <button onClick={closeShowDetail}>
    Ver eventos
  </button>
  <div className="single-bet-place draw-box d-flex justify-content-center align-items-center">
            <span className="bet-ratio">{infoEvent.name}</span>
        </div>
  <div className="single-bet-place">
            <span className="team-icon">
                <img src={`${"http://127.0.0.1:8000/"}${infoEvent.imagen}`} alt="nn" />
            </span>
           <button
      onClick={() => handleInscription(infoEvent.id)}
      style={{ backgroundColor: buttonColor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
    >
      {buttonText}
    </button>
        </div>
        <div className="single-bet-place draw-box d-flex justify-content-center align-items-center">
            <span className="bet-ratio">{infoEvent.description}</span>
        </div>
        <div className="single-bet-place draw-box d-flex justify-content-center align-items-center">
            <span className="bet-ratio">{infoEvent.video}</span>
        </div>
  </p></div>;
  <div>
      <button onClick={toggleFormulario}>
        {isVisible ? 'Ocultar formulario' : 'Dejar un comentario'}
      </button>

      {isVisible && (
        <form onSubmit={(e) => handleSubmit(e,infoEvent.id, e.target.value)}>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe tu comentario aquí"
            required
          />
          <button type="submit">Enviar Comentario</button>
        </form>
      )}

      <h3>Comentarios:</h3>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>{c.text}</li>
        ))}
      </ul>
    </div>
      </div>
    </div>
  </div>
  }else{
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
                 
                  List<div className="playing-sports-all table-matches-container">
                                <div className="tournament-title"></div>
                                <div className="all-tournament-match">
                                    <div className="single-t-match">
                                        {events.map(pred => (
                                            <div key={pred.id} className="placing-bet">
        <div className="single-bet-place">
            <span className="team-icon">
                <img src={`${"http://127.0.0.1:8000/"}${pred.imagen}`} alt="nn" />
            </span>
            <span className="team-goals fw-bold"><button onClick={() => handleShowDetail(pred)} >{pred.name}</button></span>
        </div>
        <div className="single-bet-place draw-box d-flex justify-content-center align-items-center">
            <span className="bet-ratio">VS</span>
        </div>
        <div className="single-bet-place">

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                            </div>
                    </div>

                  {error && <p className="error-message W-75 d-flex justify-content-center align-items-center text-white">{error}</p>}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
};

export default EventList;