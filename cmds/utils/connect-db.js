const mongoose = require('mongoose');
require('dotenv').config()

module.exports = function (cb) {

    // connect database
    mongoose.connection.once('open', async function () {
        // console.info('MongoDB event open');
        // console.debug('MongoDB connected [%s]', mongooseUrl);

        mongoose.connection.on('connected', function () {
            //   console.info('MongoDB event connected');
        });

        mongoose.connection.on('disconnected', function () {
            //   console.warn('MongoDB event disconnected');
        });

        mongoose.connection.on('reconnected', function () {
            //   console.info('MongoDB event reconnected');
        });

        mongoose.connection.on('error', function (err) {
            console.error('MongoDB event error: ' + err);
        });

        return cb();
    });

    /**
     * Create Mongoose Connection
     */
    //var mongooseUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`;
    // var mongooseUrl = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`;
    const mongooseUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}.4aeory2.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.error('MongoDB connection error: ' + err);
            // return reject(err);
            process.exit(1);
        }
    });
}