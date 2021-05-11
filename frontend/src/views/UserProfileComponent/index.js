import React from 'react';
import UserCard from "../UserCard";
import './index.css';
import UserDetailsCard from "../UserDetailsCard";

class UserProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                avatar: 'https://picsum.photos/id/237/200/300',
                name: 'Kandi Sandeep',
                userName: 'u/sandeep-reddy',
                about: 'Nothing much, just getting bored!'
            },
        }
    }

    render () {
        const { user } = this.state;
        return (
            <>
                <UserCard user={user} showEdit />
                <UserDetailsCard user={user} isMyProfile />
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
