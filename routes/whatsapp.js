var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const whatsappModel = require('../models/whatsapp/whatsappModel')
const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

const fs   = require('fs');
const jwt  = require('jsonwebtoken');

var groupMenuModels = new groupMenuModel()
var controllerName = 'whatsapp'
var whatsappModels = new whatsappModel()


/* GET redirect page. */
router.get('/redirect',  async (req, res, next) => {

    // PAYLOAD
    var payload = {
        id_user: req.session.id_user,
        email: req.session.email
    };
    // PRIVATE and PUBLIC key
    var privateKEY  = fs.readFileSync("./rsa_2048/private_key.pem", 'utf8');
    var i  = 'Benpenda Kota Bogor';          // Issuer 
    var s  = req.session.email;        // Subject 
    var a  = 'http://localhost:8080'; // Audience

    // SIGNING OPTIONS
    var signOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  100,
        algorithm:  "RS256"
    };

    var token = jwt.sign(payload, privateKEY, signOptions);
    console.log('token = ' + token)
    
    res.cookie('token', token).redirect('http://localhost:8080/whatsapp/getredirect');

});

router.get('/getredirect',  async (req, res, next) => {

    console.log('Authorization')

    console.log(req.cookies.token)
    res.send({'ok':'ok'})

});

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
