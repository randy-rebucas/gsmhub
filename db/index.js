const mongoose = require("mongoose");

    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        poolSize: 10, // Maintain up to 10 socket connections
        autoIndex: false, // Don't build indexes
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: null // Use IPv4, skip trying IPv6
    };
    // change test db to ijomails for production
    mongoose.connect(
        'mongodb+srv://randy:' +
        process.env.MONGO_ATLAS_PW +
        '@main.yadbc.mongodb.net/gsmhub?retryWrites=true&w=majority',
        options
    );

    const db = mongoose.connection;
    db.on("error", () => {
        console.log("> error occurred from the database");
    });
    db.once("open", () => {
        console.log("> successfully opened the database");
    });

module.exports = mongoose;