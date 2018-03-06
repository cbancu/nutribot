class DbErrorHandler { 
    static handle(err) { 
        if(err) throw err; 
    }
}

module.exports = DbErrorHandler;