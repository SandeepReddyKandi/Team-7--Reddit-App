/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

import ConvertDate from '../../constants/CommonService';

class CommunityMembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: this.props.community_info,
    };
  }

  render() {
    const { community } = this.state;

    return (
      <Card style={{ 'min-width': '100%' }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          subheader={<Typography className="sidecard-labels">Members</Typography>}
          className="right-side-card"
        />
        <CardContent>
          <List>
            {community.member !== undefined && community.member.length > 0 ? (
              community.members.map((m) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{m.image_url}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={
                      <Typography className="header-label">{ConvertDate(m.createdAt)} </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography className="header-label">No Members</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    );
  }
}

CommunityMembersList.propTypes = {
  community_info: PropTypes.func.isRequired,
};

export default CommunityMembersList;
