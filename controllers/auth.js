const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
const User = require('../models/user');

exports.checkEmail = async(req, res, next) => {
    try {
        /**
         * check for existing email
         */
        let authCheck = await Auth.findOne({ email: req.body.email });
        if (!authCheck) {
            throw new Error('Something went wrong. Email is not listed!');
        }
        res.status(200).json({
            isListed: (authCheck) ? true : false,
            user: authCheck
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.register = async(req, res, next) => {
    try {
        console.log(req);
        // /**
        //  * check for existing email
        //  */
        // let authCheck = await Auth.findOne({ email: req.body.email });
        // if (authCheck) {
        //     throw new Error('Something went wrong. Email is in used!');
        // }
        // /**
        //  * Set extended entities from poeple to users collection
        //  */
        // const newUser = new User({
        //     name: {
        //         firstname: req.body.firstname,
        //         lastname: req.body.lastname
        //     }
        // });
        // let user = await newUser.save();
        // if (!user) {
        //     throw new Error('Something went wrong.Cannot save user!');
        // }
        // /**
        //  * Set login credentials in auth collection
        //  */
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(req.body.password, salt);
        // const authCredentials = new Auth({
        //     email: req.body.email,
        //     password: hash,
        //     userId: user._id
        // });
        // let auth = await authCredentials.save();
        // if (!auth) {
        //     throw new Error('Something went wrong.Cannot save login credentials!');
        // }

        // // const context = {
        // //     email: req.body.email,
        // //     password: req.body.password,
        // //     site_name: 'ijomails',
        // //     site_origin: req.protocol + '://' + req.get('host')
        // // };
        // // await mail.sendMail(
        // //     'welcome',
        // //     context,
        // //     'ijomails <admin@ijomails.com>',
        // //     req.body.email,
        // //     'New Account Registration'
        // // );

        // res.status(200).json({
        //     message: 'Congratulations! Your account registration was successfull.',
        //     status: true,
        //     user: user
        // });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

exports.update = async(req, res, next) => {
    try {

        let auth = await Auth.findOne({ userId: req.params.id });
        let decrypted = await bcrypt.compare(req.body.oldPass, auth.password);
        if (!decrypted) {
            throw new Error('Something went wrong. entered password does not match old password!');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.newPass, salt);

        const update = {
            _id: auth._id,
            password: hash
        };

        let data = await Auth.findOneAndUpdate({ _id: auth._id }, update, { new: true });
        if (!data) {
            throw new Error('Something went wrong. Failed to update password!');
        }

        res.status(200).json({
            message: 'Password changed successfully!',
            state: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.login = async(req, res, next) => {
    try {
        /**
         * Find email on auth collection
         */
        let auth = await Auth.findOne({ email: req.body.email });
        if (!auth) {
            throw new Error('Something went wrong. Your email is not listed!');
        }
        /**
         * compare password
         */
        let decrypted = await bcrypt.compare(req.body.password, auth.password);
        if (!decrypted) {
            throw new Error('Something went wrong. Incorrect password!');
        }

        let user = await User.findById(auth.userId).exec();

        if (!user) {
            throw new Error('Something went wrong. Cannot find email: ' + req.body.email + ' list!');
        }
        let token = await jwt.sign({
                email: auth.email,
                userId: user._id
            },
            process.env.JWT_KEY, {}
        );

        res.status(200).json({
            token: token,
            userEmail: auth.email,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.get = async(req, res, next) => {
    try {

        let data = await Auth.findOne({ userId: req.params.id }).exec();

        res.status(200).json({
            auth: data,
            status: (!data) ? false : true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
