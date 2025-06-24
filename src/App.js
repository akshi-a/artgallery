import React, { useState } from 'react';
import ArtCard from './ArtCard';

const MetArtExplorer = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchArtworks = async () => {

    // Met API 
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`
      );
      const searchData = await searchRes.json();
      const allIDs = searchData.objectIDs || [];
      const randomIDs = allIDs.sort(() => 0.5 - Math.random()).slice(0, 25);


      const detailPromises = randomIDs.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
      );
      const detailedResults = await Promise.all(detailPromises);
      const filteredResults = detailedResults.filter(item => item.primaryImageSmall && item.primaryImageSmall.length > 0);

      const random10 = filteredResults.sort(() => 0.5 - Math.random()).slice(0, 10);

      console.log("Query:", query);
      console.log("Results:", random10);   
      setResults(random10);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎨 Met Museum Art Explorer</h1>
      <input
        type="text"
        placeholder="Search for an artist, title, keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginBottom: '2rem' }}
      />
      <button onClick={searchArtworks} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}


      <div className="gallery-grid">

        {results.map(item => (
          <ArtCard key={item.objectID} item={item} />
        ))}
      </div>
  
      
      
    </div>
  );
};

export default MetArtExplorer;
