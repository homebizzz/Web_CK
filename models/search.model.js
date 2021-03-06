var db = require('../utils/db');

module.exports = {
    allByKey: (key, limit, offset) => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name
                        from newspapers, categories, categorysons 
                        where MATCH (Title, Summary, Content) AGAINST ('${key}') and newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Count_Like DESC limit ${limit} offset ${offset}`);
    },

    allByNewPost: () =>{
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByViewMost: () => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    },

    allByNewEach: name => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name 
                        from newspapers, categories, categorysons 
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categories.Name = '${name}' order by newspapers.Created_date DESC LIMIT 1`);
    },

    loadDetail: id => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, t1.Name as tagName1, t2.Name as tagName2
                        from newspapers, categories, categorysons, tags as t1, tags as t2
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and (newspapers.tag1 = t1.Id and newspapers.tag2 = t2.Id) and newspapers.Id = ${id}`);
    },

    countRowWithSearch: key => {
        return db.load(`select count(newspapers.Id) as total
                        from newspapers, categories, categorysons 
                        where MATCH (Title, Summary, Content) AGAINST ('${key}') and newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Count_Like DESC`);
    },
}