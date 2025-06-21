import React, { useState } from 'react';

const MetArtExplorer = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchArtworks = async () => {

    // Met API 
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setSelected(null);

    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`
      );
      const searchData = await searchRes.json();
      const objectIDs = searchData.objectIDs?.slice(0, 10) || [];

      const detailPromises = objectIDs.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
      );
      const detailedResults = await Promise.all(detailPromises);

      setResults(detailedResults);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (obj) => {
    setSelected(obj);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎨 Met Museum Art Explorer</h1>
      <input
        type="text"
        placeholder="Search for an artist, title, keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={searchArtworks} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
        {results.map((item) => (
          <div
            key={item.objectID}
            onClick={() => handleSelect(item)}
            style={{ 
              cursor: 'pointer', 
              width: '180px',
              border: '2px solid #ccc',           // Added border
              borderRadius: '10px',               // Optional: rounded corners
              boxShadow: '0 2px 8px #eee',        // Optional: subtle shadow
              padding: '0.5rem',                  // Optional: spacing inside border
              background: '#fff'     }}
          >
            <img
              src={item.primaryImageSmall || 'https://via.placeholder.com/300x400?text=No+Image'}
              alt={item.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p><strong>{item.title}</strong></p>
            <p style={{ fontSize: '0.8rem' }}>{item.artistDisplayName || 'Unknown Artist'}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{selected.title}</h2>
          <p><strong>Artist:</strong> {selected.artistDisplayName || 'Unknown'}</p>
          <p><strong>Date:</strong> {selected.objectDate}</p>
          <p><strong>Medium:</strong> {selected.medium}</p>
          <p><strong>Dimensions:</strong> {selected.dimensions}</p>
          <img
            src={selected.primaryImage}
            alt={selected.title}
            style={{ width: '100%', maxWidth: '600px', marginTop: '1rem' }}
          />
        </div>
      )}
    </div>
  );
};

export default MetArtExplorer;
