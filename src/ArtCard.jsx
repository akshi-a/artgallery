import React, { useState } from 'react';
import './ArtCard.css';

const ArtCard = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} 
         onClick={() => setFlipped(!flipped)}
         onKeyDown={(e) => {
            if (e.key === "Enter") setFlipped(!flipped);
        }}
        tabIndex={0}
        role="button"
        aria-pressed={flipped}>
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
          {item.region && <p><strong>Region:</strong> {item.region}</p>}
          {item.subregion && <p><strong>Subregion:</strong> {item.subregion}</p>}
          {item.country && <p><strong>Country:</strong> {item.country}</p>}
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
