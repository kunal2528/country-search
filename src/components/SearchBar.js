import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.items.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search country .."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{borderRadius: '20px', height: '30px', width: '200px', fontSize: '16px', padding: '2px 15px', border: '1px solid gray', outline: 'none'}}
    />
  );
};

export default React.memo(SearchBar);
