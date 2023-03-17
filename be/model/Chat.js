var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var uuid = require('uuid');
var models = 'chat';
mongoose.Promise = Promise;
var chat = new Schema({
    id: {
        type: String,
        index: true,
        required: true,
        default: uuid.v4()

    },
    name: {
        type: String
    },
    userList: {
        type: Array,
        required: true
    },
    content: {
        type: Array
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false,
        default: new Date()
    },
    // content contains {
    //userId
    //message
    //}
});
module.exports = mongoose.model(models, chat);