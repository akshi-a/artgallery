import React, { useState } from 'react';
import ArtCard from './ArtCard';

const MetArtExplorer = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const searchArtworks = async () => {

    // Met API 
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setSelected(null);
    setExpandedId(null);

    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`
      );
      const searchData = await searchRes.json();
      const objectIDs = searchData.objectIDs?.slice(0, 30) || [];

      const shuffled = objectIDs.sort(() => 0.5 - Math.random()).slice(0, 12);

      const detailPromises = shuffled.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
      );
      const detailedResults = await Promise.all(detailPromises);
      const filteredResults = detailedResults.filter(item => item.primaryImageSmall && item.primaryImageSmall.length > 0);


      console.log("Query:", query);
      console.log("Results:", detailedResults);   
      setResults(filteredResults);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (obj) => {
    setSelected(obj);
    setExpandedId(obj.objectID)
  };

  const handleClose = () => {
    setExpandedId(null);
    setTimeout(() => setSelected(null), 500); // delay to match reverse animation
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


      <div style={{ display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem', }}>
            {results.map(item => {
              console.log('Rendering item:', item.objectID, item.title);
              return (
                <ArtCard
                  key={item.objectID}
                  item={item}
                  onSelect={() => handleSelect(item)}
                  isExpanded={expandedId === item.objectID}
                  onClose={handleClose}
                />
              );
            })}
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
  
      
      
    </div></div>
  );
};

export default MetArtExplorer;
