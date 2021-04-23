import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

class AboutCommunityCard extends React.Component {
  render() {
    return (
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
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
    );
  }
}

export default AboutCommunityCard;
