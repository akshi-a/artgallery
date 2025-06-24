import React, { useState } from 'react';
import './ArtCard.css';

const ArtCard = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card" onClick={() => setFlipped(!flipped)}>
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-front">
          <img
            className="art-image"
            src={item.primaryImageSmall || 'https://via.placeholder.com/200x300?text=No+Image'}
            alt={item.title}
          />
        </div>

        {/* Back */}
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
