import React from 'react';
import './ArtCard.css';

const ArtCard = ({ item }) => {
  return (
    <div style={{ border: '1px solid black', width: 180, margin: 10, padding: 10 }}>
      <p>{item.title}</p>
      <img
        src={item.primaryImageSmall || 'https://via.placeholder.com/180x240?text=No+Image'}
        alt={item.title}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default ArtCard;