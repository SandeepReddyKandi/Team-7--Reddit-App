import React, {useState, useRef} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";
import RedditMascot from '../assets/redditMascot.jpg';
import constants from "../constants/constants";

const UserCard = ({user, isMyProfile}) => {
    const [showMoreOption, setShowMoreOption] = useState(false);
    const [fileData, setFileData] = useState();
    const [localImageUrl, setLocalImageUrl] = useState();
    const fileUploadInputRef = useRef();

    const history = useHistory();

    const toggleShowMoreOption = () => {
        console.log('Toggle Show More Options')
        console.log(user);
        setShowMoreOption(!showMoreOption);
    }

    const onFileUpload = (e) => {
        setLocalImageUrl(URL.createObjectURL(e.target.files[0]))
        setFileData(e.target.files[0]);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (fileData) {
            formData.set('userprofile',fileData);
        }
        axios.post(`${constants.baseUrl}/users/upload-profile-picture/${user.userName}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', authorization: `Bearer ${localStorage.getItem('token')}` },
          }, { responseType: 'blob'
        }).then((res) => {
            alert('Uploaded successfully!')
            console.log(res)
            setFileData(null)
        }).catch((error) => {
            console.log('Failed to load', error)
        });
    }

    return (
        <div className='profile-container'>
            <div className='top-background'>
                <div className='avatar-cont'>
                    {localImageUrl
                        ? <img src={localImageUrl} alt={user.name}/>
                        : <img src={user.photo || RedditMascot} alt={user.name}/>
                    }
                    {
                        isMyProfile && (
                            <>
                                <input
                                    className="center-align hide"
                                    type="file"
                                    onChange={onFileUpload}
                                    ref={fileUploadInputRef}
                                    style={{ display: "none" }}
                                />
                                <div className='edit-cont' onClick={() => fileUploadInputRef.current.click()} tabIndex={0} role='button' onKeyDown={() => {}}>
                                    <EditIcon style={{color: '#34a7fc'}} />
                                </div>
                            </>
                        )
                    }
                </div>
                {
                    fileData && isMyProfile && (
                        <div className='edit-cont edit-cont-upload' onClick={handleUpdate} tabIndex={0} role='button' onKeyDown={() => {}}>
                            <p>Click to Upload!</p>
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
                    isMyProfile && (
                        <button className='round-btn red-btn' type='button' onClick={ () => history.push('/community-analytics')}>
                            <span>&nbsp;</span>
                            <span>Community Analytics</span>
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
                            {new Date(user.createdAt).toDateString() !== 'Invalid Date' ? new Date(user.createdAt).toDateString() : ''}
                        </span>
                    </div>
                </div>
                {
                    isMyProfile && (
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
        photo: PropTypes.string,
        description: PropTypes.string,
        createdAt: PropTypes.string
    }).isRequired,
    isMyProfile: PropTypes.bool.isRequired,
};

export default UserCard;
