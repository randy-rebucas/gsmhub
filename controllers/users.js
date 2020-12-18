const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sharp = require('sharp');
// const moment = require('moment');
const slugify = require('slugify');
const generator = require('generate-password');
const fs = require('fs');

const ObjectId = require('mongoose').Types.ObjectId;

const Auth = require('../models/auth');
const User = require('../models/user');

exports.getAll = async(req, res, next) => {
    try {
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const query = User.find();
        if (pageSize && currentPage) {
            query.skip(pageSize * (currentPage - 1)).limit(pageSize);
        }
        let users = await query.exec();
        let userCount = await User.countDocuments();

        res.status(200).json({
            message: 'Users fetched successfully!',
            users: users,
            counts: userCount
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOne = async(req, res, next) => {
    try {
        const user = await User.findOne({ _id: new ObjectId(req.params.id) }).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        const userId = req.params.id;

        /**
         * delete auth credentials
         */
        let auth = await Auth.deleteOne({ userId: userId });
        if (!auth) {
            throw new Error('Error in deleting auth!');
        }
        /**
         * delete person collection
         */
        let user = await User.deleteOne({ userId: userId });
        if (!user) {
            throw new Error('Error in deleting person!');
        }
        res.status(200).json({
            message: user.deletedCount + ' item deleted successfull!'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.create = async(req, res, next) => {
    try {
        /**
         * check for existing email
         */
        let authCheck = await Auth.findOne({ email: req.body.email });
        if (authCheck) {
            throw new Error('Something went wrong. Email is in used!');
        }
        /**
         * Set common entities on people collection
         */
        const newUser = new User({
            name: req.body.name,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            contact: req.body.contact
        });

        if (req.body.address) {
            const addressData = req.body.address;
            for (let index = 0; index < addressData.length; index++) {
                newUser.address.push(addressData[index]);
            }
        }
        
        let user = await newUser.save();
        if (!user) {
            throw new Error('Something went wrong.Cannot save user data!');
        }
        /**
         * Set login credentials in auth collection
         */
        var _password = req.body.password;
        if (!_password) {
            _password = generator.generate({
                length: 10,
                numbers: true
            });
        }
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(_password, salt);
        const authCredentials = new Auth({
            email: req.body.email,
            password: hash,
            userId: user._id
        });
        let auth = await authCredentials.save();
        if (!auth) {
            throw new Error('Something went wrong.Cannot save auth collection!');
        }

        res.status(200).json({
            message: 'User added successfully',
            user: {
                ...user,
                id: user._id,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: e.message
        });
    }
};

exports.update = async(req, res, next) => {
    try {
        /**
         * Set common entities on people collection
         */
        let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!user) {
            throw new Error('Something went wrong.Cannot update user data!');
        }
        res.status(200).json({ message: req.body.name.firstname + ' successfully updated!' });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};