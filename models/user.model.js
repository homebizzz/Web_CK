var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where Id = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from users where Name = '${userName}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },

  update: entity => {
    var id = entity.Id;
    delete entity.Id;
    return db.update('users', 'Id', entity, id);
  },

  delete: id => {
    return db.delete('users', 'Id', id);
  }
};