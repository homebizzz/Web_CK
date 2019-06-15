var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from categories order by Id asc');
    },

    single: id => {
        return db.load(`select * from categories where Id = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    }
}