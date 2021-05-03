/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import TopCommunityInfo from '../TopCommunitiesInfo/TopCommunityInfo';

export default function SideBar() {
    return (
        <div className='side-bar'>
            <TopCommunityInfo />
        </div >
    );
}