var express = require('express');
const dashboardModel = require('../models/dashboard/dashboardModel');
var router = express.Router();

var dashboardModels = new dashboardModel()

/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)                
    res.render('error')

  var counter = await dashboardModels.getAllData()

  delete counter.meta

  req.renderObjects.controller = 'dashboard'
  req.renderObjects.title = 'Dashboard'
  req.renderObjects.counters = counter

  res.render('dashboard/dashboard', req.renderObjects);

});

module.exports = router;
