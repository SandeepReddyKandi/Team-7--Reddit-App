/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import axios from 'axios';
import constants from '../../constants/constants';
import RedditICon from '../../community.png';
import './TextDisplayCard.css';

// eslint-disable-next-line react/prefer-stateless-function
class CommunityListCard extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      voteCount: 0,
      disableVoting: false,
    };

    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.getVoteCount = this.getVoteCount.bind(this);
  }

  componentDidMount() {
    const { community } = this.props;
    const userId = localStorage.getItem('user');
    if (community.upvote.includes(userId) || community.downvote.includes(userId)) {
      this.setState({ disableVoting: true });
    }
    this.getVoteCount();
  }

  getVoteCount() {
    const { community } = this.props;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios
      .get(`${constants.baseUrl}/community/getVoteCount?id=${community._id}`)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          this.setState({ voteCount: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpVote = async () => {
    const { community } = this.props;
    const userId = localStorage.getItem('user');
    if (community.upvote.includes(userId) || community.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: community._id, upvote_user_id: userId };
    await axios
      .post(`${constants.baseUrl}/community/rate`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          this.getVoteCount();
          this.setState({ disableVoting: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDownVote = async () => {
    const { community } = this.props;
    const userId = localStorage.getItem('user');
    if (community.upvote.includes(userId) || community.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: community._id, downvote_user_id: userId };
    await axios
      .post(`${constants.baseUrl}/community/rate`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          this.getVoteCount();
          this.setState({ disableVoting: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { community } = this.props;
    const { voteCount, disableVoting } = this.state;
    return (
      <div className="posts-wrapper">
        <Card>
          <div className="post">
            <Row style={{ width: '720px', height: '100%', flexWrap: 'nowrap', marginRight: '0' }}>
              <Col
                md={1}
                style={{
                  display: 'flex',
                }}
              >
                <div className="post-sidebar">
                  <IconButton disabled={disableVoting}>
                    <div className="upvote">
                      <ArrowDropUpIcon fontSize="large" onClick={this.handleUpVote} />
                    </div>
                  </IconButton>
                  <Typography style={{ textAlign: 'center' }}>{voteCount}</Typography>
                  <IconButton disabled={disableVoting}>
                    <div className="downvote">
                      <ArrowDropDownIcon fontSize="large" onClick={this.handleDownVote} />
                    </div>
                  </IconButton>
                </div>
              </Col>
              <Col md={11} style={{ paddingLeft: '5%' }}>
                <NavLink
                  to={{
                    pathname: `/communityhomepage`,
                    community,
                  }}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Row>
                    <div className="post-title">
                      <CardHeader avatar={<Avatar src={RedditICon} aria-label="recipe" alt="" />} />
                      <span className="title">{community.community_name}</span>
                    </div>
                  </Row>
                  <Row>
                    <div className="post-body">
                      <span>{community.description}</span>
                    </div>
                  </Row>
                </NavLink>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

CommunityListCard.propTypes = {
  community: PropTypes.objectOf.isRequired,
};

export default CommunityListCard;
