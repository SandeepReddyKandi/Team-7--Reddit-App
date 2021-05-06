import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../Header/Header";
import UserProfileComponent from "../UserProfileComponent";
import './community-analytics.css';

class CommunityAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                name: 'Hello SJSU!',
                id: 'r/hello_sjsu',
            }
        }
    }

    render() {
        const { community } = this.state;
        return (
            <>
                <Header showLogin={false} showSignup={false} />
                <div className='analytics-container'>
                    <div className="">
                        <span className='comm-top-background'>
                            <a className="" href='/bala'>
                                <div className=""/>
                            </a>
                        </span>
                        <div className="comm-header">
                            <div className="comm-header-cont">
                                <img src="https://styles.redditmedia.com/t5_2rhz9/styles/communityIcon_gyisrr8vpei31.png?width=256&amp;s=421b4a63cfb7177d75995968607256509dc9496e" alt='i'/>
                                <div className="comm-header-text-cont">
                                    <h1 className="">Community Analytics Page</h1>
                                    <h2 className="">Track and measure interaction in your communities here!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <div className='comm-card'>
                                <div className='comm-card-head'>Active User Info</div>
                                <div className='info-card'>
                                    <span>Current number of active users</span>
                                    <span className='value'>230</span>
                                </div>
                                <div className='info-card'>
                                    <span>Maximum number of active users of all time</span>
                                    <span className='value'>480</span>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <UserProfileComponent />
                            {community.name}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CommunityAnalytics;
