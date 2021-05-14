const kafka = require('../kafka/client');
var { auth, checkAuth } = require('../utils/passport');
auth();

const {
  ADD_COMMUNITY,
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  RATE_COMMUNITY,
  SEND_INVITE,
  GET_STATUS,
  GET_COMMUNITY_BY_NAME,
  GET_COMMUNITY_BY_ADMIN,
  GET_COMMUNITY_ANALYTICS,
  GET_COMMUNITY_BY_MEMBER,
  GET_RULES_TOPICS,
  GET_INVITATIONS,
  DELETE_COMMUNITY_BY_ID,
  GET_COMMUNITY_BY_PAGE,
  GET_INVITATIONS_BY_PAGE,
  GET_COMMUNITY_VOTE_COUNT,
} = require('../kafka/topics');

exports.addCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getRulesTopics = async (req, res) => {
  //console.log("Here.....", req.body)
  const payload = { rules: true, topics: true };
  kafka.make_request(GET_RULES_TOPICS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.deleteCommunityById = async (req, res) => {
  const payload = { community_id: req.query.community_id };
  kafka.make_request(DELETE_COMMUNITY_BY_ID, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getCommunity = async (req, res) => {
  let msg = '';
  if (req.query.id !== '') {
    msg = req.query.id;
  }

  kafka.make_request(GET_COMMUNITY, msg, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        //role: results.role,
      });
    }
  });
};
exports.getCommunityById = async (req, res) => {
  const payload = { community_id: req.query.community_id };
  kafka.make_request(GET_COMMUNITY_BY_ID, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityByAdmin = async (req, res) => {
  const payload = { adminId: req.query.id };
  kafka.make_request(GET_COMMUNITY_BY_ADMIN, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityAnalytics = async (req, res) => {
  const payload = { adminId: req.body.adminId, jwtAuthData: req.user };
  kafka.make_request(GET_COMMUNITY_ANALYTICS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        success: true,
        data: results.data,
      });
    }
  });
};

exports.getCommunityByMember = async (req, res) => {
  const payload = { memberId: req.query.id };
  kafka.make_request(GET_COMMUNITY_BY_MEMBER, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityByName = async (req, res) => {
  const payload = { communityName: req.query.name };
  kafka.make_request(GET_COMMUNITY_BY_NAME, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityByPage = async (req, res) => {
  const data = {
    communityName: req.body.name,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(GET_COMMUNITY_BY_PAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.rateCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(RATE_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.sendInvite = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(SEND_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.getStatus = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(GET_STATUS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.getInvitations = async (req, res) => {
  const payload = { userId: req.query.userId };
  kafka.make_request(GET_INVITATIONS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getInvitationsByPage = async (req, res) => {
  const data = {
    userId: req.body.userId,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(GET_INVITATIONS_BY_PAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityVoteCount = async (req, res) => {
  const payload = { id: req.query.id };
  kafka.make_request(GET_COMMUNITY_VOTE_COUNT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};
