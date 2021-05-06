import React, {useState} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";
import '../UserProfileComponent/user-profile.css';

const CommunityCard = ({community, showEdit}) => {
    const [showMoreOption, setShowMoreOption] = useState(false);
    const toggleShowMoreOption = () => {
        console.log('Toggle Show More Options')
        setShowMoreOption(!showMoreOption);
    }
    return (
        <div className='profile-container'>
            <div className='top-background'>
                <div className='avatar-cont'>
                    <img src={community.avatar} alt={community.name}/>
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
                    <h4>{community.name}</h4>
                    <span>{community.id}</span>
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
                    <p>{community.about}</p>
                </div>
                <button className='round-btn blue-btn' type='button'>
                    <span>&nbsp;</span>
                    <span>New Post</span>
                    <span>&nbsp;</span>
                </button>
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

CommunityCard.propTypes = {
    community: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
        about: PropTypes.string
    }).isRequired,
    showEdit: PropTypes.bool.isRequired,
};

export default CommunityCard;
