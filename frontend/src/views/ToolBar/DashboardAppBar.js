import React from 'react';
import Col from 'react-bootstrap/Col';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import { Redirect } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import RedditICon from '../../community.png';

class CommunityAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: false };
    }

    createPost = () => {
        const { post } = this.state;
        this.setState({ post: !post });
    };

    handleUpvoteClick = () => {
        const { upvote } = this.props;
        upvote();
    };

    handleDownvoteClick = () => {
        const { downvote } = this.props;
        downvote();
    };

    handleDate = () => {
        const { date } = this.props;
        date();
    };

    render() {
        const { post } = this.state;
        if (post) {
            return <Redirect to="/createpost" />;
        }

        return (
            <AppBar position="static" color="white" style={{ marginBottom: '10px' }}>
                <Toolbar variant="dense">
                    <Col md={0.5}>
                        <Avatar src={RedditICon} aria-label="recipe" alt="" />
                    </Col>
                    <Col md={6}>
                        <TextField
                            id="outlined-size-small"
                            placeholder="Create Post"
                            variant="outlined"
                            size="small"
                            fullWidth="true"
                            onClick={this.createPost}
                        />
                    </Col>
                    <Col md={1}>
                        <IconButton style={{ padding: 'revert' }}>
                            <ImageIcon color="primary" fontSize="medium" />
                        </IconButton>
                    </Col>
                    <Col md={1}>
                        <IconButton style={{ padding: 'revert' }}>
                            <LinkIcon color="default" />
                        </IconButton>
                    </Col>
                    <Col md={0.5}>
                        {' '}
                        <Dropdown>
                            <Dropdown.Toggle className="header-user sort-post" id="dropdown-basic">
                                Sort
              </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleUpvoteClick}>Upvotes</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleDownvoteClick}>Users</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleDate}>Comments</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={1}>
                        <Dropdown>
                            <Dropdown.Toggle className="header-user sort-post" id="dropdown-basic">
                                Order
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleUpvoteClick}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleDownvoteClick}>Descending</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Toolbar>
            </AppBar>
        );
    }
}

CommunityAppBar.propTypes = {
    upvote: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired,
    date: PropTypes.func.isRequired,
};

export default CommunityAppBar;
