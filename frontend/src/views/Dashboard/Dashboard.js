/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Header from '../Header/Header';
import HeaderDashboard from '../Home/HomeDashboard';

class Dashboaard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HeaderDashboard />
      </div>
    );
  }
}

export default Dashboaard;
