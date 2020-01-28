module.exports = {
    getItems: (req, res) => {
        let query = "SELECT * FROM `items` ORDER BY id ASC"; // query database to get all the items
        // execute query
        mc.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.send({
                items: result
            });
        });
    },
    getItem: (req, res) => {
        let query = `SELECT * FROM items where id = ${req.query.id}`; // query database to get all the items
        mc.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.send({
                item: result
            });
        });
    },
};