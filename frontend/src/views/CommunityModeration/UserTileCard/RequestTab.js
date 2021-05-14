/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import { useSelector,useDispatch } from 'react-redux';
import { approveInvitataion } from '../../../actions/CommunityModerationAction';
import './UserTile.css';

export default function RequestTab({communityId}) {
    const dispatch = useDispatch();
    const reduxData = useSelector((state) => state.communitymoderation);
    const approveInvite = (userId, inviteId) => {
        console.log(userId, ".......", inviteId )
        const data = {invite_id: inviteId, invitee: userId, community_id:communityId}
        dispatch(approveInvitataion(data))
    }
    return (
        <div className="community-section">
            <div className="title">
                <span className="hoverable">Pending Invites</span>
            </div>
            <div className="communities-wrapper">
                {(reduxData.invitations.length > 0 ? <div>{reduxData.invitations.map((invite, index) => (
                    <div className="community hoverable">
                        <span>{index + 1}</span>
                        <span className="name">. {invite.sender.name}</span>
                        <IconButton aria-label="add to favorites">
                        <CheckIcon onClick={() => approveInvite(invite.sender._id, invite._id)}/>
                        </IconButton>
                    </div>
                ))}</div>:null)}
                
            </div>           
        </div>
    );
}