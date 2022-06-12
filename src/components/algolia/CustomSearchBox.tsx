import React, { useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const [query, setQuery] = useState('');

  return (
    <form noValidate action="" role="search">
      <input
        type="search"
        value={query}
        // onChange={event => refine(event.currentTarget.value)}
        onChange={event => setQuery(event.currentTarget.value)}
      />
      <button 
        onClick={(e) => {
          e.preventDefault();

          refine(query);
        }}
      >Submit</button>
      {/* <button onClick={() => refine('')}>Reset query</button> */}
      {/* {isSearchStalled ? 'My search is stalled' : ''} */}
    </form>
  );
}

export const CustomSearchBox = connectSearchBox(SearchBox);