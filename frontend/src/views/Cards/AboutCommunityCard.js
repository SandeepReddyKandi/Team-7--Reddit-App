/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CakeIcon from '@material-ui/icons/Cake';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import ConvertDate from '../../constants/CommonService';

class AboutCommunityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: this.props.community_info,
    };
  }

  render() {
    const { community } = this.state;
    const { status } = this.props;
    return (
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          subheader={<Typography className="sidecard-labels">About Community</Typography>}
          style={{ 'background-color': '#0579d3' }}
          height
        />
        <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
        <CardContent>
          <Row>
            <Col>
              <Typography variant="body2" component="p" className="reader-content">
                {community.description}
              </Typography>
            </Col>
          </Row>
          <Row>
            {community.members !== undefined && (
              <Col className="card-data-label">{community.members.length}</Col>
            )}
            {community.members !== undefined && (
              <Col className="card-data-label">{community.posts.length}</Col>
            )}
          </Row>
          <Row>
            <Col className="card-sub-header">Members</Col>
            <Col className="card-sub-header">Posts</Col>
          </Row>
        </CardContent>
        <div className="dropdown-divider" />
        <Typography className="card-created-data">
          <CakeIcon fontSize="small" className="card-created-data" />
          Created on: {ConvertDate(community.createdAt)}
        </Typography>
        <CardActions disableSpacing>
          {status === 'active' && (
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
          )}
        </CardActions>
        <Collapse timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>&nbsp;</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

AboutCommunityCard.propTypes = {
  community_info: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default AboutCommunityCard;
