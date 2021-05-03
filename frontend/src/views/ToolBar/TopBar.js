/* eslint-disable constructor-super */

import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import GradeIcon from '@material-ui/icons/Grade';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function TopBar(){
    return (
        <AppBar position="static" color="default"
        style={{
          alignItems: 'center', backgroundColor: '#ffffff',
          border: '1px solid darkGray',
          borderRadius: '4px', boxSizing: 'border-box',
          display: 'flex', flexFlow: 'row',
          justifyContent: 'flex-start', marginBottom: '16px',
          padding: '10px 12px'
        }}>
        <Toolbar variant="dense" style={{
          alignItems: 'flex-start', display: 'flex'
        }}>
          {' '}
          <Row>
            <Col md={8} style={{ display: 'contents', alignItems: 'flex-start' }}>
              <Col>
                <Chip icon={<GradeIcon />} label="Best" color='primary'
                  style={{
                    cursor: 'pointer',
                    background: '#f6f7f8',
                    color: '#0079d3',
                    position: 'relative',
                    border: '1px solid transparent',
                    fontFamily: 'Noto Sans,Arial,sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    letterSpacing: 'unset', lineHeight: '17px',
                    textTransform: 'unset', minHeight: '32px',
                    minWidth: '32px', padding: '4px 16px'
                  }} />
              </Col>
              <Col>
                <Chip
                  label="Hot" icon={<WhatshotIcon />}
                  clickable
                  style={{
                    background: 'transparent',
                    color: '#0079d3',
                    fill: '#0079d3',
                    position: 'relative',
                    border: '1px solid transparent',
                    fontFamily: 'Noto Sans,Arial,sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    letterSpacing: 'unset', lineHeight: '17px',
                    textTransform: 'unset', minHeight: '32px',
                    minWidth: '32px', padding: '4px 16px'
                  }}
                />
              </Col>
              <Col>
                <Chip label="New" icon={<FiberNewIcon />} clickable
                  color="primary" deleteIcon={<ExpandMoreIcon />}
                  style={{
                    background: 'transparent',
                    color: '#0079d3',
                    fill: '#0079d3',
                    position: 'relative',
                    border: '1px solid transparent',
                    fontFamily: 'Noto Sans,Arial,sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    letterSpacing: 'unset', lineHeight: '17px',
                    textTransform: 'unset', minHeight: '32px',
                    minWidth: '32px', padding: '4px 16px'
                  }} />
              </Col>
              <Col>
                <Chip icon={<TrendingUpIcon />} label="Top"
                  style={{
                    cursor: 'pointer',
                    background: 'transparent',
                    color: '#0079d3',
                    fill: '#0079d3',
                    position: 'relative',
                    border: '1px solid transparent',
                    fontFamily: 'Noto Sans,Arial,sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    letterSpacing: 'unset', lineHeight: '17px',
                    textTransform: 'unset', minHeight: '32px',
                    minWidth: '32px', padding: '4px 16px'
                  }} />
              </Col>
            </Col>
          </Row>
          <Col md={1} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <button type='button' style={{
              backgroundColor: 'transparent',
              color: 'gray',
              alignItems: 'center', cursor: 'pointer',
              display: 'flex', margin: 0,
              padding: 0, border: 0,
              fontSize: '22px', fontWeight: 'bold',
              verticalAlign: 'baseline'
            }}>...</button>
          </Col>
          <Col md={1} >
            <Chip size='small'
              icon={<ViewAgendaIcon />}
              clickable color='primary'
              style={{
                background: 'transparent',
                color: '#0079d3',
                fill: '#0079d3',
                position: 'relative',
                border: '1px solid transparent',
                fontFamily: 'Noto Sans,Arial,sans-serif',
                fontSize: '14px', fontWeight: 700,
                letterSpacing: 'unset', lineHeight: '17px',
                textTransform: 'unset', minHeight: '32px',
                minWidth: '32px', padding: '4px 16px'
              }}
            />
          </Col>
        </Toolbar>
      </AppBar>
    );
}