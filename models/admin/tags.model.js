var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from tags order by Id asc');
    },

    single: id => {
        return db.load(`select * from tags where Id = ${id}`);
    },

    add: entity => {
        return db.add('tags', entity);
    },

    update: entity => {
        return db.update('tags', 'Id', entity);
    },

    delete: id => {
        return db.delete('tags', 'Id', id);
    },
}