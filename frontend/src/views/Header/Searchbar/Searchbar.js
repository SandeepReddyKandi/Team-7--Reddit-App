/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import './Searchbar.css';

import SearchIcon from '@material-ui/icons/Search';

export default function Searchbar() {
  return (
    <div className="searchbar"  style={{display:'contents' }}>
      <label htmlFor="searchbar" style={{width: '50%' }}>
        <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
          <SearchIcon
            className="icon"
            style={{ color: 'darkgray', position: 'absolute', marginLeft: 10 }}
          />
          <input id="searchbar" placeholder="Search" />
        </div>
      </label>
    </div>
  );
}
