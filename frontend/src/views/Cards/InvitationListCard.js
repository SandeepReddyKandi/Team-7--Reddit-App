import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import './TextDisplayCard.css';

// eslint-disable-next-line react/prefer-stateless-function
class InvitationListCard extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { invitation } = this.props;
    return (
      <div className="posts-wrapper">
        <Card style={{ marginTop: '2em' }}>
          <div className="post">
            <Row style={{ minWidth: '50vw', height: '100%' }}>
              <Col md={12} style={{ paddingLeft: '5%' }}>
                <Row>
                  <Col md={6}>
                    <span className="title">Community: {invitation.community_id}</span>
                    <span>
                      <br />
                      Sender: {invitation.sender}
                    </span>
                    <span>
                      <br />
                      Recepient: {invitation.recepient}
                    </span>
                  </Col>
                  <Col md={6}>
                    <span className="title">Status: {invitation.status}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

InvitationListCard.propTypes = {
  invitation: PropTypes.objectOf.isRequired,
};

export default InvitationListCard;
