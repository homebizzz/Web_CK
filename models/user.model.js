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

  singleByEmail: email => {
    return db.load(`select * from users where Email = '${email}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },

  updateInfo: entity => {
    let sql = `update users set Name = '${entity.Name}', Email = '${entity.Email}',
     Pseudonym = '${entity.Pseudonym}', Permission =  '${entity.Permission}' where Id = ${entity.Id}`;
    return db.load(sql);
  },

  updatePassword: entity => {
    let sql = `update users set Password = '${entity.Password}' where Id = ${entity.Id}`;
    return db.load(sql);
  },

  delete: id => {
    return db.delete('users', 'Id', id);
  }
};