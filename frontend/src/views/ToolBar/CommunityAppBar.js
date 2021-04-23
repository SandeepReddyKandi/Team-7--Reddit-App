import React from 'react';
import Col from 'react-bootstrap/Col';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import { Redirect } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import RedditICon from '../../community.png';

class CommunityAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: false };
  }

  createPost = () => {
    const { post } = this.state;
    this.setState({ post: !post });
  };

  render() {
    const { post } = this.state;
    if (post) {
      return <Redirect to="/createpost" />;
    }

    return (
      <AppBar position="static" color="white">
        <Toolbar variant="dense">
          {' '}
          <Col md={0.5}>
            <Avatar src={RedditICon} aria-label="recipe" alt="" />
          </Col>
          <Col md={10}>
            <TextField
              id="outlined-size-small"
              placeholder="Create Post"
              variant="outlined"
              size="small"
              fullWidth="true"
              onClick={this.createPost}
            />
          </Col>
          <Col md={0.5}>
            <IconButton style={{ padding: 'revert' }}>
              <ImageIcon color="primary" fontSize="medium" />
            </IconButton>
          </Col>
          <Col md={0.5}>
            <IconButton style={{ padding: 'revert' }}>
              <LinkIcon color="default" />
            </IconButton>
          </Col>
        </Toolbar>
      </AppBar>
    );
  }
}

export default CommunityAppBar;
