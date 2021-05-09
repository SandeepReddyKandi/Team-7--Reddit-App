const Rules = require("../../models/RuleModel");
const Topics = require("../../models/TopicModel");


const handle_request = async (req, callback) => {
    try {
        console.log("final_data");
        const rules = await Rules.find();
        const topics = await Topics.find();
        const final_data = {rules: rules, topics: topics}
        return callback(null, {
            msg: "",
            success: true,
            data: final_data,
        });
    }
    catch (error) {
        return callback(null, {
          msg: error.message,
          success: false,
        });
    }
};

exports.handle_request = handle_request;
