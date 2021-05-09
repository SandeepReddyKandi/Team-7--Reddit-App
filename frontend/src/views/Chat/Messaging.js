import React, { Component } from 'react';
import Talk from 'talkjs';

const jwtDecode = require('jwt-decode');

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
    let currentUser;
    const token = localStorage.getItem('token');
    const currentTalkjsUser = jwtDecode(token);
    if (currentTalkjsUser) {
      currentUser = currentTalkjsUser;
      // eslint-disable-next-line no-underscore-dangle
      currentUser.id = currentUser.userId;
    }

    this.state = {
      currentUser,
    };
  }

  componentDidMount() {
    const { currentUser } = this.state;
    Talk.ready
      .then(() => {
        const me = new Talk.User(currentUser);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tdR0ruWV',
            me,
          });
        }

        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <>
        <div
          style={{ height: '500px' }}
          className="inbox-container"
          // eslint-disable-next-line no-return-assign
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </>
    );
  }
}

export default Messaging;
