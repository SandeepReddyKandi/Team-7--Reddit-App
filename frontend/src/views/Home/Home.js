/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Header from '../Header/Header';
import SignUp from '../Signup/Signup';
import Login from '../Login/Login';
import image from '../../Landing.png';

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
        <img style={{marginTop:'1%'}} src={image} alt="background" className="img-fluid" width="100%" height="700px"/>
        {showSignup && <SignUp showSignup={this.showParentSignup} />}
        {showLogin && <Login showLogin={this.showParentLogin} />}
      </>
    );
  }
}

export default Home;
