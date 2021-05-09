/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Header from '../Header/Header';
import TopBar from '../ToolBar/TopBar';
import UserProfileComponent from "../UserProfileComponent/index";
import './index.css';

class UserProfile extends React.Component {

    render() {
        return (
            <Row>
                <Header showLogin={false} showSignup={false}/>
                <div className="tabs-container">
                    <Container>
                        <Row className="tabs-content" >
                            <div className="tabs-items-cont">
                                <a className="tab-item active" href="/kandi/">Overview</a>
                                <a className="tab-item" href="/kandi/posts/">Posts</a>
                                <a className="tab-item" href="/kandi/posts/">Commented</a>
                                <a className="tab-item" href="/kandi/posts/">Saved</a>
                                <a className="tab-item" href="/kandi/posts/">Hidden</a>
                                <a className="tab-item" href="/kandi/posts/">Upvoted</a>
                                <a className="tab-item" href="/kandi/posts/">DownVoted</a>
                                <a className="tab-item" href="/kandi/posts/">Awards Recieved</a>
                                <a className="tab-item" href="/kandi/posts/">Awards Given</a>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <TopBar />
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <UserProfileComponent/>
                        </Col>
                    </Row>
                </Container>
            </Row>
        );
    }
}

export default UserProfile;
