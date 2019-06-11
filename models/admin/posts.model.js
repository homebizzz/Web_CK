var db = require('../../utils/db');

module.exports = {
    all: () => {
        return db.load('select news.Id as news_Id, news.Title as news_Title, cat.Name as cat_Name, news.Created_date as news_cr_date from newspapers as news, categories as cat where news.CategorySon_Id = cat.Id');
    }
}