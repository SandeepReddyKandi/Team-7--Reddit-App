/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Talk from 'talkjs';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import constants from '../../constants/constants';

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    // let currentUser;
    // const token = localStorage.getItem('token');
    // const currentTalkjsUser = jwtDecode(token);
    // const currentTalkjsUser = await this.getUserById(localStorage.getItem('user'));
    // if (currentTalkjsUser) {
    //  currentUser = currentTalkjsUser;
    // eslint-disable-next-line no-underscore-dangle
    //  currentUser.id = currentUser._id;
    // }
    this.state = {
      users: [],
      currentUser: '',
    };
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  componentDidMount() {
    this.getUserById(localStorage.getItem('userId'));
  }

  handleClick(userId) {
    /* Retrieve the two users that will participate in the conversation */
    const { currentUser, users } = this.state;
    const user = users.find((u) => u._id === userId);
    // eslint-disable-next-line no-underscore-dangle
    user.id = user._id;
    /* Session initialization code */
    Talk.ready
      .then(() => {
        const me = new Talk.User(currentUser);
        const other = new Talk.User(user);

        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tdR0ruWV',
            me,
          });
        }

        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(conversationId);

        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }

  getUserById(id) {
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUserById?id=${id}`)
      .then((response, error) => {
        if (!error) {
          const currentUser = response.data.data[0];
          currentUser.id = currentUser._id;
          this.setState({ currentUser });
        }
      })
      .catch((error) => {
        // this.setState({
        //  error: error.response.msg,
        // });
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  getUsers(e) {
    const nameFilter = e.target.value;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/users/getUsersByName?name=${nameFilter}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            users: response.data.data,
          });
        }
      })
      .catch((error) => {
        // this.setState({
        //  error: error.response.msg,
        // });
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { currentUser, users } = this.state;

    return (
      <>
        <div className="users">
          {/* <div className="current-user-container">
            {currentUser && (
              <div>
                <picture className="current-user-picture">
                  <img alt={currentUser.name} src={currentUser.photoUrl} />
                </picture>
                <div className="current-user-info">
                  <h3>{currentUser.name}</h3>
                  <p>{currentUser.description}</p>
                </div>
              </div>
            )}
          </div> */}

          <div className="users-container">
            <div style={{ width: '95%', paddingLeft: '10px' }}>
              <TextField
                fullWidth
                id="standard-search"
                label="Search Users"
                type="search"
                variant="outlined"
                style={{ margin: '5px' }}
                onKeyUp={this.getUsers}
              />
            </div>
            <ul>
              {users.map((userData) => (
                <li key={userData._id} className="user">
                  <picture className="user-picture">
                    <img src={userData.photo} alt={`${userData.name}`} />
                  </picture>
                  <div className="user-info-container">
                    <div className="user-info">
                      <h4>{userData.name}</h4>
                    </div>
                    <div className="user-action">
                      <button type="button" onClick={() => this.handleClick(userData._id)}>
                        Message
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {
              // eslint-disable-next-line no-return-assign
              <div className="chatbox-container" ref={(c) => (this.container = c)}>
                <div id="talkjs-container" style={{ height: '300px' }}>
                  <i />
                </div>
              </div>
            }
          </div>
        </div>
      </>
    );
  }
}

export default SearchUsers;
