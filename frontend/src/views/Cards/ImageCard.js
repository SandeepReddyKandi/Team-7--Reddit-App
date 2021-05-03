/* eslint-disable */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';
import constants from '../../constants/constants';
import axios from 'axios';
import {ListGroup, DropdownButton, Dropdown} from 'react-bootstrap';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communityList: [],
    };
  }

  addPostLink= async()=>{
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = localStorage.getItem('id');
    axios.post(`${constants.baseUrl}/post/image/`)
  }
  render() {
    const communitylist= new Set();
    communitylist.add(<Dropdown.Item as="button" value="1">1</Dropdown.Item>)
    return (
      <>
        <div>
          <Card>
            <Row>
              <Col md={12}>
                <CardContent>
                  <Col md={12}>
                  <Row>
                      <Col className="p-0" md={3.5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <DropdownButton
                        variant="light"
                        menuAlign="right"
                        title="Choose a Community"
                        id="dropdown-menu-align-right"
                        >
                        {communitylist}
                        </DropdownButton>
                      </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      {' '}
                      <TextField
                        id="outlined-size-small"
                        placeholder="Title"
                        variant="outlined"
                        size="small"
                        fullWidth="true"
                        // onClick={this.createPost}
                      />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      <TextareaAutosize
                        rowsMin={3}
                        placeholder="URL"
                        size="large"
                        defaultValue=""
                        style={{ width: '100%' }}
                      />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      <Col md={10}>
                        {' '}
                        <Chip icon={<AddIcon />} label="OC" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<AddIcon />} label="SPOILER" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<AddIcon />} label="NSFW" deleteIcon={<AddIcon />} />
                        &nbsp;&nbsp;
                        <Chip icon={<LocalOfferIcon fontsize="small" />} label="FLAIR" />
                      </Col>
                      <Col mg={1}>
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          onClick={this.handleLoginModal}
                          default
                          style={{
                            'background-color': '#ffffff',
                            'border-color': '#0579d3',
                            'border-radius': '9999px',
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          data-testid="Signup"
                          size="small"
                          className="btn-primary"
                          type="button"
                          style={{
                            'background-color': '#0579d3',
                            color: '#ffffff',
                            'border-radius': '9999px',
                          }}
                          onClick={this.addPostLink}
                          default
                        >
                          Post
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </CardContent>
              </Col>
            </Row>
          </Card>
        </div>
      </>
    );
  }
}

export default ImageCard;
