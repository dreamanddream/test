
var express = require('express');
var router = express.Router();
var mongoose=require("./conn");

var Schema = mongoose.Schema;

var usersSchema  = new Schema({
    username: String,
    password:String
});

var usersModel = mongoose.model("users",usersSchema);
var usersQueryModel= mongoose.model("users");//用于查询的模型



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login.ejs',{  });
});

router.get('/bb', function(req, res, next) {
    res.send("ok");
});

router.post('/', function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    usersQueryModel.find({"username":username,"password":password},function(err,docs){
        if(docs.length>0)
        {
            //记录身份信息。把身份信息记录在session里面。需要安装express-session
            req.session.user=docs[0];
            res.send("ok");
        }
        else
        {
            res.send("no");
        }
        res.end();
    });


});



module.exports = router;