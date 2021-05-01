/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Header from '../Header/Header';
import CommunityAppBar from '../ToolBar/CommunityAppBar';
import TextDisplayCard from '../Cards/TextDisplayCard';
import SideBar from './Sidebar/Sidebar';

class Dashboaard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md={8}>
              <br />
              <CommunityAppBar />
              <TextDisplayCard />
            </Col>
            <Col md={4}>
              <br />
              <div className="bars-wrapper-inside" style={{
                borderRadius: 'var(--border-radius)',
                border: '1px solid darkgray', backgroundColor: 'white'
              }}>
                <SideBar />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboaard;
