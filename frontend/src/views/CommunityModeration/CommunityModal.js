/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import Modal from "react-modal";
import {Row, Col} from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import UserTile from './UserTileCard/UserTile';
import {removeMemberFromCommunity} from '../../actions/CommunityModerationAction';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
const CommunityModal = ({userList,community, isOpen, exitModal}) => {
    const dispatch = useDispatch();
    const [list, selectList] = useState([]);
    const filterSearch = (event) => {
        if (event.target.value === '') {
            selectList(list)
        }
        else {
            const newList = []
            for (const i in userList){
                if (userList[i].name.toLowerCase().includes(event.target.value.toLowerCase())){
                    newList.push(userList[i])
                }
            }
            selectList(newList)
        }
    }
    useEffect(() => {
        selectList(userList)
    }, [userList])
    
    const removeMember = (userId) => {
        const data = { community_id: community, user_id: userId}
        console.log(data);
        dispatch(removeMemberFromCommunity(data));
    }
    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <Row>
            <Col md={{offset:2}}>
            
          <input id="searchbar" placeholder="Search" onChange={filterSearch}/>
            </Col>
            <Col>
            <IconButton aria-label="share">
                <CloseIcon onClick={() => exitModal()} />
            </IconButton>
            </Col>
            </Row>
            <div>
                <UserTile users = {list} removeMember={removeMember}/>
            </div>
        </Modal>
    )
        
}

export default CommunityModal;
