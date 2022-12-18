var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  async (req, res, next) => {

  res.render('dashboard_agent/dashboard_agent', { title: 'Dashboard agent', 'menu': req.menus });

});

module.exports = router;
