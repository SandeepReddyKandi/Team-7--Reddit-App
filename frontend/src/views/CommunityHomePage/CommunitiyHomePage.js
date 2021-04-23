import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Header from '../Header/Header';
import Comment from '../Comment/Comment';
// import RedditICon from '/Users/akashkuratkar/Documents/CMPE-273/Reddit App/Team-7--Reddit-App/frontend/src/community.png';

// import Container from 'react-bootstrap/Container';

class CommunityHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandComment: false, postId: '' };
  }

  handleChange = () => {};

  handleExpandClick = () => {
    const { expandComment } = this.state;
    this.setState({
      expandComment: !expandComment,
    });
  };

  render() {
    const { expandComment, postId } = this.state;
    return (
      <>
        <Header />
        <div>
          <Row style={{ height: '100px', width: '100%', 'background-color': '#0579d3' }}>
            &nbsp;
          </Row>
          <Row style={{ 'background-color': '#ffffff', width: '100%', height: '80px' }}>
            <Col md={2}>&nbsp;</Col>

            <Col md={11}>
              <Row>
                <Col md={2}>&nbsp;</Col>
                <Col md={1}>
                  <Avatar alt="Remy Sharp" src="../../community.png" className="card-img-top" />
                </Col>
                <Col md={5}>
                  <Typography variant="h5" component="h5">
                    {' '}
                    Shrimp and Chorizo Paella
                  </Typography>
                  <div>
                    <Typography variant="h7" component="h7" className="header-label">
                      r/shrimp
                    </Typography>
                  </div>
                </Col>
                <Col md={1}>
                  <Button
                    data-testid="Signup"
                    size="small"
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
                    Join
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>&nbsp;</Row>
          <Row>
            <Col md={2}>&nbsp;</Col>
            <Col md={6}>
              <Card>
                <Row>
                  <Col md={1} style={{ 'background-color': '#eeeeee' }}>
                    <IconButton style={{ padding: 'revert' }}>
                      <ArrowDropUpIcon fontSize="large" />
                    </IconButton>
                    <Typography
                      fontWeight="fontWeightBold"
                      textAlign="center"
                      style={{ marginLeft: '18px' }}
                    >
                      0
                    </Typography>
                    <IconButton style={{ padding: 'revert' }}>
                      <ArrowDropDownIcon fontSize="large" />
                    </IconButton>
                  </Col>
                  <Col md={11}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe" src="../../community.png" alt="" />}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                    <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                      </Typography>
                    </CardContent>
                    <CardActions onClick={this.handleExpandClick} disableSpacing>
                      <IconButton aria-label="show more">
                        <ModeCommentIcon fontSize="small" />
                        <Typography className="header-label">525 Comments</Typography>
                      </IconButton>
                    </CardActions>

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
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  subheader={<Typography font="white">About Community</Typography>}
                  style={{ 'background-color': '#0579d3' }}
                  height
                />
                <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together
                    with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <div className="dropdown-divider" />
                <CardActions disableSpacing>
                  <Button
                    data-testid="Signup"
                    size="small"
                    className="btn-primary"
                    type="button"
                    style={{
                      'background-color': '#da907e',
                      color: '#ffffff',
                      'border-radius': '9999px',
                      width: '100%',
                    }}
                    onClick={this.handleSignupModal}
                    default
                  >
                    Create Post
                  </Button>
                </CardActions>
                <Collapse timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>&nbsp;</Typography>
                  </CardContent>
                </Collapse>
              </Card>
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  subheader={<span fontColor="white">Rules</span>}
                  style={{ 'background-color': '#0579d3' }}
                  height
                />
                <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together
                    with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                  <div className="dropdown-divider" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    Method:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside
                    for 10 minutes.
                  </Typography>
                  <div className="dropdown-divider" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    Method:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside
                    for 10 minutes.
                  </Typography>
                </CardContent>

                <Collapse timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside
                      for 10 minutes.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CommunityHomePage;
