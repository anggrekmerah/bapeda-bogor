var express = require('express');
var router = express.Router();

var menuClass = require('../config/menu_model')

/* GET home page. */
router.get('/', function(req, res, next) {

  const menus = new menuClass()

  menus.refactorMenu( function (err, res) {
    // console.log(res)
  } )

  res.render('index', { title: 'Express' });
});

module.exports = router;
