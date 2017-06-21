
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main.ejs',{ "username":req.session.user.username });
    // res.render('main.ejs',{  });
});
//退出登录
router.get('/loginout', function(req, res, next) {
    req.session.user=null;
    res.redirect("/login");
});


module.exports = router;