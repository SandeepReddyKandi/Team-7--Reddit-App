/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './TopCommunityInfo.css';
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

export default function TopCommunityInfo() {
    const communities = [
        {
            "image_src": "assets/subreddit.jpg",
            "name": "UpliftingNews"
        },
        {
            "image_src": "assets/subreddit.jpg",
            "name": "nottheonion"
        },
        {
            "image_src": "assets/subreddit.jpg",
            "name": "technews"
        },
        {
            "image_src": "assets/subreddit.jpg",
            "name": "gamernews"
        },
        {
            "image_src": "assets/subreddit.jpg",
            "name": "news"
        }
    ];
    return (
        <div className="community-section">
            <div className="title">
                <span className="hoverable">Today&apos;s Top Growing Communities</span>
            </div>
            <div className="communities-wrapper">
                {communities.map((community, index) => (
                    <div className="community hoverable">
                        <span>{index + 1}</span>
                        <ArrowDropUp />
                        <img src={community.image_src} alt='logo' />
                        <span className="name">r/{community.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}