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
import CardMedia from '@material-ui/core/CardMedia';
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
    this.state = { comment: '', expandComment: false, postId: '', updatetree: false };
  }

  handleExpandClick = () => {
    const { expandComment } = this.state;
    this.setState({
      expandComment: !expandComment,
    });
  };

  handleUpVote = () => {
    console.log('Upvote clicked');
  };

  handleDownVote = () => {
    console.log('Downvote clicked');
  };

  handleCommentText = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleAddComment = () => {
    const { postId, comment } = this.state;
    const userId = localStorage.getItem('user');
    axios.defaults.withCredentials = true;
    const data = { postId, comment, userId };
    axios
      .post(`${constants.baseUrl}/comment/add`, data)
      .then((response, error) => {
        if (error) {
          console.log(error.msg);
        } else {
          this.setState({ updatetree: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { expandComment, postId, updatetree } = this.state;
    const { post } = this.props;
    return (
      <div
        className="posts-wrapper"
        style={{ marginBottom: '10px', width: '100%', height: '100%' }}
      >
        <Card style={{}}>
          <div className="post">
            <Row>
              <Col
                md={1}
                style={{
                  display: 'flex',
                }}
              >
                <div className="post-sidebar">
                  <IconButton>
                    <div className="upvote">
                      <ArrowDropUpIcon fontSize="large" onClick={this.handleUpVote} />
                    </div>
                  </IconButton>
                  <Typography style={{ textAlign: 'center' }}>0</Typography>
                  <IconButton>
                    <div className="downvote">
                      <ArrowDropDownIcon fontSize="large" onClick={this.handleDownVote} />
                    </div>
                  </IconButton>
                </div>
              </Col>
              <Col md={11} style={{ paddingLeft: '5%' }}>
                <Row>
                  <div className="post-title">
                    <CardHeader avatar={<Avatar src={RedditICon} aria-label="recipe" alt="" />} />
                    <div className="subreddit-name">{post.community_id}</div>
                    <div className="post-user">Posted by</div>
                    <span className="post-user underline">{post.author_id}</span>
                    <span className="post-user underline">20 hours ago</span>
                  </div>
                </Row>
                <Row>
                  <CardMedia image="assets/subreddit.jpg" title="Paella dish" />
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
                    <IconButton aria-label="show more" onClick={this.handleExpandClick}>
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
                  <Collapse timeout="auto" in={expandComment}>
                    <Row>
                      <CardContent>
                        <Typography className="header-label card-action-label">
                          Comment as{' '}
                        </Typography>
                        <TextareaAutosize
                          rowsMin={6}
                          placeholder="Comment"
                          size="large"
                          defaultValue=""
                          style={{ width: '100%' }}
                          onChange={this.handleCommentText}
                        />

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
                      </CardContent>
                    </Row>
                    <Comment postId={postId} update={updatetree} />
                  </Collapse>
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
};

export default TextDisplayCard;
