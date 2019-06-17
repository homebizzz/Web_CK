var db = require('../utils/db');

module.exports = {
    allByCategory: id => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, categorysons.NameSon
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categorysons.Id = ${id} order by newspapers.Count_Like DESC`);
    },

    allByNewPost: () =>{
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByViewMost: () => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByNewEach: name => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categories.Name = '${name}' order by newspapers.Created_date DESC LIMIT 1`);
    },

    loadDetail: id => {
        return db.load(`select * from newspapers where newspapers.Id = ${id}`);
    }
}