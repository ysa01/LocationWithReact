import React, { useState } from 'react';
import NearbyPlacesForm from './components/NearbyPlacesForm';
import { searchPlaces } from './services/Api';

function App() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (latitude, longitude, radius) => {
    try {
      const result = await searchPlaces(latitude, longitude, radius);

      // Gelen veriyi burada işle
      const placeNames = result.map(place => place.name);

      setPlaces(placeNames);
      setError(null);
    } catch (error) {
      console.error('Error searching places:', error);
      setPlaces([]);
      setError('An error occurred while fetching nearby places.');
    }
  };

  return (
    <div className="app">
      <h1>Nearby Places App</h1>
      <NearbyPlacesForm onSubmit={handleSearch} />
      <div className="places-list">
        <h2>Nearby Places:</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              <h3>{place}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
