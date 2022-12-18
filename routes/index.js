var express = require('express');
var router = express.Router();

var menuClass = require('../config/navbar_model')

/* GET home page. */
router.get('/',  async (req, res, next) => {

  const classMenus = new menuClass()

  var refactorMenu = await classMenus.refactorMenu()

  res.render('index', { title: 'Express', 'menu': classMenus.bikinMenu(refactorMenu) });

});

module.exports = router;
