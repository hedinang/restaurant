'use strict'
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_ATLAS, {
    dbName: process.env.MONGO_DBNAME,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    retryWrites: false

}).catch(function (e) {
    logger && logger.log('error', '-------> Fatal Error connection mongoose %s', e);
});
mongoose.connection.on('error', err => {
    logger && logger.log('error', '-------> Error connection mongoose %s', err);
});
const db = {};
db.Project = require('./Project');
module.exports = db
