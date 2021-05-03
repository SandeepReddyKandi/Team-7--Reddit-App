/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Header from '../Header/Header';
import TextDisplayCard from '../Cards/TextDisplayCard';
import TopBar from '../ToolBar/TopBar';
import RedditICon from '../../community.png';

class UserProfile extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col md={8}>
                            <br />
                            <TopBar />
                            <TextDisplayCard />
                        </Col>
                        <Col md={4}>
                            <br />
                            <Row>
                                <div style={{ marginLeft: '5%' }}>
                                    <Row style={{ height: '50px', 'background-color': '#0579d3' }}>
                                        <Col md={10}> &nbsp;</Col>
                                    </Row>
                                    <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                                        <Col md={2}>&nbsp;</Col>
                                        <Col md={11}>
                                            <Row>
                                                <Col md={2}>&nbsp;</Col>
                                                <Col md={1}>
                                                    <Avatar alt="Remy Sharp" src={RedditICon} className="card-img-top"
                                                        style={{
                                                            height: '16px', width: '16px'
                                                        }} />
                                                </Col>
                                                <Col md={5} style={{
                                                    alignItems: 'center', textAlign: 'right'
                                                }}>
                                                    <Typography variant="dense" component="h6">
                                                        {' '}
                                                        Shrimp and Chorizo Paella
                                                    </Typography>
                                                    <div>
                                                        <Typography variant="h7" component="h7" className="header-label">
                                                            r/shrimp
                                                        </Typography>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: '10%', 'background-color': '#ffffff', height: '20%' }}>
                                        <Col md={2}>&nbsp;</Col>
                                        <p>name</p>
                                    </Row>
                                    <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                                        <Col md={2}>&nbsp;</Col>
                                        <p>communities</p>
                                    </Row>
                                    <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                                        <Col md={2}>&nbsp;</Col>
                                        <p>location</p>
                                    </Row>
                                    <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
                                        <Col md={2}>&nbsp;</Col>
                                        <p>preferences</p>
                                    </Row>
                                </div>
                            </Row>                            
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UserProfile;