import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/gps',
});

export const searchPlaces = async (latitude, longitude, radius) => {
  try {
    const response = await api.get('/search-places', {
      params: {
        latitude,
        longitude,
        radius,
      },
      headers: {
        'Access-Control-Allow-Origin': '*', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
};

