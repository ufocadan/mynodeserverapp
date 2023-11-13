// config/db.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://unalfocadan:u1n9AL86@todoscluster.wkbk0m8.mongodb.net/todos?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;