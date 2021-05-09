/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import CommunityHomePage from './views/CommunityHomePage/CommunitiyHomePage';
import CommunitySearchPage from './views/CommunitySearchPage/CommunitySearchPage';
import Invitations from './views/Invitations/Invitations';
import CreatePost from './views/Post/CreatePost';
import UserProfile from './views/UserProfile/UserProfile';
import MyCommunityCreate from './views/MyCommunity/MyCommunityCreate'
import MyCommunity from './views/MyCommunity/MyCommunity';
import ProtectedRoutes from "./views/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <Container fluid style={{ 'background-color': '#eeeeee' }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <ProtectedRoutes exact path="/dashboard" component={Dashboard} />
          <ProtectedRoutes exact path="/user/:uid" component={UserProfile} />
          <ProtectedRoutes exact path="/communityhomepage" component={CommunityHomePage} />
          <ProtectedRoutes exact path="/communitysearchpage" component={CommunitySearchPage} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/invitations" component={Invitations} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/createCommunity" component={MyCommunityCreate} />
          <ProtectedRoutes exact path="/myCommunity" component={MyCommunity} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
