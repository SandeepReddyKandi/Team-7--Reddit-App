import React from 'react';
import Header from "../Header/Header";
import './community-analytics.css';

class CommunityAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                name: 'Hello SJSU!',
                id: 'r/hello_sjsu',
            }
        }
    }

    render() {
        const { community } = this.state;
        return (
            <>
                <Header showLogin={false} showSignup={false} />
                <div className='analytics-container'>
                    <div className="">
                        <span className='comm-top-background'>
                            <a className="" href='/bala'>
                                <div className=""/>
                            </a>
                        </span>
                        <div className="comm-header">
                            <div className="comm-header-cont">
                                <img src="https://styles.redditmedia.com/t5_2rhz9/styles/communityIcon_gyisrr8vpei31.png?width=256&amp;s=421b4a63cfb7177d75995968607256509dc9496e" alt='i'/>
                                <div className="comm-header-text-cont">
                                    <h1 className="">Community Analytics Page</h1>
                                    <h2 className="">Track and measure interaction in your communities here!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    {community.name}
                </div>
            </>
        )
    }
}

export default CommunityAnalytics;
