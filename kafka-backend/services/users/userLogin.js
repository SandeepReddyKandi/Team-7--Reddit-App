const UserModel = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const secret = "CMPE_273_Splitwise_secret";
const handle_request = async (req, callback) => {

    //check whether account exists/not
    await UserModel.findOne({ email: req.body.email }, (err, doc) => {
        if (!doc) {
            //return res.status(404).json({ msg: 'Account Not Found' });
            callback(null, {
                msg: 'Account Not Found',
                success: true
            })
        }

        //check if password entered matches with the one in DB
        if (bcrypt.compareSync(req.body.password, doc.password)) {
            const token = jwt.sign(
                { userId: doc.id, email: doc.email },
                secret,
                {
                    expiresIn: '4h',
                }
            );

            // res.cookie('authtkn', token, {
            //     maxAge: 1000 * 60 * 60 * 4,
            //     httpOnly: true,
            // });

            // res.status(200).json({
            //     msg: 'Logged in successfully',
            //     userId: doc.id,
            //     role: 'User'
            // });
            callback(null, {
                token,
                msg: 'Logged in successfully',
                userId: doc.id,
                success: true
            })
        } else {
            //return res.status(401).json({ msg: 'Invalid Credentials Entered' });
            callback(null, {
                msg: 'Invalid Credentials Entered',
                success: false
            })
        }
    });

};

exports.handle_request = handle_request;
