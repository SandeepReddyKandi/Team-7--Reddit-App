import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import RedditICon from '../../community.png';
import Comment from '../Comment/Comment';

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
              avatar={<Avatar src={RedditICon} aria-label="recipe" alt="" />}
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
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
    );
  }
}

export default TextDisplayCard;
