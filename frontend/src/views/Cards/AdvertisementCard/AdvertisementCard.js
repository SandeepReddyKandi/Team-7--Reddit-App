/* eslint-disable react/prefer-stateless-function */
import React from 'react';
// import './AdvertisementCard.css';
import Col from 'react-bootstrap/Col'
import LoyaltyIcon from '@material-ui/icons/Loyalty';

export default function AdvertisementCard() {
    return (
        <div style={{ marginTop: '10px', paddingRight: '5px', display: 'flex', maxheight: '100px' }}>
            <Col md={1} style={{ display: 'table', height: '100%' }}>
                <LoyaltyIcon />
            </Col>
            <Col md={6} style={{ display: 'flex', maxWidth: '125px' }} >
                <p>The best Reddit experience, with monthly Coins</p>
            </Col>
        </div>
    );
}