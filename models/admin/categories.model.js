var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from categories order by Id asc');
    },

    allofCatSon: () => { 
        return db.load('select * from categorysons order by Id asc');
    },

    pageByCat: (limit, offset) => {
        return db.load(`select * from categories order by Id asc limit ${limit} offset ${offset} `);
    },

    countByCat: catId => {
        return db.load(`select count(*) as total from categories`);
    },

    single: id => {
        return db.load(`select * from categories where Id = ${id}`);
    },

    singleOfCatSon: id => {
        return db.load(`select * from categorysons where Id = ${id}`);
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