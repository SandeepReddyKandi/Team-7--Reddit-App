/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { Carousel } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PeopleIcon from '@material-ui/icons/People';
import NotesIcon from '@material-ui/icons/Notes';
import './TextDisplayCard.css';

const MyCommunityCard = ({communities}) => (
        <div>
        {communities.map((community) => 
        <Card>
        <Row>
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
                          ;
                        </Carousel>
                        )};
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
                    <CardContent >
                        <Typography variant="body2" color="textSecondary" component="p" style={{
                            paddingLeft:30
                        }}>{community.description}
                        </Typography>
                    </CardContent>
                </Row>
                <Row>
                    <CardActions disableSpacing style={{
                        paddingLeft:30
                    }}>
                        <IconButton aria-label="add to favorites" disabled >
                            <PeopleIcon />
                        </IconButton>
                        <Typography>{`${community.members}`}</Typography>
                        <IconButton aria-label="share" disabled >
                            <NotesIcon />
                        </IconButton>
                        <Typography>{`${community.posts}`}</Typography>
                    </CardActions>
                </Row>
            </Col>
        </Row>
      </Card>
        )}
        
        </div>
    )

export default MyCommunityCard
