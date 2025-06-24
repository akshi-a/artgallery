import React, { useState } from 'react';
import './ArtCard.css';

const ArtCard = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="flip-inner">
        {/* This wrapper is NOT absolute: it sizes the card naturally */}
        <div className="flip-front-wrapper">
          <img
            loading="lazy"
            src={item.primaryImageSmall || 'https://via.placeholder.com/150x200?text=No+Image'}
            alt={item.title}
            className="art-image"
          />
        </div>

        {/* Back side stays absolute */}
        <div className="flip-back">
          <h3>{item.title}</h3>
          <p><strong>Artist:</strong> {item.artistDisplayName || 'Unknown'}</p>
          <p><strong>Date:</strong> {item.objectDate}</p>
          <p><strong>Medium:</strong> {item.medium}</p>
          <p><strong>Dimensions:</strong> {item.dimensions}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
