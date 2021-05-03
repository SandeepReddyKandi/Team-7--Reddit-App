import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Header from '../Header/Header';
import RedditIcon from '../../community.png';
import constants from '../../constants/constants';
import CommunityListCard from '../Cards/CommulityListCard';

class CommunitySearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { communities: [], error: '' };
    this.getCommunities = this.getCommunities.bind(this);
  }

  getCommunities(e) {
    axios.defaults.withCredentials = true;
    const communityNameFilter = e.target.value;
    axios
      .get(`${constants.baseUrl}/community/getCommunitiesByName?name=${communityNameFilter}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            communities: response.data.data,
          });
        }
      })
      .catch((error) => {
        // this.setState({
        //  error: error.response.msg,
        // });
        // eslint-disable-next-line no-alert
        alert(error);
      });
  }

  render() {
    const { error, communities } = this.state;
    return (
      <>
        <Header />
        <div>
          <Row style={{ height: '100px', 'background-color': '#0579d3' }}>
            <Col md={12}> &nbsp;</Col>
          </Row>
          <Row style={{ 'background-color': '#ffffff', height: '20%' }}>
            <Col md={2}>&nbsp;</Col>

            <Col md={11}>
              <Row>
                <Col md={2}>&nbsp;</Col>
                <Col md={1}>
                  <Avatar alt="Remy Sharp" src={RedditIcon} className="card-img-top" />
                </Col>
                <Col md={5}>
                  <Typography variant="h5" component="h5">
                    Community Search Page
                  </Typography>
                </Col>
                <Col md={3}>&nbsp;</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={2}>&nbsp;</Col>
            <Col md={8}>
              <TextField
                fullWidth
                id="standard-search"
                label="Search community"
                type="search"
                onKeyUp={this.getCommunities}
              />
            </Col>
            <Col md={2}>&nbsp;</Col>
          </Row>
          <Row />
          {error}
          {communities.map((community) => (
            <Row>
              <Col md={2}>&nbsp;</Col>
              <Col md={8}>
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                <Row>
                  <CommunityListCard community={community} />
                </Row>
              </Col>
              <Col md={2}>
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
              </Col>
            </Row>
          ))}
        </div>
      </>
    );
  }
}

export default CommunitySearchPage;
