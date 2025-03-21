const mongoose = require("mongoose");

const connectDB = async () => {
    try { 
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log
        (`MongoDB connected:
         ${connect.connection.host},
         ${connect.connection.name},
         ${connect.connection.port}`
        );
    }catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;