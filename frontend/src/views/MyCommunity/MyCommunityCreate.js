/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import { Form, Carousel } from 'react-bootstrap';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line import/no-named-as-default-member
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { FaTimes } from 'react-icons/fa';
import { addCommunity, getRulesTopic } from '../../actions/MyCommunityActions';
import Header from '../Header/Header';
import logo from '../../side_bg.jpeg';
import constants from "../../constants/constants"

// eslint-disable-next-line arrow-body-style
const MyCommunityCreate = () => {
  const [imageList, addImage] = useState([]);
  const [imgCounter, addCounter] = useState(0);
  const [showImage, addShowImage] = useState([]);
  const [topicList, addTopic] = useState([]);
  const [rulesList, addRules] = useState([]);
  const [halfRule, addHalf] = useState('');
  const [imageURL, addImageURL] = useState(null);
  const [showDesc, changeShow] = useState(false);
  const inputrules = React.useRef();
  const dispatch = useDispatch();
  const [textState, setTextState] = useState();
  const [textState2, setTextState2] = useState();
  const reduxData = useSelector((state) => state.addCommunity);
  
  useEffect(() => {
    dispatch(getRulesTopic());
  }, [dispatch]);

  const onFileUpload = (file) => {
    const formData = new FormData();
    formData.append('userprofile', file);
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
        addImage([...imageList, res.data.Location])
      })
      .catch((error) => {
        addImageURL(null)
      });
  };

  const ImageTake = async (event) => {
    await onFileUpload(event.target.files[0])
  };
  const batchColor = ['primary', 'success', 'danger', 'warning', 'info'];
  const addIntoTopics = (e) => {
    if (e.key === 'Enter') {
      addTopic([...topicList, e.target.value]);
      document.getElementById('topic').value = '';
    }
  };
  const addIntoRules = (e) => {
    if (e.key === 'Enter'){
      if (showDesc && e.target.id === 'rulesdesc') {
        const ruleElement = {title: halfRule, description: e.target.value};
        addHalf('');
        addRules([...rulesList, ruleElement]);
        changeShow(false)
      }
      else {
        let flag = true
        for (const i in reduxData.rules) {
          if (e.target.value === reduxData.rules[i].title) {
            if (!rulesList.includes(reduxData.rules[i])){
              addRules([...rulesList, reduxData.rules[i]]);
              flag = false;
            }
            else{
              flag = false;
            }
          }
        }
        if (flag){
          addHalf(e.target.value)
          changeShow(true)
        }
      }
    }
  };
  
  const removeFromRules = (rules) => {
    rulesList.splice(rulesList.indexOf(rules), 1);
    addRules([...rulesList]);
    // addTopic(topicList.splice();
  };
  const removeFromTopics = (topic) => {
    topicList.splice(topicList.indexOf(topic), 1);
    addTopic([...topicList]);
    // addTopic(topicList.splice();
  };
  const rulesTitles = reduxData.rules.map((rule) => rule.title)
  const topicDescription = reduxData.topics.map((topic) => topic.description)
  const input = document.querySelector('topic');
  if (input !== null) {
    input.addEventListener('keyup', (e) => {
      let event;
      if (!e) event = window.event;
    });
  }
  const submit = () => {
    const data = {
      admin_id: localStorage.getItem('user'),
      community_name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      rules: rulesList,
      topic: topicList,
      members: [localStorage.getItem('user')],
      images: imageList,
    };
    const  newTopic=[];
    const newRule=[];
    // for (const i in rulesList) {
    //   if (!reduxData.rules.include(rulesList[i])) newRule.push(rulesList[i])
    // }
    // for (const i in topicList) {
    //   if (!reduxData.topics.include(rulesList[i])) newTopic.push(rulesList[i])
    // }
    dispatch(addCommunity(data));
  };
  return (
    <>
      <Header />
      <Row>
        <Col
          sm={1}
          style={{
            background: ` url(frontend/src/side_bg.jpeg)`,
            backgroundSize: '20px 100%',
          }}
        />
        <Col>
          <form className="form-signin" style={{ marginTop: '5%' }}>
            <p className="display-4">Create a Community</p>
            <Dropdown.Divider />
            <Container>
              <Row>
                <Col>
                  <div className="form-label-group">
                    <h6>Name</h6>
                    <footer className="blockquote-footer">
                      Community names including capitalizing cannot be changed{' '}
                    </footer>
                    <input
                      type="name"
                      onChange={null}
                      id="name"
                      className="form-control"
                      placeholder="Community Name"
                      data-testid="name"
                    />
                  </div>
                  <div className="form-label-group">
                    <h6>Description</h6>
                    <input
                      type="description"
                      onChange={null}
                      id="description"
                      className="form-control"
                      placeholder="Community Description"
                      data-testid="description"
                    />
                  </div>
                  <div className="form-label-group">
                    <Typography>Topics</Typography>
                    <footer className="blockquote-footer">
                      This will help relevant user to find your community{' '}
                    </footer>
                    <Hint options={topicDescription} allowTabFill>
                      <input
                        type="text"
                        value={textState}
                        id="topic"
                        onChange={(e) => setTextState(e.target.value)}
                        onKeyDown={addIntoTopics}
                        className="form-control"
                        data-testid="topic"
                      />
                    </Hint>
                    {topicList.length > 0
                      ? topicList.map((topic) => (
                          <Badge pill variant={batchColor[topicList.indexOf(topic) % 5]}>
                            {' '}
                            {topic}{' '}
                            <FaTimes
                              onClick={() => removeFromTopics(topic)}
                              style={{ color: 'white', cursor: 'pointer' }}
                            />
                          </Badge>
                        ))
                      : null}
                  </div>
                  <div className="form-label-group">
                    <Typography>Rules of the group(Titles)</Typography>
                    <footer className="blockquote-footer">
                      This will be rules your community{' '}
                    </footer>
                    <Hint options={rulesTitles} allowTabFill>
                      <input
                        pill
                        type="text"
                        value={textState2}
                        id="rulestitle"
                        ref="inputrules"
                        onChange={(e) => setTextState2(e.target.value)}
                        onKeyDown={addIntoRules}
                        className="form-control"
                        data-testid="rulestitle"
                      />
                    </Hint>
                    
                    {showDesc ? <div className="form-label-group">
                    <h6>Rule Description</h6>
                    <input
                      type="description"
                      onChange={null}
                      id="rulesdesc"
                      className="form-control"
                      placeholder="Community Description"
                      onKeyDown={addIntoRules}
                      data-testid="rulesdesc"
                    />
                  </div> : null
                    }
                    {rulesList.length > 0
                      ? rulesList.map((rules) => (
                          <Badge pill variant={batchColor[rulesList.indexOf(rules) % 5]}>
                            {' '}
                            {`${rules.title}: ${rules.description}`}{' '}
                            <FaTimes
                              onClick={() => removeFromRules(rules)}
                              style={{ color: 'white', cursor: 'pointer' }}
                            />
                          </Badge>
                        ))
                      : null}
                  </div>
                  <Typography>Add Images</Typography>
                  <Form>
                    <Form.File id="custom-file" label="Add" custom onChange={ImageTake} />
                    <br />

                    {imageList.length === 0 ? null : (
                      <Carousel
                        style={{
                          maxWidth: '400px',
                          maxHeight: '200px',
                          minHeight: '200px',
                          textAlign: 'center',
                        }}
                      >
                        {imageList.map((image) => (
                          <Carousel.Item>
                            <img
                              style={{ maxWidth: '400px', maxHeight: '200px', minHeight: '200px' }}
                              src={image}
                              className="d-block w-100"
                            />
                          </Carousel.Item>
                        ))}
                        ;
                      </Carousel>
                    )}
                  </Form>
                </Col>
              </Row>
              <Row style={{ marginTop: '1%' }}>
                <Button
                  variant="primary"
                  style={{
                    'background-color': '#0579d3',
                    color: '#ffffff',
                    'border-color': '#0579d3',
                  }}
                  onClick={() => submit()}
                >
                  Create Community
                </Button>
              </Row>
            </Container>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default MyCommunityCreate;
