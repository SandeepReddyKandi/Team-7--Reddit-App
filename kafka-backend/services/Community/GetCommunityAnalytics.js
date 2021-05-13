const Community = require("../../models/CommunityModel");
const Post = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
    try {
        if (!req.adminId) {
            return callback(null, {
                msg: 'Missing required field - adminId',
                success: false,
            });
        }
        // else if (`${req.adminId}` !== `${req.jwtAuthData._id}`) {
        //     return callback(null, {
        //         msg: 'You cannot view other community analytics for other users',
        //         success: false,
        //     });
        // }
        const criteria = {};
        if (req.adminId) {
            criteria.admin_id = req.adminId;
        }
        // Community.find(criteria, (err, response) => {
        //     if (err) {
        //         return callback(null, {
        //             msg: err.message,
        //             success: false,
        //         });
        //     } else {
        //         console.log('[CB] Response is, ', response);
        //         return callback(null, {
        //             msg: "",
        //             success: true,
        //             data: response,
        //         });
        //     }
        // });
        const agg = Community.aggregate([{$match: {admin_id: req.adminId}}, {
            $project: {
                membersCount: {$size: '$members'},
                postsCount: {$size: '$posts'},
                members: 1,
                posts: 1
            }
        }])
        const postDetailMap = {};
        for await (const doc of agg) {
            console.log('[AA]', doc);
            // get the count of members

            // get the count of posts

            // loop over posts and store the mostUpvotedPost, and create a map for the user who created these posts
            const postsQueryList = doc.posts.filter(post => !!post).map(post => {
                return new Promise((res) => {
                    res(
                        Post.aggregate(
                            [
                                {
                                    $match: {_id: post }
                                },
                                {
                                    $project: { upvoteCount: {$size: '$upvote'}, title: 1, author_id: 1, }
                                }
                            ])
                    )
                });
            })

            Promise.all(postsQueryList).then(res => {
                const mostUpVoteObj = { upvoteCount: 0, postId: '', postTitle: ''}
                const mostActiveUser = { userId: '', postsCounts: 0}
                const authorPostCountMap = {}
                res.map(resItem => {
                    const {upvoteCount,author_id, _id, title } = resItem[0];
                    if (upvoteCount > mostUpVoteObj.upvoteCount) {
                        mostUpVoteObj.postId = _id;
                        mostUpVoteObj.postTitle = title;
                        mostUpVoteObj.upvoteCount = upvoteCount;
                    }
                    authorPostCountMap[author_id] = authorPostCountMap[author_id] ? authorPostCountMap[author_id] + 1 : 1;
                });

                Object.keys(authorPostCountMap).map(authorId => {
                    if (isNaN(authorPostCountMap[authorId]) || authorPostCountMap[authorId] > mostActiveUser.postsCounts) {
                        mostActiveUser.userId = authorId;
                        mostActiveUser.postsCounts = authorPostCountMap[authorId];
                    }
                })

                postDetailMap[doc._id] = {
                    numOfPosts: doc.postsCount,
                    membersCount: doc.membersCount,
                    mostUpVotedPost: mostUpVoteObj,
                    mostActiveUser: mostActiveUser
                };
                console.log('RESULT IN PROMISE ALL IS -- ', postDetailMap)
            })
            console.log('[LOOP ITERATION ENDS]')

            // Keep map of postId to { postname, userName } , where userName is who created the most upvotes
            // Keep map of postId to { postname, mostUpvotedPost, upvoteCount } , where userName is who created the most upvotes
        }
        return callback(null, {
            msg: 'error.message',
            success: false,
        });
    } catch (error) {
        return callback(null, {
            msg: error.message,
            success: false,
        });
    }
};

exports.handle_request = handle_request;

