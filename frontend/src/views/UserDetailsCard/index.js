import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";
import axios from "axios";
import constants from "../../constants/constants";

const UserDetailsCard = ({ user, isMyProfile }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        topics: [],
        location: '',
        description: '',
        gender: '',
        ...user,
        password: '',
    })
    const [currentTopic, setCurrentTopic] = useState('');

    useEffect(() => {
        setFormData({
            topics: [],
            ...user,
            password: '',
        });
    }, [user.userName])



    const handleChange = (e) => {
        console.log( formData);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        // eslint-disable-next-line no-console
        console.log('Handle Cancel');
        setShowEditForm(false);
    }

    const handleSave = () => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('token')}`;
        const data = {
            userName: formData.userName,
            name: formData.name,
            gender: formData.gender,
            location: formData.location,
            description: formData.description,
            topics: formData.topics,
        };
        axios.post(`${constants.baseUrl}/users/profile`, data)
            .then((response, error) => {
                if (error) {
                    console.log(error.msg);
                } else {
                    setShowEditForm(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChipDelete = () => {
        // eslint-disable-next-line no-console
        console.log('Handle Chip Delete');
    }

    const handleAddTopic = () => {
        setFormData({
            ...formData,
            topics: [ ...formData.topics, currentTopic],
        });
        setCurrentTopic('');
    }

    return (
        <div className="trophy-container profile-container">
            <div className="header-container">
                <h2>User Detail Card</h2>
            </div>
            <div className="trophy-main-container">
                <div className='user-data'>
                    <TextField id="userName" label="User Name" name='userName' defaultValue={formData.userName} value={formData.userName} disabled/>
                    <TextField id="name" label="Name" name='name' defaultValue={formData.name} value={formData.name} onChange={handleChange} disabled={!showEditForm}/>
                    <FormLabel component="legend" style={{ fontSize: '12px'}}>Gender</FormLabel>
                    <RadioGroup id='gender' aria-label="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} checked={formData.gender ? formData.gender.toLowerCase() === 'female' : false } label="Female" disabled={!showEditForm} />
                        <FormControlLabel value="male" control={<Radio />} checked={formData.gender ? formData.gender.toLowerCase() === 'male' : false } label="Male" disabled={!showEditForm} />
                        <FormControlLabel value="other" control={<Radio />} checked={formData.gender ? formData.gender.toLowerCase() === 'other' : false } label="Other" disabled={!showEditForm} />
                    </RadioGroup>
                    <TextField id="location" label="Location" name='location' defaultValue={formData.location} value={formData.location} onChange={handleChange} disabled={!showEditForm}/>
                    <TextField id="description" label="Description" name='description' defaultValue={formData.description} value={formData.description} onChange={handleChange} disabled={!showEditForm}/>
                    <TextField id="password" type='password' label="Password" name='password' defaultValue={formData.password} value={formData.password} onChange={handleChange} />
                    <div className='topics-input-cont'>
                        <TextField id="topics" label="Add Topic" name='topics' defaultValue={currentTopic} value={currentTopic} onChange={(e) => setCurrentTopic(e.target.value)} disabled={!showEditForm}/>
                        <Button variant="contained" onClick={handleAddTopic} disabled={!showEditForm}>
                            Add Topic
                        </Button>
                    </div>
                    <div className='topics-list-cont'>
                        {formData.topics.map(topic =>(
                                <Chip
                                    label={topic}
                                    onDelete={ () => handleChipDelete(topic)}
                                    color="primary"
                                    disabled={!showEditForm}
                                />
                            )
                        )}
                    </div>
                </div>
                <div className='edit-btns-container'>

                    {
                        !showEditForm && isMyProfile && (
                            <button className='round-btn red-btn' type='button' onClick={() => setShowEditForm(true)}>
                                <span>&nbsp;</span>
                                <span>Edit</span>
                                <ArrowForwardIosIcon/>
                            </button>
                        )
                    }
                    {
                        showEditForm && isMyProfile && (
                            <>
                                <button className='round-btn red-btn' type='button' onClick={handleCancel}>
                                    <span>&nbsp;</span>
                                    <span>Cancel</span>
                                    <ArrowForwardIosIcon/>
                                </button>
                                <button className='round-btn green-btn' type='button' onClick={handleSave}>
                                    <span>&nbsp;</span>
                                    <span>Save</span>
                                    <ArrowForwardIosIcon/>
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


UserDetailsCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        userName: PropTypes.string,
        photo: PropTypes.string,
        about: PropTypes.string
    }).isRequired,
    isMyProfile: PropTypes.bool.isRequired,
};

export default UserDetailsCard;
