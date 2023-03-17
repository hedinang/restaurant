var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var uuid = require('uuid');
var models = 'users';
mongoose.Promise = Promise;
var project = new Schema({
    id: {
        type: String,
        index: true,
        required: true,
        default: uuid.v4()

    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    img: {
        type: String
    },
    description: {
        type: Array
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false,
        default: new Date()
    },
});
module.exports = mongoose.model(models, project);