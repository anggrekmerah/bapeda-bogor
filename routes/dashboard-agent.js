var express = require('express');
var router = express.Router();

var controllerName = 'dashboard_agent'

/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)                
        res.render('error')

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Dashboard agent'
    req.renderObjects.extension = req.session.extension

  res.render('dashboard_agent/dashboard_agent', req.renderObjects);

});

module.exports = router;
