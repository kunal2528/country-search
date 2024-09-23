import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { loadMoreItems, setItems } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';

function App() {
  const dispatch = useDispatch();
  const { paginatedItems, allItemsLoaded } = useSelector((state) => state.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setItems(data.countries));
    } catch (error) {
      setError(error.message);
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || allItemsLoaded) return;

    setLoading(true);
    setTimeout(() => {
      dispatch(loadMoreItems());
      setLoading(false);
    }, 1000);
  }, [dispatch, loading, allItemsLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Country list</h1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <SearchBar />
        <ItemList items={paginatedItems} />
        {loading && <h3>Loading more countries ..</h3>}
        {allItemsLoaded && <p>All countries loaded!</p>}
        {error && <p style={{ color: 'red' }}>Error fetching countries: {error}</p>}
      </div>
    </>
  );
};

export default App;
