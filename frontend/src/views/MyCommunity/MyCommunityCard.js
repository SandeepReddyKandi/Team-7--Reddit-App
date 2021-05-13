/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import {useState} from 'react';
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

const MyCommunityCard = ({community}) => {
  const [color, setColor] = useState('Azure');
  const onMouseOver = () => setColor('AliceBlue');
  const onMouseOut = () => setColor('Azure')
  return (
        <div>
        <Card
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        style={{backgroundColor: color}}>
        <Row style={{marginTop: "1%"}}>
            <Col md={8}>
                <Row>
                    <Col md={4}>
                        {community.images.length === 0 ? null : (
                        <Carousel
                          style={{
                            maxWidth: '400px',
                            maxHeight: '200px',
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
                    <CardContent >
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
                        <IconButton aria-label="add to favorites" disabled >
                            <PeopleIcon />
                        </IconButton>
                        <Typography>{`${community.members.length}`}</Typography>
                        <IconButton aria-label="share" disabled >
                            <NotesIcon />
                        </IconButton>
                        <Typography>{`${community.posts.length}`}</Typography>
                    </CardActions>
                </Row>
            </Col>
        </Row>
      </Card>
        
        </div>
    )
}
export default MyCommunityCard
