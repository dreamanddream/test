var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource111');
});

router.get('/aa', function(req, res, next) {
  res.send('www.yyjcw.com');
});

router.get('/bb', function(req, res, next) {
  res.send('QQ:1416759661');
});

module.exports = router;
