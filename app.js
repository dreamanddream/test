var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');//导入登录模块
var main = require('./routes/main');//导入后台主页面模块
var home = require('./routes/home');//导入home模块
var custmer = require('./routes/custmer');//导入客户管理模块
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name:"mysystem",
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    rolling:true,
    secret: 'hei',
    cookie:{
        maxAge:1000*60*3
     }//,
    // store: new MongoStore({
    //     url: 'mongodb://localhost:27017/mycrm'
    // })
}));

//随时查询内存中有哪些session在，主要是session的监控
app.use(function(req,res,next){
    if (!req.session.user) {
        if(req.url.indexOf("/login")>=0){
          next();
        }
        else
        {
          res.redirect('/login');
        }
    }
    else
    {
        next();
    }
});



app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/main', main);
app.use('/home', home);
app.use('/custmer', custmer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
