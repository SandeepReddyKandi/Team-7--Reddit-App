/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import axios from "axios";
import Header from '../Header/Header';
import UserDetailsCard from "../UserDetailsCard";
import UserCard from "../UserCard";
import constants from "../../constants/constants";
import './index.css';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: window.location.pathname.split('/my-profile/')[1],
            user: {
                photo: '',
                name: '',
                userName: '',
                description: ''
            },
            isMyProfile: false
        }
    }

    componentDidMount() {
        // Get user data from its user id
        this.getUserByUserName().then((data) => {
            this.setState({
                user: {
                    ...data,
                },
                isMyProfile: data.userId === localStorage.getItem('userId')
            });
            console.log( data.userId === localStorage.getItem('userId'), data.userId, localStorage.getItem('userId'))
        });

    }

    getUserByUserName = async () => {
        axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('token')}`;
        axios.defaults.withCredentials = true;
        try {
            const { userId } = this.state;
            const { data: responseData } = await axios.post(`${constants.baseUrl}/users/profile/${userId}`);
            return responseData.data;
        } catch (e) {
            console.log('Something went wrong while fetching the user data');
            return {}
        }
    }

    render() {
        const { user, isMyProfile } = this.state;
        return (
            <>
                <Header showLogin={false} showSignup={false}/>
                <div className="tabs-container">
                    <Container>
                        <Row className="tabs-content" >
                            <div className="tabs-items-cont">
                                <span className="tab-item active"> Overview</span>
                                <span className="tab-item">Posts</span>
                                <span className="tab-item">Commented</span>
                                <span className="tab-item">Saved</span>
                                <span className="tab-item">Hidden</span>
                                <span className="tab-item">Upvoted</span>
                                <span className="tab-item">DownVoted</span>
                                <span className="tab-item">Awards Recieved</span>
                                <span className="tab-item">Awards Given</span>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <div className='comm-card'>
                                <div className='comm-card-head'>Update Your Profile</div>
                            </div>
                            <UserDetailsCard user={user} isMyProfile={isMyProfile} />
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <UserCard user={user} isMyProfile={isMyProfile} />
                            <div className="help-container">
                                <div className="help-content">
                                    <div className="help-col">
                                        <a href="https://www.reddithelp.com" className="help-item">help</a>
                                        <a href="https://www.reddit.com/mobile/download" className="help-item">Reddit App</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Reddit coins</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Reddit Premium</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Reddit gifts</a>
                                    </div>
                                    <div className="help-col">
                                        <a href="https://www.reddithelp.com" className="help-item">About</a>
                                        <a href="https://www.reddit.com/mobile/download" className="help-item">Careers</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Press</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Advertise</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Blog</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Terms</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Content Policy</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Privacy Policy</a>
                                        <a href="https://www.reddit.com/coins" className="help-item">Mod Policy</a>
                                    </div>
                                </div>
                                <div className="right-reserved-cont">Team 7 Reddit Clone Inc © 2021.</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default UserProfile;
