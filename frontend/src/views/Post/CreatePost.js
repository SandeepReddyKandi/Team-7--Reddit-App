/* eslint-disable */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import PostCard from '../Cards/PostCard';
import ImageCard from '../Cards/ImageCard';
import LinkCard from '../Cards/LinkCard';
import CommunityRulesCard from '../Cards/CommunityRulesCard';
import AboutCommunityCard from '../Cards/AboutCommunityCard';

function TabPanel(props) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      /* eslint-disable react/jsx-props-no-spreading */
      {...other}
    >
      {value === 0 && <PostCard />}
      {value === 1 && <ImageCard />}
      {value === 2 && <LinkCard />}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

class CommunityHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (event, newValue) => {
    event.preventDefault();
    this.setState({ value: newValue });
  };

  createPost = () => {};

  render() {
    const { value } = this.state;
    return (
      <>
        <Header />
        <div>
          <Row>&nbsp;</Row>
          <Row>
            <Col md={2}>&nbsp;</Col>
            <Col md={6}>
              <Row>
                <Typography>Create a Post</Typography>
              </Row>

              <Row>
                {' '}
                <div className="dropdown-divider" />
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                {' '}
                <AppBar position="static" color="white">
                  <Toolbar variant="dense">
                    <Typography variant="body2" color="textSecondary" component="p">
                      This impressive paella is a perfect party dish and a fun meal to cook together
                      with your guests. Add 1 cup of frozen peas along with the mussels, if you
                      like.
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Row>
              <Row>&nbsp;</Row>

              <Row>
                <Card style={{ width: '100%' }}>
                  <Row>
                    <Col md={12}>
                      <div>
                        <AppBar position="static" color="default">
                          <Tabs
                            value=""
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                          >
                            <Tab label="post" icon={<InsertCommentIcon />} {...a11yProps(0)} />
                            <Tab label="Images & Videos" icon={<ImageIcon />} {...a11yProps(1)} />
                            <Tab label="link" icon={<LinkIcon />} {...a11yProps(2)} />
                          </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                          <PostCard />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <ImageCard />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <LinkCard />
                        </TabPanel>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </Col>
            <Col md={3}>
              {/* <AboutCommunityCard />
              <CommunityRulesCard /> */}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
TabPanel.propTypes = {
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CommunityHomePage;
