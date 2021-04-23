import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';

class ImageCard extends React.Component {
  render() {
    return (
      <>
        <div>
          <Card>
            <Row>
              <Col md={12}>
                <CardContent>
                  {' '}
                  <TextField
                    id="outlined-size-small"
                    placeholder="Create Post"
                    variant="outlined"
                    size="small"
                    fullWidth="true"
                    onClick={this.createPost}
                  />
                  <TextareaAutosize
                    rowsMin={6}
                    placeholder="Comment"
                    size="large"
                    defaultValue=""
                    style={{ width: '100%' }}
                  />
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
