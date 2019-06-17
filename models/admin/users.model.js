var db = require('../../utils/db');
var moment = require('moment');

module.exports = {
    all: () => {
        return db.load('select * from users order by Id asc');
    },

    pageByUser: (limit, offset) => {
        return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, Cat.Name as Category, Per.Name as Permission
                        from users as User, permissions as Per, categories as Cat
                        where User.IdCategory = Cat.Id and User.Permission = Per.Id and User.IsDelete = 0
                        order by Id asc limit ${limit} offset ${offset} `);
    },

    pageByPermission: (perName, limit, offset) => {
        if(perName === 'editor'){
            return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, User.Subscribe_date as Subscribe_date, Cat.Name as Category, Per.Name as Permission
                            from users as User, permissions as Per, categories as Cat
                            where User.Permission = Per.Id and User.IdCategory = Cat.Id and User.IsDelete = 0 and Per.Name = '${perName}'
                            order by Id asc limit ${limit} offset ${offset} `);
        }
        else{
            return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, User.Subscribe_date as Subscribe_date, Per.Name as Permission
                            from users as User, permissions as Per
                            where User.Permission = Per.Id and  User.IsDelete = 0 and Per.Name = '${perName}'
                            order by Id asc limit ${limit} offset ${offset} `);
        }       
    },

    countByUser: catId => {
        return db.load(`select count(*) as total from users where IsDelete = 0`);
    },

    allOfPermission: () => {
        return db.load('select * from permissions order by Id asc');
    },

    single: id => {
        return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, User.Subscribe_date as Subscribe_date, Cat.Name as Category, Per.Name as Permission
                        from users as User, permissions as Per, categories as Cat
                        where User.IdCategory = Cat.Id and User.Permission = Per.Id and User.IsDelete = 0 and User.Id = ${id}`);
    },

    singleByPermission: (perName, id) => {
        if(perName === 'Editor'){
            return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, User.Subscribe_date as Subscribe_date, Cat.Name as Category, Per.Name as Permission
                            from users as User, permissions as Per, categories as Cat
                            where User.Permission = Per.Id and User.IdCategory = Cat.Id and User.IsDelete = 0 and User.Id = ${id}`);
        }
        else{
            return db.load(`select User.Id as Id, User.Name as Name, User.Email as Email, User.Pseudonym as Pseudonym, User.Subscribe_date as Subscribe_date, Per.Name as Permission
                            from users as User, permissions as Per
                            where User.Permission = Per.Id and  User.IsDelete = 0 and User.Id = ${id}`);
        }      
    },

    add: entity => {
        return db.add('users', entity);
    },

    update: entity => {
        return db.update('users', 'Id', entity);
    },

    delete: id => {
        // set thuoc tinh IsDelete thanh 1 de danh dau xoa
        return db.load(`update users set IsDelete = 1 where Id = ${id}`);
    },

    singleForRenew: id => {
        return db.load(`select User.Subscribe_date as Subscribe_date
                        from users as User, permissions as Per
                        where User.Permission = Per.Id and User.IsDelete = 0 and User.Id = ${id}`);
    },

    renew: (id, newDate) => {
        return db.load(`update users set Subscribe_date = '${newDate}' where Id = ${id}`);
    }
}