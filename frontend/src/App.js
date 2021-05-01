/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import CommunityHomePage from './views/CommunityHomePage/CommunitiyHomePage';
import CreatePost from './views/Post/CreatePost';
import MyCommunity from './views/MyCommunity/MyCommunity';

function App() {
  return (
    <Container fluid style={{ 'background-color': '#eeeeee' }}>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/communityhomepage" component={CommunityHomePage} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/mycommunity" component={MyCommunity} />
      </Switch>
    </Container>
  );
}

export default App;
