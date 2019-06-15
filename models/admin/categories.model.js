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
    },

    update: entity => {
        return db.update('categories', 'Id', entity);
    },

    delete: id => {
        return db.delete('categories', 'Id', id);
    },
}