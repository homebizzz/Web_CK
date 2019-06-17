var db = require('../utils/db');

module.exports = {
    // all: () => {
    //     return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
    //                     from newspapers, categories, categorysons, users
    //                     where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and newspapers.Id_Author = users.Id`)
    // },

    hot: () => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
                        from newspapers, categories, categorysons, users
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and newspapers.Id_Author = users.Id order by newspapers.Count_like DESC`);
    },

    allByCategory: name => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
                        from newspapers, categories, categorysons, users
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and newspapers.Id_Author = users.Id and categories.Name = '${name}' order by newspapers.Count_Like DESC`);
    },

    allByNewPost: () =>{
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
                        from newspapers, categories, categorysons, users
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and newspapers.Id_Author = users.Id order by newspapers.Created_date DESC LIMIT 10`)
    },

    // allByViewMost: () => {
    //     return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name
    //                     from newspapers, categories, categorysons 
    //                     where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id order by newspapers.Created_date DESC LIMIT 10`)
    // },

    allByNewEach: name => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
                        from newspapers, categories, categorysons, users
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and categories.Name = '${name}' and newspapers.Id_Author = users.Id order by newspapers.Created_date DESC LIMIT 1`);
    },

    allByPremium: () => {
        return db.load(`select newspapers.Id, newspapers.Title, newspapers.Thumbnail, newspapers.Created_date, newspapers.Summary, newspapers.Content, newspapers.Count_Like, categories.Name, users.Pseudonym as Author
                        from newspapers, categories, categorysons, users
                        where newspapers.CategorySon_id = categorysons.Id and categories.Id = categorysons.Category_id and newspapers.Is_premium = 1 and newspapers.Id_Author = users.Id`)
    }
}