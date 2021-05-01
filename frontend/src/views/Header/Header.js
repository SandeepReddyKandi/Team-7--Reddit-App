/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from './Logo/Logo';
import Searchbar from './Searchbar/Searchbar';
import Actions from './Actions/Actions';

export default function Header() {
  return (
    <header>
      <Row>
        <Col>
          <AppBar position="static" color="default" width="100%">
            <Toolbar variant="dense">
              <Col md={3} alignContent>
                <Logo />
              </Col>
              <Col md={6}>
                <div>
                  <Searchbar />
                </div>
              </Col>
              <Col md={3} >
                <Actions />
              </Col>
            </Toolbar>
          </AppBar>
        </Col>
      </Row>
    </header >
  )
}