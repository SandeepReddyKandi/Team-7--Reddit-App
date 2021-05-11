import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Line} from "react-chartjs-2/dist";
import Header from "../Header/Header";
import './community-analytics.css';
import UserCard from "../UserCard";
import CommunityCard from "../CommunityCard";

class CommunityAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {
                name: 'Hello SJSU!',
                id: 'r/hello_sjsu',
            },
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
            topUser: {
                avatar: 'https://picsum.photos/id/237/200/300',
                name: 'Kandi Sandeep',
                userName: 'u/sandeep-reddy',
                about: 'Nothing much, just getting bored!'
            },
            mostActiveCommunity: {
                avatar: 'https://picsum.photos/200/300/?blur',
                name: 'Hello SJSU!',
                id: 'r/hello-sjsu',
                about: 'All the cool discussion going on in our SJSU University!'
            }
        }
    }

    componentDidMount() {
        const data = {
            labels: ['hello-sjsu', 'awesome-group', 'kandi-group', 'sumeet-group', 'ruchi-group', 'kurakar-group'], // Ids of group
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
        };

        const postData = {
            labels: ['hello-sjsu', 'awesome-group', 'kandi-group', 'sumeet-group', 'ruchi-group', 'kurakar-group'], // Ids of group
            datasets: [
                {
                    label: '# of posts',
                    data: [220, 109, 30, 500, 122, 603],
                    fill: false,
                    pointRadius: 4,
                    backgroundColor: '#ec0623',
                    borderColor: '#fa8127',
                },
            ],
        };

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        this.setState({
            activeUserChart: {
                data,
                options,
            },
            postsChart : {
                data: postData,
                options,
            }
        })
    }

    render() {
        const { community, activeUserChart, postsChart, topUser, mostActiveCommunity } = this.state;
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
                                <div className='comm-card-head'>Active User Info</div>
                            </div>

                            <div className='comm-card'>
                                <Line data={activeUserChart.data} options={activeUserChart.options} />
                            </div>

                            <div className='comm-card'>
                                <div className='comm-card-head'>Posts Info</div>
                            </div>

                            <div className='comm-card'>
                                <Line data={postsChart.data} options={postsChart.options} />
                            </div>

                            <div className='comm-card'>
                                <div className='comm-card-head'>Most upvoted post</div>
                            {/*    TODO Show the post in here */}
                            </div>
                        </Col>
                        <Col style={{ width: '312px', marginLeft: '24px', flexBasis: 'auto' }}>
                            <div className='comm-card'>
                                <div className='comm-card-head no-mar'>Most Active User</div>
                                <div className='comm-card-small-text no-mar'>Created most number of posts</div>
                            </div>
                            <UserCard user={topUser} showEdit={false}/>

                            <div className='comm-card m-top-24'>
                                <div className='comm-card-head no-mar'>Most Active Community</div>
                                <div className='comm-card-small-text no-mar'>Community with most number of posts</div>
                            </div>
                            <CommunityCard community={mostActiveCommunity} showEdit={false}/>
                            {community.name}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default CommunityAnalytics;
