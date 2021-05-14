const Community = require("../../models/CommunityModel");
const Post = require("../../models/PostModel");
const User = require("../../models/UserModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
    try {
        if (!req.adminId) {
            return callback(null, {
                msg: 'Missing required field - adminId',
                success: false,
            });
        }
        else if (`${req.adminId}` !== `${req.jwtAuthData._id}`) {
            return callback(null, {
                msg: 'You cannot view other community analytics for other users',
                success: false,
            });
        }
        const criteria = {};
        if (req.adminId) {
            criteria.admin_id = req.adminId;
        }

        const agg = Community.aggregate([{$match: {admin_id: mongoose.Types.ObjectId(req.adminId)}}, {
            $project: {
                membersCount: {$size: '$members'},
                postsCount: {$size: '$posts'},
                members: 1,
                posts: 1,
                images: 1,
                rules: 1,
                upvote: 1,
                downvote: 1,
                community_id: 1,
                community_name: 1,
                description: 1,
                admin_id: 1,
                createdAt: 1,
            }
        }])

        const postDetailMap = {};
        const communityDetailQuery = {};

        for await (const doc of agg) {
            // loop over posts and store the mostUpvotedPost, and create a map for the user who created these posts
            const postsQueryList = doc.posts.filter(post => !!post).map(post => {
                return new Promise((res) => {
                    res(
                        Post.aggregate(
                            [
                                {
                                    $match: {_id: post}
                                },
                                {
                                    $project: {upvoteCount: {$size: '$upvote'}, title: 1, author_id: 1, community_id: 1}
                                }
                            ])
                    )
                });
            })
            communityDetailQuery[doc._id] = {
                query: postsQueryList,
                membersCount: doc.membersCount,
                postsCount: doc.postsCount,
                communityId: doc._id,
                communityName: doc.community_name,
            };
        }

        for (const comm of Object.keys(communityDetailQuery)) {
            const { query, ...rest } = communityDetailQuery[comm];

            const res = await Promise.all(query);
            const mostUpVoteObj = { upvoteCount: 0, postId: '', postTitle: ''}
            const mostActiveUser = { userId: '', postsCounts: 0}
            const authorPostCountMap = {}
            res.map(resItem => {
                const {upvoteCount,author_id, _id, title, community_id } = resItem[0];
                if (upvoteCount > mostUpVoteObj.upvoteCount) {
                    mostUpVoteObj.community_id = community_id;
                    mostUpVoteObj.postTitle = title;
                    mostUpVoteObj.upvoteCount = upvoteCount;
                }
                authorPostCountMap[author_id] = authorPostCountMap[author_id] ? authorPostCountMap[author_id] + 1 : 1;
            });
            Object.keys(authorPostCountMap).map(authorId => {
                if (authorPostCountMap[authorId] > mostActiveUser.postsCounts) {
                    mostActiveUser.userId = authorId;
                    mostActiveUser.postsCounts = authorPostCountMap[authorId];
                }
            })
            // get Community details
            let communityDetails = {};
            if (mostUpVoteObj.community_id) {
                communityDetails = await Community.findOne({community_id: mostUpVoteObj.community_id}, {
                    images: 1,
                    rules: 1,
                    posts: 1,
                    members: 1,
                    upvote: 1,
                    downvote: 1,
                    community_id: 1,
                    community_name: 1,
                    description: 1,
                    admin_id: 1,
                    createdAt: 1,
                    topic: 1,
                });
                console.log('COMMUNITY DETAILS IS, ',mostUpVoteObj,  communityDetails)
            }

            // get Community details
            let userDetails = {};
            if (mostActiveUser.userId) {
                userDetails = await User.findById(mostActiveUser.userId, {
                    userName: 1,
                    name: 1,
                    location: 1,
                    description: 1,
                    gender: 1,
                    photo: 1,
                    topics: 1,
                    createdAt: 1,
                });
                console.log('USER DETAILS IS, ', userDetails)

            }
            postDetailMap[comm] = {
                ...rest,
                mostUpVotedPost: communityDetails ? { ...communityDetails._doc, ...mostUpVoteObj} : mostUpVoteObj,
                mostActiveUser: userDetails ? { ...userDetails._doc, ...mostActiveUser} : mostActiveUser,
            };

        }
        return callback(null, {
            data: postDetailMap,
            success: true,
        });
    } catch (error) {
        return callback(null, {
            msg: error.message,
            success: false,
        });
    }
};

exports.handle_request = handle_request;

