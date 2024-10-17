import axios from 'axios';
import API_BASE_URL from '../config.js';

const registerEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  const savedUserId = localStorage.getItem('userId'); // Obtén el nombre de usuario del almacenamiento local
  
  console.log(eventId,"userData", savedUserId)
  console.log("########");
    
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.post(`${API_BASE_URL}/register-event/`, 
      { "user": savedUserId, "event":eventId
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

export default registerEvent 
