var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var controllerName = 'r_outgoing'
var groupMenuModels = new groupMenuModel()
const menuId = 17

/* GET home page. */
router.get('/outgoing',  async (req, res, next) => {

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
    req.renderObjects.title = 'Report Outgoing'
    req.renderObjects.sess = req.session
    res.render('reports/outgoing', req.renderObjects );

});

module.exports = router;