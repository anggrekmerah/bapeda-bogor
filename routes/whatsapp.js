var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const whatsappModel = require('../models/whatsapp/whatsappModel')
const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var groupMenuModels = new groupMenuModel()
var controllerName = 'whatsapp'
var whatsappModels = new whatsappModel()

const menuId = 22


/* GET home page. */
router.get('/dashboard',  async (req, res, next) => {

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
    req.renderObjects.title = 'Whatsapp Dashboard'
    req.renderObjects.sess = req.session

  res.render('whatsapp/dashboard', req.renderObjects );

});


router.get('/send-message',  async (req, res, next) => {
  
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
    req.renderObjects.title = 'Send Message'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/send-messasge', req.renderObjects );
  
});


module.exports = router;
