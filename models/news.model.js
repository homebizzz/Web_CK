var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from newspapers');
    },

    hot: () => {
        return db.load('select * from newspapers order by Count_Like desc');
    }
}