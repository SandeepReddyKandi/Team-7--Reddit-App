import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Typography } from '@material-ui/core';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  render() {
    const { comments } = this.state;
    return (
      <>
        {' '}
        <Typography className="header-label">{comments.length} comments</Typography>
        {comments.length > 0 &&
          comments.map((c) => (
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              multiSelect
            >
              <TreeItem nodeId="1" label={c}>
                <TreeItem nodeId="6" label={c.childComment} />
              </TreeItem>
            </TreeView>
          ))}
      </>
    );
  }
}

export default Comment;
