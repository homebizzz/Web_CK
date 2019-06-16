var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from newspapers');
    },

    hot: () => {
        return db.load('select * from newspapers order by Count_Like desc');
    },

    allByCategory: name => {
        return db.load(`select * 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categories.Name = '${name}' order by newspapers.Count_Like DESC`);
    },

    allByNewPost: () =>{
        return db.load(`select * 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByViewMost: () => {
        return db.load(`select * 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByNewEach: name => {
        return db.load(`select * 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categories.Name = '${name}' order by newspapers.Created_date DESC LIMIT 1`);
    },
}