import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CustomerDistribution = () => {
  const { customers } = useSelector((state) => state.shopify);
  const [locations, setLocations] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const fetchCoordinates = async (city) => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
          headers: { 'X-Api-Key': `${process.env.REACT_APP_API_KEY}` },
        });
        console.log("firstds", response);
        return response.data.length > 0 ? response.data[0] : null;
      } catch (error) {
        console.error(`Failed to fetch coordinates for ${city}:`, error);
        return null;
      }
    };

    const processCustomers = async () => {
      const locationPromises = customers.map(async (customer) => {
        const { city, latitude, longitude } = customer.default_address;

        if (latitude && longitude) {
          return { city, latitude, longitude };
        } else {
          const coordinates = await fetchCoordinates(city);
          if (coordinates) {
            return {
              city,
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            };
          }
        }
        return null;
      });

      const resolvedLocations = await Promise.all(locationPromises);
      setLocations(resolvedLocations.filter((location) => location));
    };

    processCustomers();
  }, [customers]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Distribution</h2>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }} className="rounded-lg overflow-hidden">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>{location.city}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CustomerDistribution;
