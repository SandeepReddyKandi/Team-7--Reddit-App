/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import HomeDashboard from './HomeDashboard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <HomeDashboard />
        <Footer />
      </>
    );
  }
}

export default Home;
