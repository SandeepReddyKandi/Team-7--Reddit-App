import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import constants from '../../constants/constants';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidUpdate = async () => {
    await this.getComments();
  };

  getComments = async () => {
    axios.defaults.withCredentials = true;
    const { postId } = this.props;
    await axios
      .get(`${constants.baseUrl}/comment/?id=${postId}`)
      .then((response, error) => {
        if (!error) {
          this.setState({
            comments: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ errormessage: error.response.data.msg });
      });
  };

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

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Comment;
