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
import { Redirect } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList:[],
      title:'',
      community:'Choose a Community',
      communityList:[],
      data:[],
      filename:'',
      imgCollection: '',
      redirect:false,
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onImageSubmit = this.onImageSubmit.bind(this);
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
    console.log(data)
    if(data.data.data){
      (data.data.data).map((d)=>communities.push(d.community_name))
      this.setState({communityList:communities});
    }
  }

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files })
}
showimage=(e)=>{
  console.log("inside show imgae");
  const imagel= this.state.imageList;
    <Carousel
    style={{
      maxWidth: '400px',
      maxHeight: '200px',
      minHeight: '200px',
      textAlign: 'center',
    }}
  >
    {imagel.map((image) => (
      <Carousel.Item>
        <img
          style={{ maxWidth: '400px', maxHeight: '200px', minHeight: '200px' }}
          src={image}
          className="d-block w-100"
        />
      </Carousel.Item>
    ))}
  </Carousel>
}

onImageSubmit= async(e)=> {
    e.preventDefault()
    console.log("check",this.state.imgCollection);
    for (const key of Object.keys(this.state.imgCollection)) {
        var formData = new FormData();
        console.log(this.state.imgCollection[key])
        formData.append('userprofile', this.state.imgCollection[key])
        await axios.put(
          `${constants.baseUrl}/post/uploadfile`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
          { responseType: 'blob' }
        ).then(res => {
              this.state.imageList.push(res.data.Location);
              console.log(res.data)
          })
    }
    console.log(this.state.imageList);
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
}

  addPostImage= async()=>{
    const data = {
      title: this.state.title,
      community: this.state.community,
      UserID: localStorage.getItem("userId"),
      imageList: this.state.imageList
    };
    console.log("imagelist----", this.state.imageList)
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios.post(`${constants.baseUrl}/posts/image/`,data)
    .then(res=>{
      if(res.data.msg==="POST_ADDED"){
        this.setState({
          redirect: true,
        });
      }
    })
  }
  render() {
    const communitylist= new Set();
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
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
                        name="title"
                        id="outlined-size-small"
                        placeholder="Title"
                        variant="outlined"
                        size="small"
                        fullWidth="true"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                      />
                    </Row>
                    <Row>&nbsp;</Row>
                    <div className="container">
                <div className="row">
                
                    <form onSubmit={this.onImageSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="form-group">
                        <button className="btn btn-primary" type="submit" onClick={this.showimage}>Show Images</button>
                        <Carousel
    style={{
      maxWidth: '400px',
      maxHeight: '200px',
      minHeight: '200px',
      textAlign: 'center',
    }}
  >
    {this.state.imageList.map((image) => (
      <Carousel.Item>
        <img
          style={{ maxWidth: '400px', maxHeight: '200px', minHeight: '200px' }}
          src={image}
          className="d-block w-100"
        />
      </Carousel.Item>
    ))}
  </Carousel>
                        </div> */}
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <br/>
                    <br/>
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
                          onClick={this.addPostImage}
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
