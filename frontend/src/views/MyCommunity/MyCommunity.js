/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable constructor-super */
import { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { addCommunity } from '../../actions/MyCommunityActions';
import Header from '../Header/Header';

// eslint-disable-next-line arrow-body-style
const MyCommunity = () => {
  const [imageList, addImage] = useState([]);
  const [imgCounter, addCounter] = useState(0);
  const [showImage, addShowImage] = useState([]);
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.myCommunity);
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
        <Col sm={2} />
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
                    <div className="form-group">
                      <select className="form-control" id="sel1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                  <Typography>Add Images</Typography>
                  <Form>
                    <Form.File id="custom-file" label="Add" custom onChange={ImageTake} />
                  </Form>
                </Col>

                {showImage.length === 0 ? null : (
                  <Carousel style={{ maxWidth: '400px', maxHeight: '200px', minHeight: '200px' }}>
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
              </Row>
            </Container>
            <Button
              variant="primary"
              style={{ 'background-color': '#0579d3', color: '#ffffff', 'border-color': '#0579d3' }}
              type="submit"
              onClick="Submit"
            >
              Signup
            </Button>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default MyCommunity;
