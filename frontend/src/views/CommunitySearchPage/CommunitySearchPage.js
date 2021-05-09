/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Header from '../Header/Header';
import constants from '../../constants/constants';
import CommunityListCard from '../Cards/CommulityListCard';

class CommunitySearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { communities: [], error: '' };
    this.getCommunities = this.getCommunities.bind(this);
  }

  getCommunities(e) {
    const communityNameFilter = e.target.value;
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/community/getCommunityByName?name=${communityNameFilter}`)
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
                <Col md={3}>&nbsp;</Col>
                <Col md={5}>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{
                      paddingLeft: '5%',
                      marginBottom: '10px',
                    }}
                  >
                    Community Search Page
                  </Typography>
                </Col>
                <Col md={3}>&nbsp;</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={3}>&nbsp;</Col>
            <Col md={6}>
              <TextField
                fullWidth
                id="standard-search"
                label="Search community"
                type="search"
                onKeyUp={this.getCommunities}
              />
            </Col>
            <Col md={3}>&nbsp;</Col>
          </Row>
          <Row />
          {error}
          {communities.map((community) => (
            <Row>
              <Col md={3}>&nbsp;</Col>
              <Col md={6}>
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                <Row>
                  <CommunityListCard community={community} />
                </Row>
              </Col>
              <Col md={3}>
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
