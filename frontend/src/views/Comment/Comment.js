/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-lonely-if */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-deprecated */

import React from 'react';
import Row from 'react-bootstrap/Row';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import constants from '../../constants/constants';
import ConvertDate from '../../constants/CommonService';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props,
      expanded: false,
      panel: '',
      subComment: '',
      post: this.props,
    };
  }

  componentDidUpdate() {
    if (JSON.stringify(this.props.comments.length) !== JSON.stringify(this.state.comments.length)) {
      this.getComments();
      // this.setState({ comments: this.props.comments });
    }
  }

  componentDidMount = async () => {
    this.getComments();
    // const { comments } = this.props;
    // this.setState({ comments });
  };

  handleExpandClick = (e) => {
    const { expanded } = this.state;
    // await this.getSubComments(e);
    this.setState({ expanded: !expanded, panel: e });
  };

  /* getSubComments=(e)=>{
    const userId = localStorage.getItem('user');
    const { subComment } = this.state;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { comment_id: id, author_id: userId, comment: subComment };
    await axios
      .post(`${constants.baseUrl}/comment/subcomment`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          if (response.data.msg === 'SubComment Added successfully!') {
            this.getComments();
          } else {
            console.log(response);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } */

  handleSubCommentBox = (e) => {
    this.setState({ subComment: e.target.value });
  };

  handleUpVote = async (id) => {
    const userId = localStorage.getItem('userId');
    if (id.upvote.includes(userId) || id.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: id._id, user: userId };
    await axios
      .post(`${constants.baseUrl}/comment/upvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(error);
        } else {
          this.getComments();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDownVote = async (id) => {
    const userId = localStorage.getItem('userId');
    if (id.upvote.includes(userId) || id.downvote.includes(userId)) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { id: id._id, user: userId };
    await axios
      .post(`${constants.baseUrl}/comment/downvote`, data)
      .then((response, error) => {
        if (error) {
          console.log(error);
        } else {
          this.getComments();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubComment = async (id) => {
    const userId = localStorage.getItem('userId');
    const { subComment } = this.state;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    const data = { comment_id: id, author_id: userId, comment: subComment };
    await axios
      .post(`${constants.baseUrl}/comment/subcomment`, data)
      .then((response, error) => {
        if (error) {
          console.log(response.msg);
        } else {
          if (response.data.msg === 'SubComment Added successfully!') {
            this.getComments();
          } else {
            console.log(response);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getComments = async () => {
    axios.defaults.withCredentials = true;
    const { post } = this.state.post;
    const postid = post._id;
    await axios
      .get(`${constants.baseUrl}/comment/?id=${postid}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            comments: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

  render() {
    const { comments, expanded, panel } = this.state;

    return (
      <>
        {comments.length > 0 &&
          comments.map((c) => (
            <Card className="border">
              <CardHeader
                avatar={<Avatar aria-label="recipe" src="c.author_id[0].photo" />}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={c.author_id[0].name}
                subheader={ConvertDate(c.createdAt)}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {c.comment}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <div className="upvote">
                    <ArrowDropUpIcon fontSize="large" onClick={() => this.handleUpVote(c)} />
                  </div>
                </IconButton>
                <Typography style={{ textAlign: 'center' }}>
                  {c.upvote.length - c.downvote.length}
                </Typography>
                <IconButton>
                  <div className="downvote">
                    <ArrowDropDownIcon fontSize="large" onClick={() => this.handleDownVote(c)} />
                  </div>
                </IconButton>
                <IconButton
                  onClick={() => this.handleExpandClick(c._id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <Typography>Reply</Typography>
                </IconButton>
              </CardActions>
              <Collapse in={expanded && panel === c._id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Row>
                    {' '}
                    <List>
                      {c.sub_comments !== undefined &&
                        c.sub_comments.length > 0 &&
                        c.sub_comments.map((s) => (
                          <ListItem className="border">
                            {s.author_id.length > 0 && (
                              <>
                                <ListItemAvatar>
                                  <Avatar src={s.author_id[0].photo} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={<Typography>{s.author_id[0].name}</Typography>}
                                  secondary={<Typography fontSize="small">{s.comment}</Typography>}
                                />
                              </>
                            )}
                          </ListItem>
                        ))}
                    </List>
                  </Row>
                  <Row>
                    <TextareaAutosize
                      rowsMin={1}
                      placeholder="Reply"
                      size="medium"
                      defaultValue=""
                      style={{ 'max-width': '100vh' }}
                      onChange={this.handleSubCommentBox}
                      required
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
                      onClick={() => this.handleSubComment(c._id)}
                      default
                    >
                      Reply
                    </Button>
                  </Row>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </>
    );
  }
}

Comment.propTypes = {
  // post: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
};

export default Comment;
