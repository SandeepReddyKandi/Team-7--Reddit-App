const Rules = require("../../models/RuleModel");
const Topics = require("../../models/TopicModel");


const handle_request = async (req, callback) => {
    try {
        const rules = await Rules.find();
        const topics = await Topics.find();
        let rule_list =[];
        let topic_list =[];
        for (let i in rules){
            rule_list.push(rules[i].description)
        }
        for (let i in topics){
            topic_list.push(topics[i].description)
        }
        const final_data = {rules: rule_list, topics: topic_list}
        callback(null, {
            msg: "",
            success: true,
            data: final_data,
        });
    }
    catch (error) {
        callback(null, {
          msg: error.message,
          success: false,
        });
    }
};

exports.handle_request = handle_request;
