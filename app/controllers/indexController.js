const users = require('../const/users');

function index(req, res, next) {
    res.locals.user = req.session.user;
    console.log(res.locals.user, req.session.user)
    res.render('index', { title: 'Chat App' });
}
function chat(req, res, next) {
    res.locals.user = req.session.user = req.body.username;
    res.redirect("/")
}

module.exports = {
    index,
    chat
}