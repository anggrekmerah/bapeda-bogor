var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const whatsappModel = require('../models/whatsapp/whatsappModel')
const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var groupMenuModels = new groupMenuModel()
var controllerName = 'whatsapp'
var whatsappModels = new whatsappModel()




/* GET home page. */
router.get('/dashboard',  async (req, res, next) => {

    const menuId = 25

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

router.get('/template-add',  async (req, res, next) => {
  
    const menuId = 26

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
    req.renderObjects.title = 'Whatsapp Template'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/create-template', req.renderObjects );
  
});

router.get('/template',  async (req, res, next) => {
  
    const menuId = 26

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
    req.renderObjects.title = 'Whatsapp Template'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/template', req.renderObjects );
  
});

router.get('/sender',  async (req, res, next) => {
  
    const menuId = 28

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
    req.renderObjects.title = 'Whatsapp Sender ID'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/sender', req.renderObjects );
  
});

router.get('/add-sender',  async (req, res, next) => {
  
    const menuId = 28

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
    req.renderObjects.title = 'Whatsapp Add Sender ID'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/add-sender', req.renderObjects );
  
});

router.get('/report',  async (req, res, next) => {
  
    const menuId = 27

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
    req.renderObjects.title = 'Whatsapp Report'
    req.renderObjects.sess = req.session
   

    res.render('whatsapp/report', req.renderObjects );
  
});


module.exports = router;
