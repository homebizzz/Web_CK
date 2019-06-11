var db = require('../../utils/db');

module.exports = {
    loadByConfirmID: () => {
        return db.load('select * from newspapers where status = 1');
    },
}