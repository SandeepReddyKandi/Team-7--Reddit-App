/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import CommunityHomePage from './views/CommunityHomePage/CommunityHomePage';
import CommunitySearchPage from './views/CommunitySearchPage/CommunitySearchPage';
import CommunityAnalytics from './views/CommunityAnalytics';
import Chat from './views/Chat/Chat';
import Invitations from './views/Invitations/Invitations';
import CreatePost from './views/Post/CreatePost';
import UserProfile from './views/UserProfile/UserProfile';
import MyCommunity from './views/MyCommunity/MyCommunity';
import MyCommunityCreate from './views/MyCommunity/MyCommunityCreate';
import ProtectedRoutes from './views/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <Container fluid style={{ 'background-color': '#eeeeee' }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <ProtectedRoutes exact path="/dashboard" component={Dashboard} />
          <ProtectedRoutes exact path="/user/:uid" component={UserProfile} />
          <ProtectedRoutes exact path="/community-homepage" component={CommunityHomePage} />
          <ProtectedRoutes exact path="/community-searchpage" component={CommunitySearchPage} />
          <ProtectedRoutes exact path="/community-analytics" component={CommunityAnalytics} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/invitations" component={Invitations} />
          <ProtectedRoutes exact path="/chat" component={Chat} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/createCommunity" component={MyCommunityCreate} />
          <ProtectedRoutes exact path="/myCommunity" component={MyCommunity} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
