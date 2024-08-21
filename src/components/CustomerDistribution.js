import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import records from '../TestData/shopifyCustomer';

const CustomerDistribution = () => {
  // Use a custom icon for markers
  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Extract unique city locations from customer data, filtering out invalid coordinates
  const locations = records
    .filter(customer => customer.default_address.latitude && customer.default_address.longitude)
    .map(customer => ({
      city: customer.default_address.city,
      latitude: customer.default_address.latitude,
      longitude: customer.default_address.longitude,
    }));

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
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
  );
};

export default CustomerDistribution;
