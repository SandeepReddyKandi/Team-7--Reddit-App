/* eslint-disable  dot-notation */
/* eslint-disable prefer-template */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Header from '../Header/Header';
import constants from '../../constants/constants';
import CommunityListCard from '../Cards/CommulityListCard';

class CommunitySearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: [],
      error: '',
      communityNameFilter: '/*',
      page: 0,
      rows: 10,
      totalRows: 0,
    };
    this.getCommunities = this.getCommunities.bind(this);
    this.handleCommunityNameChange = this.handleCommunityNameChange.bind(this);
  }

  componentDidMount() {
    this.getCommunities();
  }

  handleCommunityNameChange(e) {
    this.setState({ communityNameFilter: e.target.value }, async () => {
      this.getCommunities();
    });
  }

  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rows: parseInt(event.target.value, 10), page: 0 });
    this.getCommunities();
  };

  handleChangePage = (e, newpage) => {
    e.preventDefault();
    this.setState({ page: newpage }, async () => {
      this.getCommunities();
    });
  };

  getCommunities() {
    const { communityNameFilter, page, rows } = this.state;
    const data = {
      name: communityNameFilter,
      page,
      rows,
    };
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .post(`${constants.baseUrl}/community/getCommunityByPage`, data)
      .then((response, error) => {
        if (!error) {
          this.setState({
            communities: response.data.data.communities,
            totalRows: response.data.data.totalRows,
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
    const { error, communities, page, rows, totalRows } = this.state;
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
                label="Search community by name..."
                type="search"
                onChange={this.handleCommunityNameChange}
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
                <Row>
                  <CommunityListCard community={community} />
                </Row>
              </Col>
              <Col md={3}>
                <Row>&nbsp;</Row>
              </Col>
            </Row>
          ))}
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rows}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10]}
          />
        </div>
      </>
    );
  }
}

export default CommunitySearchPage;
