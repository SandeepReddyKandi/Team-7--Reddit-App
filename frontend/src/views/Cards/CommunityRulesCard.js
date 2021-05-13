import React from 'react';

import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

class CommunityRulesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rules: this.props };
  }

  render() {
    const { rules } = this.state;
    return (
      <Card style={{ width: '100%' }}>
        <CardHeader
          subheader={<Typography className="sidecard-labels">Rules</Typography>}
          className="right-side-card"
          height
        />
        <CardMedia image="/static/images/cards/paella.jpg" title="Paella dish" />
        <CardContent className="reader-content">
          {rules.length > 0 ? (
            rules.map((r) => (
              <>
                <Typography variant="body2" component="p">
                  {r}
                </Typography>
                <div className="dropdown-divider" />;
              </>
            ))
          ) : (
            <Typography variant="body2" component="p">
              No Rules
            </Typography>
          )}
        </CardContent>

        <Collapse timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default CommunityRulesCard;
