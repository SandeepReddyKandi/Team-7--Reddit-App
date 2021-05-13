/* eslint no-underscore-dangle: ["error", { "allow": ["__place"] }] */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import axios from 'axios';
import RedditICon from '../../community.png';
import Comment from '../Comment/Comment';

import constants from '../../constants/constants';
import './TextDisplayCard.css';

class TextDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      expandComment: false,
      panel: '',
      post: this.props,
    };
  }

  handleExpandClick = (e, postId) => {
    e.preventDefault();
    const { expandComment } = this.state;
    // const { post_id } = this.state;
    this.setState({
      expandComment: !expandComment,
      panel: postId,
    });
  };

  getPost = async () => {
    // const { page, rows } = this.state;
    const { post } = this.state;
    const postId = post._id;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    await axios
      .get(`${constants.baseUrl}/post/post/id/?id=${postId}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            post: response.data.data,
          });
        }
        if (response.success) {
          this.checkStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCommentBox = async (id) => {
    this.setState({ panel: id });
  };

  handleCommentText = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleAddComment = () => {
    const { comment, post } = this.state;
    // const { post } = this.props;
    const userId = localStorage.getItem('user');
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { postId: post._id, comment, userId };
    axios
      .post(`${constants.baseUrl}/comment/add`, data)
      .then((response, error) => {
        if (error) {
          console.log(error.msg);
        } else {
          // this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUpVote = async () => {
    const { post } = this.props;
    const userId = localStorage.getItem('user');
    if (post.upvote.includes(userId) || post.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: post._id, user: userId };
    await axios
      .post(`${constants.baseUrl}/post/upvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          // this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDownVote = async () => {
    const { post } = this.props;
    const userId = localStorage.getItem('user');
    if (post.upvote.includes(userId) || post.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: post._id, user: userId };
    await axios
      .post(`${constants.baseUrl}/post/downvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          // this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { expandComment, panel } = this.state;
    const { post } = this.props;
    return (
      <div
        className="posts-wrapper"
        style={{ marginBottom: '10px', width: '100%', height: '100%' }}
      >
        <Card style={{}}>
          <div className="post">
            <Row>
              <Col md={1.5}>
                <div className="post-sidebar">
                  <IconButton>
                    <div className="upvote">
                      <ArrowDropUpIcon fontSize="large" onClick={this.handleUpVote} />
                    </div>
                  </IconButton>
                  <Typography style={{ textAlign: 'center' }}>
                    {post.upvote.length - post.downvote.length}
                  </Typography>
                  <IconButton>
                    <div className="downvote">
                      <ArrowDropDownIcon fontSize="large" onClick={this.handleDownVote} />
                    </div>
                  </IconButton>
                </div>
              </Col>
              <Col md={10}>
                <Row>
                  <div className="post-title">
                    <CardHeader
                      avatar={
                        <Avatar
                          src={RedditICon}
                          aria-label="recipe"
                          alt=""
                          style={{ padding: '0px 0px 0px 0px !important' }}
                        />
                      }
                    />
                    <div className="subreddit-name">{post.community_id}</div>
                    <div className="post-user">Posted by</div>
                    <span className="post-user underline">{post.author_id}</span>
                    <span className="post-user underline">20 hours ago</span>
                  </div>
                </Row>
                <Row>
                  <CardContent>
                    <Row>
                      <span> {post.title}</span>
                    </Row>
                    <Row>
                      <img height="200px" src="assets/subreddit.jpg" alt="img" />
                    </Row>
                  </CardContent>
                </Row>
                <Row>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="show more"
                      onClick={(event) => this.handleExpandClick(event, post._id)}
                    >
                      <ModeCommentIcon fontSize="small" />
                      <span className="header-label">
                        <span className="card-action-label">525 Comments</span>
                      </span>
                    </IconButton>
                    <IconButton aria-label="show more">
                      {' '}
                      <CardGiftcardIcon />
                      <span className="card-action-label">Reward</span>
                    </IconButton>
                    <IconButton aria-label="show more">
                      {' '}
                      <ShareIcon />
                      <span className="card-action-label">Share</span>
                    </IconButton>
                    <IconButton aria-label="show more">
                      {' '}
                      <BookmarkIcon />
                      <span className="card-action-label">Save</span>
                    </IconButton>
                  </CardActions>
                </Row>
                <Row>
                  <Col>
                    <Collapse timeout="auto" in={expandComment && panel === post._id}>
                      <Row>
                        <CardContent style={{ 'min-width': '100%' }}>
                          <Row>
                            <Col>
                              <Typography className="header-label card-action-label">
                                Comment as {localStorage.getItem('user')}
                              </Typography>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <TextareaAutosize
                                rowsMin={4}
                                placeholder="Comment"
                                size="large"
                                defaultValue=""
                                style={{ 'min-width': '130vh' }}
                                onChange={this.handleCommentText}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={9} />
                            <Col ms={3}>
                              {' '}
                              <Button
                                size="medium"
                                className="btn-primary"
                                type="button"
                                style={{
                                  'background-color': '#da907e',
                                  color: '#ffffff',
                                  'border-radius': '9999px',
                                  height: '30px',
                                }}
                                onClick={this.handleAddComment}
                                default
                              >
                                Comment
                              </Button>
                            </Col>
                          </Row>
                          {expandComment && panel === post._id && <Comment postId={post} />}
                        </CardContent>
                      </Row>
                    </Collapse>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

TextDisplayCard.propTypes = {
  post: PropTypes.objectOf.isRequired,
  // postId: PropTypes.string.isRequired,
};

export default TextDisplayCard;
