const mongoose = require('mongoose');

 class DbConnection { 

    static toDb(database) {
        
        console.log('CONNECTING to ' + database);
        
        //Set up default mongoose connection
        const mongoDB = `mongodb://127.0.0.1:27017/${database}`;
        mongoose.connect(mongoDB);
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        //Get the default connection
        
        const db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        db.once('open', () => {
            console.log('DB CONNECTED')
        });
    }
}

module.exports = DbConnection;
