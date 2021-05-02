/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import { Form, Carousel } from 'react-bootstrap';
// import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line import/no-named-as-default-member
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { FaTimes } from 'react-icons/fa';
import { addCommunity, getRulesTopic } from '../../actions/MyCommunityActions';
import Header from '../Header/Header';
import logo from '../../side_bg.jpeg';

// eslint-disable-next-line arrow-body-style
const MyCommunity = () => {
  const [imageList, addImage] = useState([]);
  const [imgCounter, addCounter] = useState(0);
  const [showImage, addShowImage] = useState([]);
  const [topicList, addTopic] = useState([]);
  const [rulesList, addRules] = useState([]);
  const dispatch = useDispatch();
  const [textState, setTextState] = useState();
  const [textState2, setTextState2] = useState();
  const reduxData = useSelector((state) => state.addCommunity);
  const ImageTake = async (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    addShowImage([...showImage, url]);
    addCounter(imgCounter + 1);
    addImage([
      ...imageList,
      {
        id: `image${imgCounter}`,
        file: event.target.files[0],
        file_name: event.target.files[0].name,
      },
    ]);
  };
  useEffect(() => {
    // dispatch(getRulesTopic());
  }, [dispatch]);

  const batchColor = ['primary', 'success', 'danger', 'warning', 'info'];
  const addIntoTopics = (e) => {
    if (e.key === 'Enter') {
      addTopic([...topicList, e.target.value]);
      document.getElementById('topic').value = '';
    }
  };
  const addIntoRules = (e) => {
    if (e.key === 'Enter') {
      addRules([...rulesList, e.target.value]);
      document.getElementById('rules').value = '';
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
  const input = document.querySelector('topic');
  if (input !== null) {
    input.addEventListener('keyup', (e) => {
      let event;
      if (!e) event = window.event;
      console.log(event);
      console.log(e);
    });
  }
  const submit = () => {
    const data = {
      name: document.getElementById('name').value,
      description: document.getElementById('desc').value,
      rules: null,
    };
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
                    <Hint options={reduxData.topics} allowTabFill>
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
                    <Typography>Rules of the group</Typography>
                    <footer className="blockquote-footer">
                      This will be rules your community{' '}
                    </footer>
                    <Hint options={reduxData.topics} allowTabFill>
                      <input
                        pill
                        type="text"
                        value={textState2}
                        id="rules"
                        onChange={(e) => setTextState2(e.target.value)}
                        onKeyDown={addIntoRules}
                        className="form-control"
                        data-testid="rules"
                      />
                    </Hint>
                    {rulesList.length > 0
                      ? rulesList.map((rules) => (
                          <Badge pill variant={batchColor[rulesList.indexOf(rules) % 5]}>
                            {' '}
                            {rules}{' '}
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

                    {showImage.length === 0 ? null : (
                      <Carousel
                        style={{
                          maxWidth: '400px',
                          maxHeight: '200px',
                          minHeight: '200px',
                          textAlign: 'center',
                        }}
                      >
                        {showImage.map((image) => (
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
                  onClick="Submit"
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

export default MyCommunity;
