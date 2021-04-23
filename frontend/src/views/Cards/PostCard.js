import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';

class PostCard extends React.Component {
  render() {
    return (
      <>
        <div>
          <Card>
            <Row>
              <Col md={12}>
                <CardContent>
                  <Col md={12}>
                    <Row>
                      {' '}
                      <TextField
                        id="outlined-size-small"
                        placeholder="Title"
                        variant="outlined"
                        size="small"
                        fullWidth="true"
                        onClick={this.createPost}
                      />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                      <TextareaAutosize
                        rowsMin={6}
                        placeholder="Text(required)"
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
                          onClick={this.handleSignupModal}
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
