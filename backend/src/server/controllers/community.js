const kafka = require('../kafka/client');
const { ADD_COMMUNITY, GET_COMMUNITY, GET_COMMUNITY_BY_ID } = require('../kafka/topics');

exports.addCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getCommunity = async (req, res) => {
  const payload = '';
  kafka.make_request(GET_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
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
      console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};
