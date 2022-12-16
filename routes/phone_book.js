var express = require('express');
var router = express.Router();

var menuClass = require('../config/menu_model')

/* GET home page. */
router.get('/',  async (req, res, next) => {

  const classMenus = new menuClass()

  var refactorMenu = await classMenus.refactorMenu()

  res.render('phone_book', { title: 'phone_book', 'menu': classMenus.bikinMenu(refactorMenu) });

});

module.exports = router;
