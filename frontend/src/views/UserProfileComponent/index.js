import React from 'react';
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import './user-profile.css';

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
            showMoreOption: false,
        }
    }

    render () {
        const { user, showMoreOption } = this.state;
        return (
            <>
                <div className='profile-container'>
                    <div className='top-background'>
                        <div className='avatar-cont'>
                            <img src={user.avatar} alt={user.name}/>
                            <div className='edit-cont'>
                                <EditIcon style={{color: '#34a7fc'}}/>
                            </div>
                        </div>
                        <div className='edit-cont'>
                            <EditIcon style={{color: '#34a7fc'}}/>
                        </div>
                    </div>
                    <div className='main-container'>
                        <div className='setting-cont'>
                            <SettingsIcon style={{color: '#0079d3'}}/>
                        </div>
                        <div className='name-container'>
                            <h4>{user.name}</h4>
                            <span>{user.userName}</span>
                        </div>
                        <button className='round-btn red-btn' type='button'>
                            <span>&nbsp;</span>
                            <span>Create Avatar</span>
                            <ArrowForwardIosIcon/>
                        </button>
                        <div className='description-cont'>
                            <p>{user.about}</p>
                        </div>
                        <div className='repo-cont'>
                            <div className='karma'>
                                <span className='label'>Karma</span>
                                <span>12</span>
                            </div>
                            <div className='cake'>
                                <span className='label'>Cake day</span>
                                <span>5 May, 2021</span>
                            </div>
                        </div>
                        <button className='round-btn blue-btn' type='button'>
                            <span>&nbsp;</span>
                            <span>New Post</span>
                            <span>&nbsp;</span>
                        </button>
                        <div className='option-toggle'>
                                        <span onClick={this.toggleShowMoreOption}
                                              onKeyDown={this.toggleShowMoreOption}
                                              role="button"
                                              tabIndex={0}
                                        >{showMoreOption ? 'More Options' : 'Fewer Options'}</span>
                        </div>
                    </div>
                </div>
                <div className="trophy-container">
                    <div className="header-container">
                        <h2>Trophy Case (1)</h2>
                    </div>
                    <div className="trophy-main-container">
                        <div className="trophy-main-content">
                            <div className="img-cont">
                                <img src="https://www.redditstatic.com/awards2/n00b-40.png" title="New User"
                                     alt='new-user'/>
                            </div>
                            <div className="text-cont">
                                <h5>New User</h5>
                                <p>Nothing Special, Just a regular dev!</p>
                            </div>
                        </div>
                    </div>
                </div>
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
