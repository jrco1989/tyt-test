import axios from 'axios';
import API_BASE_URL from '../config.js';

const getUserEvents = async () => {
  const token = localStorage.getItem('token');
  const savedUserId = localStorage.getItem('userId'); // Obtén el nombre de usuario del almacenamiento local
  
  console.log("#getUserEvents#######");
  console.log("userData", savedUserId)
  console.log("token", token)
    const data = { "user": savedUserId
    }
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get(`${API_BASE_URL}/register-event/?cod=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { "user": savedUserId },

        data:
        { "user": savedUserId
        },
      },
      data, 
     { precio_minimo: "precdfdsafioMinimo" 
    }
    );

    return response.data;

};

export default getUserEvents 
