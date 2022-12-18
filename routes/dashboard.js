var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',  async (req, res, next) => {

  res.render('dashboard/dashboard', { controller: 'dashboard', title: 'Dashboard', 'menu': req.menus });

});

module.exports = router;
