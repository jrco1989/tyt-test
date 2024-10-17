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
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'


const EventList = () => {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [events, setEvents] = useState([]);
  const [infoEvent, setInfoEvent] = useState([]);
  const [isRegistered, setRegistered] = useState(false);

  const [userEvents, setUserEvents] = useState([]);
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
    
    return (<div className="snap-mandatory snap-y">
      <Header />
      <div className="bg-gray-100 snap-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 snap-y lg:px-8">
        <div className="mx-auto snap-y max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl  font-bold text-gray-900">{infoEvent.name}</h2>
          <p> <button onClick={closeShowDetail}>
    Ver eventos
  </button></p>
          <div className="mt-6 space-y-12 snap-y lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
             <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={"Sin imagen"}
                    src={`${"http://127.0.0.1:8000/"}${infoEvent.imagen}`} 
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                  <p className="text-1  xl text-gray-900 ">{infoEvent.description}</p>

            
          </div>
          <button
      onClick={() => handleInscription(infoEvent.id)}
      style={{ backgroundColor: buttonColor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
    >
      {buttonText}
          </button>
          <div className="border-b border-gray-900/10 pb-8 mt-2">

        <button onClick={toggleFormulario}>
        {isVisible ? 'Ocultar formulario' : 'Dejar un comentario'}
      </button>
      {isVisible && (
        <form onSubmit={(e) => handleSubmit(e,infoEvent.id, e.target.value)}>
           <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
            value={comentario}
            rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                   onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escribe tu comentario aquí"
                  required

                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
         
          <button type="submit">Enviar Comentario</button>
        </form>
      )}
      </div>
      <h3>Comentarios:</h3>
      <ul>
        {comments.map((c, index) => (
          <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">autor</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          {c.text}
          </p>
          </div>
        ))}
      </ul>

      </div>
        </div>
        </div>
    </div>

    )
  }else{
  return (
    <div className="snap-mandatory snap-y">
      <Header />
      <div className="bg-gray-100 snap-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 snap-y lg:px-8">
        <div className="mx-auto snap-y max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl  font-bold text-gray-900">Eventos</h2>

          <div className="mt-6 space-y-12 snap-y lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {events.map((event) => (
              <div key={event.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={"Sin imagen"}
                    src={`${"http://127.0.0.1:8000/"}${event.imagen}`} 
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a onClick={() => handleShowDetail(event)} >
                    <span className="absolute inset-0" />
                    {event.name}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
};

export default EventList;