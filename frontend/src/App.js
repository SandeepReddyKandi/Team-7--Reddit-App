/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import CommunityHomePage from './views/CommunityHomePage/CommunityHomePage';
import CommunitySearchPage from './views/CommunitySearchPage/CommunitySearchPage';
import CommunityAnalytics from './views/CommunityAnalytics';
import Chat from './views/Chat/Chat';
import Invitations from './views/Invitations/Invitations';
import CreatePost from './views/Post/CreatePost';
import UserProfile from './views/UserProfile/UserProfile';
import MyProfile from './views/MyProfile/index';
import MyCommunity from './views/MyCommunity/MyCommunity';
import MyCommunityCreate from './views/MyCommunity/MyCommunityCreate';
import ProtectedRoutes from './views/ProtectedRoutes/ProtectedRoutes';
import CommunityModeration from './views/CommunityModeration/CommunityModeration';

function App() {
  const history = createBrowserHistory();
  return (
    <Container fluid style={{ 'background-color': '#eeeeee' }}>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <ProtectedRoutes exact path="/dashboard" component={Dashboard} />
          <ProtectedRoutes exact path="/users/" component={UserProfile} />
          <ProtectedRoutes exact path="/my-profile/:userName" component={MyProfile} />
          <ProtectedRoutes exact path="/communityhomepage" component={CommunityHomePage} />
          <ProtectedRoutes exact path="/communitysearchpage" component={CommunitySearchPage} />
          <ProtectedRoutes exact path="/community-analytics" component={CommunityAnalytics} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/invitations" component={Invitations} />
          <ProtectedRoutes exact path="/chat" component={Chat} />
          <ProtectedRoutes exact path="/createpost" component={CreatePost} />
          <ProtectedRoutes exact path="/createCommunity" component={MyCommunityCreate} />
          <ProtectedRoutes exact path="/myCommunity" component={MyCommunity} />
          <ProtectedRoutes exact path="/communitymoderation" component={CommunityModeration} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
