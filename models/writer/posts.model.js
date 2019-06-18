var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date 
                        from newspapers as news, categorysons as catson
                        where news.CategorySon_Id = catson.Id and news.status = 1 `);
    },

    pageByPost: (limit, offset, idUser) => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                        from newspapers as news, categorysons as catson, users as user 
                        where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 1 and Id_Author = ${idUser}
                        order by news.Id desc limit ${limit} offset ${offset}`);
    },

    pageByStatus: (status, limit, offset, idUser) => {
        if(status === 'refuse'){ 
            // bi tu choi
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 4 and Id_Author = ${idUser}
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else if(status === 'draft'){ 
            // dang cho duyet
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 3 and Id_Author = ${idUser}
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else if(status === 'published'){
            // da xuat ban
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 1 and Id_Author = ${idUser}
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else{
            // da duyet va choi xuat ban
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 2 and Id_Author = ${idUser}
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }
    },

    countByPost: (status, idUser) => {
        if(status === 'refuse'){ 
            // bi tu choi
            return db.load(`select count(*) as total 
                            from newspapers
                            where status = 4 and Id_Author = ${idUser}`);
        }else if(status === 'draft'){ 
            // dang cho duyet
            return db.load(`select count(*) as total
                            from newspapers
                            where status = 3 and Id_Author = ${idUser}`);
        }else if(status === 'published'){
            // da xuat ban
            return db.load(`select count(*) as total
                            from newspapers
                            where status = 1 and Id_Author = ${idUser}`);
        }else{
            // da duyet va choi xuat ban
            return db.load(`select count(*) as total
                            from newspapers
                            where status = 2 and Id_Author = ${idUser}`);
        }
    },

    single: id => {
        return db.load(`select * from newspapers where Id = ${id} and status = 1`);
    },

    singleForEdit: (id, idUser) => {
        return db.load(`select * from newspapers where Id = ${id} and Id_Author = ${idUser}`);
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