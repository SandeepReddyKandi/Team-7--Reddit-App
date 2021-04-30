const kafka = require('../kafka/client');
const { ADD_COMMENT } = require('../kafka/topics');

exports.addComment = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMENT, payload, (error, results) => {
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
