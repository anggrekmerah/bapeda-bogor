var express = require('express');
var router = express.Router();
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const helper = require('../config/helper');
const dashboardModel = require('../models/dashboard/dashboardModel');
var groupMenuModels = new groupMenuModel()

const dashboardModels = new dashboardModel()

const controllerName = 'dashboard_agent'
const menuId = 12
/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
  }

  var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)
    if(!checkAccessPage){  
        res.render('error_cannot_access')
        return false
    }

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Dashboard agent'
    req.renderObjects.extension = req.session.extension
    req.renderObjects.sess = req.session
    req.renderObjects.agent_call = await dashboardModels.getAgentCall()
    
  res.render('dashboard_agent/dashboard_agent', req.renderObjects);

});

module.exports = router;
