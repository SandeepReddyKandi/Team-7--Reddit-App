/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Header from '../Header/Header';
import TopBar from '../ToolBar/TopBar';
import UserProfileComponent from "../UserProfileComponent/index";

class UserProfile extends React.Component {
    toggleShowMoreOption = () => {
        console.log('Toggle Show More Options')
    }

    render() {
        return (
            <div>
                <Header showLogin={false} showSignup={false}/>
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <TopBar />
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <UserProfileComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UserProfile;
