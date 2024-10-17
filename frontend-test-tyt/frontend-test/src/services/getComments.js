import axios from 'axios';
import API_BASE_URL from '../config.js';

const getComments = async (event) => {
  const token = localStorage.getItem('token');
  const savedUserId = localStorage.getItem('userId'); // Obtén el nombre de usuario del almacenamiento local
  
  console.log("#getComments#######");
  console.log("userData", savedUserId)
  console.log("token", token)
    const data = { "user": savedUserId
    }
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get(`${API_BASE_URL}/register-comment/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { "event": event },
      },
    );

    return response.data;

};

export default getComments 
