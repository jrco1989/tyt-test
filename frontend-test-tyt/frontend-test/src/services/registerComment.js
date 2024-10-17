import axios from 'axios';
import API_BASE_URL from '../config.js';

const registerComment = async (eventId, texto) => {
  const token = localStorage.getItem('token');
  const savedUserId = localStorage.getItem('userId'); // Obtén el nombre de usuario del almacenamiento local
  
  console.log(eventId,"registerComment", savedUserId, texto)
  console.log("########");
    
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.post(`${API_BASE_URL}/register-comment/`, 
      { "user": savedUserId, "event":eventId, "text": texto
       },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;

};

export default registerComment 
