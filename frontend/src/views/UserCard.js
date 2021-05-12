import React, {useState} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";


const UserCard = ({user, showEdit}) => {
    const [showMoreOption, setShowMoreOption] = useState(false);
    const toggleShowMoreOption = () => {
        console.log('Toggle Show More Options')
        console.log(user);
        setShowMoreOption(!showMoreOption);
    }
    return (
        <div className='profile-container'>
            <div className='top-background'>
                <div className='avatar-cont'>
                    <img src={user.avatar || 'https://picsum.photos/id/237/200/300'} alt={user.name}/>
                    {
                        showEdit && (
                            <div className='edit-cont'>
                                <EditIcon style={{color: '#34a7fc'}} />
                            </div>
                        )
                    }
                </div>
                {
                    showEdit && (
                        <div className='edit-cont'>
                            <EditIcon style={{color: '#34a7fc'}}/>
                        </div>
                    )
                }
            </div>
            <div className='main-container'>
                <div className='setting-cont'>
                    <SettingsIcon style={{color: '#0079d3'}}/>
                </div>
                <div className='name-container'>
                    <h4>{user.name}</h4>
                    <span>{user.userName}</span>
                </div>
                {
                    showEdit && (
                        <button className='round-btn red-btn' type='button'>
                            <span>&nbsp;</span>
                            <span>Create Avatar</span>
                            <ArrowForwardIosIcon/>
                        </button>
                    )
                }
                <div className='description-cont'>
                    <p>{user.description}</p>
                </div>
                <div className='repo-cont'>
                    <div className='karma'>
                        <span className='label'>Karma</span>
                        <span>12</span>
                    </div>
                    <div className='cake'>
                        <span className='label'>Cake day</span>
                        <span>
                            {new Date(user.createdAt) !== 'Invalid Date' ? new Date(user.createdAt).toDateString() : ''}
                        </span>
                    </div>
                </div>
                {
                    showEdit && (
                        <button className='round-btn blue-btn' type='button'>
                            <span>&nbsp;</span>
                            <span>New Post</span>
                            <span>&nbsp;</span>
                        </button>
                    )
                }
                <div className='option-toggle'>
                    <span onClick={toggleShowMoreOption}
                          onKeyDown={toggleShowMoreOption}
                          role="button"
                          tabIndex={0}
                    >{showMoreOption ? 'More Options' : 'Fewer Options'}</span>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        userName: PropTypes.string,
        avatar: PropTypes.string,
        description: PropTypes.string,
        createdAt: PropTypes.string
    }).isRequired,
    showEdit: PropTypes.bool.isRequired,
};

export default UserCard;
