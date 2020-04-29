const users = require('../const/users');

function getUsers(req, res, next) {
    res.render('users');
}

module.exports = {
    getUsers
}