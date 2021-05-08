const kafka = require('../kafka/client');
const { ADD_COMMENT, GET_COMMENT } = require('../kafka/topics');
var { auth, checkAuth } = require( '../utils/passport' )
auth(); 

exports.addComment = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMENT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getComment = async (req, res) => {
  const payload = { comment_id: req.query.comment_id };
  kafka.make_request(GET_COMMENT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res
        .status(200)
        .json({
          msg: results.msg,
          data: results.data,
        })
        .send();
    }
  });
};
