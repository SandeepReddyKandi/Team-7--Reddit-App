import React from 'react';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import RedditICon from '../../community.png';
import './TextDisplayCard.css';

// eslint-disable-next-line react/prefer-stateless-function
class CommunityListCard extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { community } = this.props;
    return (
      <div className="posts-wrapper">
        <Card>
          <div className="post">
            <Row style={{ width: '100%', height: '100%' }}>
              <Col
                md={1}
                style={{
                  display: 'flex',
                }}
              >
                <div className="post-sidebar">
                  <IconButton>
                    <div className="upvote">
                      <ArrowDropUpIcon fontSize="large" />
                    </div>
                  </IconButton>
                  <Typography style={{ textAlign: 'center' }}>0</Typography>
                  <IconButton>
                    <div className="downvote">
                      <ArrowDropDownIcon fontSize="large" />
                    </div>
                  </IconButton>
                </div>
              </Col>
              <Col md={11} style={{ paddingLeft: '5%' }}>
                <NavLink
                  to={{
                    pathname: `/communityhomepage`,
                    community,
                  }}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Row>
                    <div className="post-title">
                      <CardHeader avatar={<Avatar src={RedditICon} aria-label="recipe" alt="" />} />
                    </div>
                  </Row>
                  <Row>
                    <div className="post-body">
                      <span className="title">{community.community_name}</span>
                      <span>
                        <br />
                        {community.description}
                      </span>
                    </div>
                  </Row>
                </NavLink>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

CommunityListCard.propTypes = {
  community: PropTypes.objectOf.isRequired,
};

export default CommunityListCard;
