const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
