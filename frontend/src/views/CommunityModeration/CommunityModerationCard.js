/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import TablePagination from '@material-ui/core/TablePagination';
import { Carousel } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotesIcon from '@material-ui/icons/Notes';
import './TextDisplayCard.css';

const CommunityModerationCard = ({community, showModal, requestToggle}) => {
    const [color, setColor] = useState('Azure');
    const onMouseOver = () => setColor('AliceBlue');
    const onMouseOut = () => setColor('Azure')
    return (
          <div>
          <Card
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          style={{backgroundColor: color, maxHeight: "300px"}}>
          <Row style={{marginTop: "1%"}}>
              <Col md={8}>
                  <Row>
                      <Col md={4}>
                          {community.images.length === 0 ? null : (
                          <Carousel
                            style={{
                              maxWidth: '400px',
                              maxHeight: '200px',
                              minHeight: '200px',
                              textAlign: 'center',
                            }}
                          >
                            {community.images.map((image) => (
                              <Carousel.Item>
                                <img
                                  src={image}
                                  className="d-block w-100"
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                          )}
                      </Col>
                      <Col md={8}>
                          <CardHeader
                          title={community.community_name}
                          titleTypographyProps={{variant:'h4' }}
                          subheader={community.createdAt}
                          />
                      </Col>
                  </Row>
                  <Row>
                      <CardContent style={{maxHeight: "20px"}}>
                          <Typography variant="body2" color="textSecondary" component="p" style={{
                              paddingLeft:60
                          }}>{community.description}
                          </Typography>
                      </CardContent>
                  </Row>
                  <Row>
                      <CardActions disableSpacing style={{
                          paddingLeft:30
                      }}>
                          <IconButton aria-label="add to favorites">
                              <PeopleIcon onClick={() => showModal(community.members, community._id)}/>
                          </IconButton>
                          <Typography>{`${community.members.length}`}</Typography>
                          <IconButton aria-label="share">
                              <NotesIcon />
                          </IconButton>
                          <Typography>{`${community.posts.length}`}</Typography>
                          <IconButton aria-label="share">
                              <GroupAddIcon onClick={() => requestToggle(community._id)} />
                          </IconButton>
                      </CardActions>
                  </Row>
              </Col>
          </Row>
        </Card>
          </div>
    )
}
CommunityModerationCard.defaultProps = {
    community: {members: [], posts: []}
}
export default CommunityModerationCard
