import React from 'react';
import axios from "axios";
import constants from "../../constants/constants";
import UserCard from "../UserCard";
import UserDetailsCard from "../UserDetailsCard";
import './index.css';

class UserProfileComponent extends React.Component {
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

    render () {
        const { user, isMyProfile } = this.state;
        return (
            <>
                <UserCard user={user} isMyProfile={isMyProfile} />
                <UserDetailsCard user={user} isMyProfile={isMyProfile} />
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
            </>
        )
    }
}

export default UserProfileComponent;
