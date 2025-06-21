import React from 'react';
import './ArtCard.css';

const ArtCard = ({ item, isExpanded, onSelect, onClose }) => {
  return (
    <div
      className={`flip-card ${isExpanded ? 'expanded' : ''}`}
      onClick={() => !isExpanded && onSelect(item)}
      style={{
        width: isExpanded ? '90vw' : '180px',
        height: isExpanded ? '90vh' : 'auto',
        perspective: '1000px'
      }}
    >
      <div className={`flip-inner ${isExpanded ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="flip-front">
          <img
            src={item.primaryImageSmall || '/bowser.png'}
            alt={item.title}
            style={{ width: '100%', borderRadius: '1rem' }}
          />
          <p><strong>{item.title}</strong></p>
          <p style={{ fontSize: '0.8rem' }}>{item.artistDisplayName || 'Unknown Artist'}</p>
        </div>

        {/* Back Face */}
        <div className="flip-back">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'black',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem'
            }}
          >
            X
          </button>
          <h2>{item.title}</h2>
          <p><strong>Artist:</strong> {item.artistDisplayName || 'Unknown'}</p>
          <p><strong>Date:</strong> {item.objectDate}</p>
          <p><strong>Medium:</strong> {item.medium}</p>
          <p><strong>Dimensions:</strong> {item.dimensions}</p>
          <img
            src={item.primaryImage || '/bowser.png'}
            alt={item.title}
            style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', marginTop: '1rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
