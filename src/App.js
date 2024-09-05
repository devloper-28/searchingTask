import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import PlacesTable from './components/PlacesTable';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchBoxRef = useRef(null); 

  useEffect(() => {
    if (searchTerm) {
      fetchPlaces();
    }
  }, [searchTerm, currentPage, limit]);
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchBoxRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: { namePrefix: searchTerm, limit: limit, offset: (currentPage - 1) * limit },
        headers: {
          'x-rapidapi-key': "698b2db5eemshbc366c04750fed4p101a69jsnbcc39c3d0767",
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      });
      setPlaces(response.data.data);
      setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (e) => {
    const value = Math.max(5, Math.min(10, parseInt(e.target.value) || 5)); 
    setLimit(value);
  };

  return (
    <div className="app-container">
      <SearchBox onSearch={handleSearch} searchBoxRef={searchBoxRef}  />
      <PlacesTable places={places} loading={loading} />
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <div className="limit-container">
          <label htmlFor="limit">Cities per page:</label>
          <input
            type="number"
            id="limit"
            min="5"
            max="10"
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
