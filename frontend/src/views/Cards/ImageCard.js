/* eslint-disable */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
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
      imageList:[],
      title:'',
      community:'Choose a Community',
      communityList:[],
      data:[],
      filename:''
    };
  }

  handleSelect = (evtKey) => {
    this.setState({
      community:evtKey
    });
}

  componentDidMount(){
    this.getCommunityList()
  }

  onChangeCommunity=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onChangeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getCommunityList= async()=>{
    const communities=[];
    axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    const data= await axios.get(`${constants.baseUrl}/community/communities`);
    if(data.data.data){
      (data.data.data).map((d)=>communities.push(d.community_name))
      this.setState({communityList:communities});
    }
  }

  onFileUpload = (file) => {
    const formData = new FormData();
    formData.append('userprofile', file);
    // axios.defaults.headers.common["authorization"] = 'Bearer ' + localStorage.getItem('token')
    // axios.defaults.withCredentials = true;
    axios
      .put(
        `${constants.baseUrl}/users/uploadfile`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        { responseType: 'blob' }
      )
      .then((res) => {
        // this.setState({ image_path: res.data.Location });
        // addImage([...imageList, res.data.Location])
        this.state.imageList.push(res.data.Location)
      })
      .catch((error) => {
        // addImage(null)
      });
  };

  ImageTake = async (event) => {
    await this.onFileUpload(event.target.files[0])
    console.log("----image----",this.state.imageList);
  };

  addPostLink= async()=>{
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = localStorage.getItem('id');
    axios.defaults.headers.common["authorization"] = localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    axios.post(`${constants.baseUrl}/post/image/`)
  }
  render() {
    let image = null;
    let filename = this.state.filename || 'Select image file';
    // if (this.props.user.message === 'ADD_POST_IMAGE_SUCCESS') {
    //   filename = 'Select image file';
    // }
    if (this.state.imageList.length>0) {
      image = this.state.imageList[0];
    }    const communitylist= new Set();
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
                        name="community"
                        variant="light"
                        menuAlign="right"
                        title={this.state.community}
                        id="dropdown-menu-align-right"
                        onChange={this.onChangeCommunity}
                        value={this.state.community}
                        onSelect={this.handleSelect}
                        >
                        {this.state.communityList.map((p)=>
                          <Dropdown.Item eventKey={p}>{p}</Dropdown.Item>
                        )}
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
                    <Col md={{ span: 3, offset: 1 }}>
              <Form noValidate validated={this.state.validated} onSubmit={this.onFileUpload}>
                <Form.Row>
                  <Form.Group as={Col} md={{ span: 3, offset: 1 }}>
                    <Image style={{ width: '12rem' }} src={this.state.imageList[0]} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3}>
                    <Form.File
                      className="mt-3"
                      name="image"
                      id="image"
                      style={{ width: '15rem' }}
                      accept="image/*"
                      label={filename}
                      onChange={this.ImageTake}
                      custom
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload valid picture.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit">Upload</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
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
