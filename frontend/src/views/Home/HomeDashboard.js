/* eslint-disable constructor-super */
/* eslint-disable */

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

// import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import TopBar from '../ToolBar/TopBar';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // handleExpandClick = () => {};

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <Col md={8}>
              <TopBar /> <Typography color="textSecondary"> Popular Posts</Typography>
              <Card>
                <Row>
                  <Col md={2}>&nbsp;</Col>

                  <Col md={12}>
                    &nvsp;
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">R</Avatar>}
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
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton onClick={this.handleExpandClick} aria-label="show more">
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                          aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                          medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                          occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                          large plate and set aside, leaving chicken and chorizo in the pan. Add
                          pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                          stirring often until thickened and fragrant, about 10 minutes. Add saffron
                          broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with artichokes and
                          peppers, and cook without stirring, until most of the liquid is absorbed,
                          15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                          mussels, tucking them down into the rice, and cook again without stirring,
                          until mussels have opened and rice is just tender, 5 to 7 minutes more.
                          (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={3}>
              <Typography>Top News Communities</Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Todays Top Growing Communities
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary="Single-line item" secondary="" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button size="small">View All</Button>
                </CardActions>
              </Card>
            </Col>
            <Col md={2}>&nbsp;</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Header;
