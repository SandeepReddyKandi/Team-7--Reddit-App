/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import HomeDashboard from './HomeDashboard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignUp from '../Signup/Signup';
import Login from '../Login/Login';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { showLogin: false, showSignup: false };
  }

  showParentLogin = (e) => {
    this.setState({ showLogin: e });
  };

  showParentSignup = (e) => {
    this.setState({ showSignup: e });
  };

  render() {
    const { showLogin, showSignup } = this.state;
    return (
      <>
        <Header showSignup={this.showParentSignup} showLogin={this.showParentLogin} />
        <HomeDashboard />
        <Footer />
        {showSignup && <SignUp showSignup={this.showParentSignup} />}
        {showLogin && <Login showLogin={this.showParentLogin} />}
      </>
    );
  }
}

export default Home;
