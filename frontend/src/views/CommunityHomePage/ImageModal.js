import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ImageModal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClose = () => {
    const { show } = this.props;
    show(false);
  };

  render() {
    const { images, show } = this.props;
    return (
      <Modal
        data-testid="add-expense"
        show={show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        size="large"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minWidth: '200px', minHeight: '200px' }}>
          {' '}
          {images.length === 0 ? null : (
            <Carousel
              style={{
                minWidth: '200px',
                minHeight: '200px',
                textAlign: 'center',
              }}
            >
              {images.map((image) => (
                <Carousel.Item>
                  <img src={image} alt="" className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

ImageModal.propTypes = {
  images: PropTypes.objectOf.isRequired,
  show: PropTypes.string.isRequired,
};

export default ImageModal;
