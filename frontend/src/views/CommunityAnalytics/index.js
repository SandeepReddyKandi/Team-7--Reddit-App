import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {Line} from "react-chartjs-2/dist";
import Header from "../Header/Header";
import './community-analytics.css';
import UserCard from "../UserCard";
import CommunityCard from "../CommunityCard";
import constants from "../../constants/constants";
import TextDisplayCard from "../Cards/TextDisplayCard";


const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
};

class CommunityAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUserChart: {
                data: {
                    label: [],
                    datasets: [],
                },
                options: {}
            },
            postsChart: {
                data: {
                    label: [],
                    datasets: [],
                },
                options: {}
            },
            mostActiveCommunity: {
                avatar: 'https://picsum.photos/200/300/?blur',
                name: 'Hello SJSU!',
                id: 'r/hello-sjsu',
                about: 'All the cool discussion going on in our SJSU University!'
            },
            analyticsData: {}
        }
    }

    componentDidMount() {
        // Call API to get the community analytics community/get-community-analytics
        axios.post(`${constants.baseUrl}/community/get-community-analytics`, {
            adminId: localStorage.getItem('userId'),
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then((response, error) => {
            if (error) {
                console.log(response);
            } else {
                this.transformAnalyticsData(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getMostActiveCommunityDetails(maxUpvotesCommId) {
        // get the community details by comm-ID
        axios.get(`${constants.baseUrl}/community/communities/${maxUpvotesCommId}`, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then((response, error) => {
            if (error || !response.data) {
                console.log(response);
            } else {
                this.setState({
                    mostActiveCommunity: response.data.data,
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    transformAnalyticsData = async (param) => {

        const data = param ? param.data : {};
        console.log('data is', data);
        const memberData = {
            labels: [], // Ids of group
            datasets: [
                {
                    label: '# of active users',
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    pointRadius: 4,
                    backgroundColor: '#1380d2',
                    borderColor: '#3d79b4',
                },
            ],
        }
        const postData = {
            labels: [], // Ids of group
            datasets: [
                {
                    label: '# of posts',
                    data: [],
                    fill: false,
                    pointRadius: 4,
                    backgroundColor: '#ec0623',
                    borderColor: '#fa8127',
                },
            ],
        };

        const commNameLabels = []
        const postPerComm = []
        const memPerComm = []
        let maxUpvotes = 0;
        let maxUpvotesCommId = '';

        Object.keys(data).forEach((commId) => {
            commNameLabels.push(data[commId].communityName);
            postPerComm.push(data[commId].postsCount);
            memPerComm.push(data[commId].membersCount);
            if (maxUpvotes < data[commId].postsCount) {
                maxUpvotes = data[commId].postsCount;
                maxUpvotesCommId = commId;
            }
        });

        postData.labels = commNameLabels;
        postData.datasets[0].data = postPerComm;
        memberData.labels = commNameLabels;
        memberData.datasets[0].data = memPerComm;

        this.setState({
            activeUserChart: {
                data: memberData,
                options,
            },
            postsChart : {
                data: postData,
                options,
            },
            analyticsData: data || {},
        });

        this.getMostActiveCommunityDetails(maxUpvotesCommId);
    }

    render() {
        const { analyticsData, activeUserChart, postsChart, mostActiveCommunity } = this.state;
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
                <Container>
                    <Row style={{ padding: '20px 24px'}}>
                        <Col style={{ width: '640px', flexBasis: 'auto'  }} >
                            <div className='comm-card'>
                                <div className='comm-card-head'>Active User Info For Each Community</div>
                            </div>

                            <div className='comm-card'>
                                <Line data={activeUserChart.data} options={activeUserChart.options} />
                            </div>

                            <div className='comm-card'>
                                <div className='comm-card-head'>Posts Info For Each Community</div>
                            </div>

                            <div className='comm-card'>
                                <Line data={postsChart.data} options={postsChart.options} />
                            </div>
                            <div className='comm-card'>
                                <div className='comm-card-head'>Most Upvoted Post In Each Community</div>
                            </div>
                            {
                                Object.keys(analyticsData).filter(comm => analyticsData[comm].mostUpVotedPost.community_id).map(comm => (
                                        <>
                                            <div className='comm-card'>
                                                <div className='comm-card-head'>Community Name:- <b>{analyticsData[comm].communityName}</b></div>
                                                <TextDisplayCard post={analyticsData[comm].mostUpVotedPost} />
                                            </div>
                                        </>
                                    )
                                )
                            }
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <div  style={{ marginBottom: '24px'}}>
                                <div className='comm-card'>
                                    <div className='comm-card-head no-mar'>Most Active Community</div>
                                    <div className='comm-card-small-text no-mar'>Community with most number of posts</div>
                                </div>
                                <CommunityCard community={mostActiveCommunity} showEdit={false}/>
                            </div>
                            <div className='comm-card'>
                                <div className='comm-card-head'>Most Active Users In Each Community</div>
                            </div>
                            {
                                analyticsData && Object.keys(analyticsData).filter(comm => analyticsData[comm].mostActiveUser.userId).map(comm => (
                                        <div style={{ marginBottom: '24px'}}>
                                            <div className='comm-card'>
                                                <div className='comm-card-head no-mar'>Community Name:- <b>{analyticsData[comm].communityName}</b></div>
                                                <div className='comm-card-small-text no-mar'>Created most number of posts in <b>{analyticsData[comm].communityName}</b></div>
                                            </div>
                                            <UserCard user={analyticsData[comm].mostActiveUser} showEdit={false}/>
                                        </div>
                                    )
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CommunityAnalytics;
