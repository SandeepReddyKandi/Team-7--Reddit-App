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
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import RedditICon from '../../community.png';
import Comment from '../Comment/Comment';
import './TextDisplayCard.css';

class TextDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandComment: false, postId: '' };
  }

  handleExpandClick = () => {
    const { expandComment } = this.state;
    this.setState({
      expandComment: !expandComment,
    });
  };

  render() {
    const { expandComment, postId } = this.state;
    return (
      <div className="posts-wrapper">
        <Card >
          <div className="post">
            <Row style={{ width: '100%', height: '100%' }}>
              <Col md={1} style={{
                display: 'flex',
              }} >
                <div className="post-sidebar">
                  <IconButton>
                    <div className="upvote">
                      <ArrowDropUpIcon fontSize="large" />
                    </div>
                  </IconButton>
                  <Typography style={{ textAlign: 'center' }}>
                    0
                  </Typography>
                  <IconButton>
                    <div className="downvote">
                      <ArrowDropDownIcon fontSize="large" />
                    </div>
                  </IconButton>
                </div>
              </Col>
              <Col md={11} style={{ paddingLeft: '5%' }} >
                <Row>
                  <div className="post-title">
                    <CardHeader
                      avatar={<Avatar src={RedditICon} aria-label="recipe" alt="" />}
                    />
                    <div className="subreddit-name">r/reactjs</div>
                    <div className="post-user">Posted by</div>
                    <span className="post-user underline">u/Shrimp and Chorizo Paella</span>
                    <span className="post-user underline">20 hours ago</span>
                  </div>
                </Row>
                <Row>
                  <div className="post-body">
                    <span className="title"> This impressive paella is a perfect party dish and a fun meal to cook together with
                    your guests. Add 1 cup of frozen peas along with the mussels, if you like.</span>
                    <img height='200px' src='assets/subreddit.jpg' alt="img" />
                    {/* <CardMedia image="assets/subreddit.jpg" title="Paella dish" />
                    <CardActions onClick={this.handleExpandClick} disableSpacing>
                      <IconButton aria-label="show more">
                        <ModeCommentIcon fontSize="small" />
                        <Typography className="header-label">525 Comments</Typography>
                      </IconButton>
                    </CardActions>
    */}
                  </div>
                </Row>
                <Row>
                  <div className="post-footer">
                    <div className="comments footer-action">
                      <div>
                        <ModeCommentIcon className="comment-icon" />
                      </div>
                      <div>
                        <span>525 Comments</span>
                      </div>
                      <div className="reward footer-action">
                        <CardGiftcardIcon />
                        <span>Reward</span>
                      </div>
                      <div className="share footer-action">
                        <ShareIcon />
                        <span>Share</span>
                      </div>
                      <div className="save footer-action">
                        <BookmarkIcon />
                        <span>Save</span>
                      </div>
                      <MoreHorizIcon className="more-icon footer-action" />
                      <Collapse timeout="auto" in={expandComment}>
                        <CardContent>
                          <Typography className="header-label">Comment as </Typography>
                          <TextareaAutosize
                            rowsMin={6}
                            placeholder="Comment"
                            size="large"
                            defaultValue=""
                            style={{ width: '100%' }}
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
                            onClick={this.handleSignupModal}
                            default
                          >
                            Comment
                </Button>
                        </CardContent>

                        <Comment postId={postId} />
                      </Collapse>
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </div >
    );
  }
}

export default TextDisplayCard;
