import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import PropTypes from "prop-types";
import RedditGroup from "../../assets/redditGroup.jpeg";

const CommunityCard = ({community, showEdit}) => {
    const [showMoreOption, setShowMoreOption] = useState(false);
    const history = useHistory();
    const toggleShowMoreOption = () => {
        setShowMoreOption(!showMoreOption);
    }
    return community ? (
        <div className='profile-container'>
            <div className='top-background'>
                <div className='avatar-cont'>
                    <img src={community.photo || RedditGroup} alt={community.community_name}/>
                    {
                        showEdit && (
                            <div className='edit-cont'>
                                <EditIcon style={{color: '#34a7fc'}} />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='main-container'>
                <div className='setting-cont'>
                    <SettingsIcon style={{color: '#0079d3'}}/>
                </div>
                <div className='name-container'>
                    <h4>{community.community_name}</h4>
                    <span>{community.id}</span>
                </div>
                <div className='name-container'>
                    <h4>Community Created On {new Date(community.createdAt).toDateString()}</h4>
                </div>
                <div className='description-cont'>
                    <p><b>{community.description}</b></p>
                </div>
                {
                    community.members && (
                        <div className='description-cont'>
                            <p><b>Total Number of Active Users are {community.members.length}</b></p>
                        </div>
                    )
                }
                {
                    community.posts && (
                        <div className='description-cont'>
                            <p><b>Total Number of Posts are {community.posts.length}</b></p>
                        </div>
                    )
                }

                <button className='round-btn blue-btn' type='button' onClick={()=> history.push('/createpost')}>
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
    ) : (
        <div className='profile-container'>
            <div className='top-background'>
                Empty Community Data!
            </div>
        </div>
    )
}

CommunityCard.propTypes = {
    community: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        community_name: PropTypes.string,
        createdAt: PropTypes.string,
        photo: PropTypes.string,
        description: PropTypes.string,
        members: PropTypes.shape([]),
        posts: PropTypes.shape([]),
    }).isRequired,
    showEdit: PropTypes.bool.isRequired,
};

export default CommunityCard;
