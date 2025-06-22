import React from 'react';
import './ArtCard.css';

const ArtCard = ({ item }) => {
  return (
    <div 
      className = "art-card" 
     >   
      <img
        className="art-image"
        src={item.primaryImageSmall || 'https://via.placeholder.com/180x240?text=No+Image'}
        alt={item.title}        
      />
    </div>
    
  );
};

export default ArtCard;