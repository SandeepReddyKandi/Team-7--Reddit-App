const mongoose = require('mongoose');
const express = require("express");
const app = express();
const { connectToDatabase } = require("./db");

const { USER_LOGIN, USER_SIGNUP } = require('./kafka/topics')

//user
const userLogin = require('./services/users/userLogin');
const userSignup = require('./services/users/userSignup');

const port = 3001;
const connection = require("./kafka/connection");

// /* Db Connection */
// const db = connectToDatabase().then(() => {
//     app.listen(port, console.log("Server is listening on port :", port));
//   });

const uri =
    'mongodb+srv://admin:admin@cluster0.0uwhi.mongodb.net/RedditDB';

mongoose.connect(uri, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
        console.log("message received for " + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log("after handle" + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res,
                    }),
                    partition: 0,
                },
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    });
};

handleTopicRequest(USER_LOGIN, userLogin);
handleTopicRequest(USER_SIGNUP, userSignup);

