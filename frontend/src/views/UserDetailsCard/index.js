import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PropTypes from "prop-types";

const UserDetailsCard = ({ user, isMyProfile }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        ...user,
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        // eslint-disable-next-line no-console
        console.log('Handle Cancel');
    }

    const handleSave = () => {
        // eslint-disable-next-line no-console
        console.log('Handle Save');

    }

    return (
        <div className="trophy-container profile-container">
            <div className="header-container">
                <h2>User Detail Card</h2>
            </div>
            <div className="trophy-main-container">
                <div className='user-data'>
                    <TextField id="name" label="Name" name='name' defaultValue={formData.name} value={formData.name} onChange={handleChange}/>
                    <FormLabel component="legend" style={{ fontSize: '12px'}}>Gender</FormLabel>
                    <RadioGroup id='gender' aria-label="gender" name="gender1" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <TextField id="location" label="Location" name='location' defaultValue={formData.location} value={formData.location} onChange={handleChange}/>
                    <TextField id="description" label="Description" name='description' defaultValue={formData.description} value={formData.description} onChange={handleChange}/>
                    <TextField id="password" type='password' label="Name" name='password' defaultValue={formData.password} value={formData.password} onChange={handleChange}/>
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
        avatar: PropTypes.string,
        about: PropTypes.string
    }).isRequired,
    isMyProfile: PropTypes.bool.isRequired,
};

export default UserDetailsCard;
