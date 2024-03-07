import React, { useState } from 'react';
import './NearbyPlacesForm.css'; 
import { searchPlaces } from '../services/Api';

const NearbyPlacesForm = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [radius, setRadius] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await searchPlaces(longitude, latitude, radius);
      console.log('result:', result);
      setNearbyPlaces(result);
      setError(null);
    } catch (error) {
      console.error('Error searching places:', error);
      setNearbyPlaces([]);
      setError('Error searching places. Please try again.');
    }
  };

  return (
    <div>
      <form className="nearby-places-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Longitude:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Latitude:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Radius:
            <input
              type="text"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Get Nearby Places</button>
      </form>

      {error && <div>Error: {error}</div>}

      {Array.isArray(nearbyPlaces) && nearbyPlaces.length > 0 ? (
  <div className="places-list">
    <h2>Nearby Places:</h2>
    <ul>
      {nearbyPlaces.map((place, index) => (
        <li key={index}>{place}</li>
      ))}
    </ul>
  </div>
) : (
  <p>No nearby places found.</p>
)}
    </div>
  );
};

export default NearbyPlacesForm;
