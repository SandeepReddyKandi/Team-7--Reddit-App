/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Header from '../Header/Header';
import TextDisplayCard from '../Cards/TextDisplayCard';
import TopBar from '../ToolBar/TopBar';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                avatar: 'https://picsum.photos/id/237/200/300',
                name: 'Mukul Kumar Jha',
                userName: 'u/mukul-kmr-jha',
                about: 'Nothing much, just getting bored!'
            },
            showMoreOption: false,
        }
    }

    toggleShowMoreOption = () => {
        console.log('Toggle Show More Options')
    }

    render() {
        const { user, showMoreOption } = this.state;
        return (
            <div>
                <Header />
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <TopBar />
                            <TextDisplayCard />
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <div className='profile-container'>
                                <div className='top-background'>
                                    <div className='avatar-cont'>
                                        <img src={user.avatar} alt={user.name}/>
                                        <div className='edit-cont'>
                                            <EditIcon style={{ color: '#34a7fc' }}/>
                                        </div>
                                    </div>
                                    <div className='edit-cont'>
                                        <EditIcon style={{ color: '#34a7fc' }} />
                                    </div>
                                </div>
                                <div className='main-container'>
                                    <div className='name-container'>
                                        <h4>{user.name}</h4>
                                        <span>{user.userName}</span>
                                    </div>
                                    <button className='round-btn red-btn' type='button'>
                                        <span>&nbsp;</span>
                                        <span>Create Avatar</span>
                                        <ArrowForwardIosIcon />
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
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UserProfile;
