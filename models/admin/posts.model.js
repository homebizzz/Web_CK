var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date 
                        from newspapers as news, categorysons as catson
                        where news.CategorySon_Id = catson.Id and news.status = 1`);
    },

    pageByPost: (limit, offset) => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, user.Name as user_Name
                        from newspapers as news, categorysons as catson, users as user 
                        where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 1
                        order by news.Id asc limit ${limit} offset ${offset}`);
    },

    pageByPostIsDraft: (limit, offset) => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, user.Name as user_Name
                        from newspapers as news, categorysons as catson, users as user 
                        where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 0
                        order by news.Id asc limit ${limit} offset ${offset}`);
    },

    countByPost: () => {
        return db.load(`select count(*) as total from newspapers where status = 1`);
    },

    single: id => {
        return db.load(`select * from newspapers where Id = ${id} and status = 1`);
    },

    add: entity => {
        return db.add('newspapers', entity);
    },

    update: entity => {
        return db.update('newspapers', 'Id', entity);
    },

    delete: id => {
        return db.delete('newspapers', 'Id', id);
    }
}