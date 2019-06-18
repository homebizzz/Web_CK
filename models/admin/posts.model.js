var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date 
                        from newspapers as news, categorysons as catson
                        where news.CategorySon_Id = catson.Id and news.status = 1`);
    },

    pageByPost: (limit, offset) => {
        return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                        from newspapers as news, categorysons as catson, users as user 
                        where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 1
                        order by news.Id desc limit ${limit} offset ${offset}`);
    },

    pageByStatus: (status, limit, offset) => {
        if(status === 'refuse'){ 
            // bi tu choi
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 4
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else if(status === 'draft'){ 
            // dang cho duyet
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 3
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else if(status === 'published'){
            // da xuat ban
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 1
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }else{
            // da duyet va choi xuat ban
            return db.load(`select news.Id as news_Id, news.Title as news_Title, catson.NameSon as cat_Name, news.Created_date as news_cr_date, news.Publish_date as news_pb_date, user.Name as user_Name
                            from newspapers as news, categorysons as catson, users as user 
                            where news.CategorySon_Id = catson.Id and news.Id_Author = user.Id and news.status = 2
                            order by news.Id desc limit ${limit} offset ${offset}`);
        }
    },

    countByPost: status => {
        if(status === 'refuse'){ 
            // bi tu choi
            return db.load(`select count(*) as total from newspapers where status = 4`);
        }else if(status === 'draft'){ 
            // dang cho duyet
            return db.load(`select count(*) as total from newspapers where status = 3`);
        }else if(status === 'published'){
            // da xuat ban
            return db.load(`select count(*) as total from newspapers where status = 1`);
        }else{
            // da duyet va choi xuat ban
            return db.load(`select count(*) as total from newspapers where status = 2`);
        }
    },

    single: id => {
        return db.load(`select * from newspapers where Id = ${id} and status = 1`);
    },

    singleForEdit: id => {
        return db.load(`select * from newspapers where Id = ${id}`);
    },

    add: entity => {
        return db.add('newspapers', entity);
    },

    update: entity => {
        return db.update('newspapers', 'Id', entity);
    },

    publish: (id, currentDay) => {
        return db.load(`update newspapers set status = 1, Publish_date = '${currentDay}' where Id = ${id}`)
    },

    delete: id => {
        return db.delete('newspapers', 'Id', id);
    }
}