/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import './Logo.css';
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo hoverable">
      <img src="./assets/reddit_logo.png" alt="logo" />
      <div className="splitwise-icon">
        <Link className="navbar-brand" to="/dashboard" style={{cursor:'pointer' ,color:'black', fontWeight:'bold'}}>
          reddit
      </Link>
      </div>
    </div >
  );
}
