import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';

function App() {
  return (
    <Container fluid>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Container>
  );
}

export default App;
