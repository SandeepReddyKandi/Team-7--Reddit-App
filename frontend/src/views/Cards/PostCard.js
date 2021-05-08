/* eslint-disable */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ListGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import constants from '../../constants/constants';
import axios from 'axios';

class PostCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      text:'',
      community:'test5',
      communityList:[],
    }
  }

  onChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addPostText= async()=>{
    axios.defaults.headers.common["authorization"] = localStorage.getItem('token')
    axios.defaults.withCredentials = true;    
    const data = {
      title: this.state.title,
      text: this.state.text,
      community: this.state.community,
    };
    axios.post(`${constants.baseUrl}/post/text`,data);
  }
  render() {
    const communitylist= new Set();
    communitylist.add(<Dropdown.Item as="button" value="test5">test5</Dropdown.Item>)
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
                        onChange={this.onChange}
                        value={this.state.community}
                        >
                        {communitylist}
                        </DropdownButton>
                      </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      {' '}
                      <TextField
                        name="title"
                        id="outlined-size-small"
                        placeholder="Title"
                        variant="outlined"
                        size="small"
                        fullWidth="true"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        // onClick={this.createPost}
                      />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      <TextareaAutosize
                        name="text"
                        rowsMin={6}
                        placeholder="Text (required)"
                        size="large"
                        defaultValue=""
                        value={this.state.text}
                        onChange={this.onChangeText}
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
                        <Chip icon={<LocalOfferIcon fontsize="smmall" />} label="FLAIR" />
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
                          onClick={this.addPostText}
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

export default PostCard;
