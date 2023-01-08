var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const extensionModel = require('../models/extension/extensionModel');
const helper = require('../config/helper')
const groupMenuModel = require('../models/group_menu/groupMenuModel');
var controllerName = 'extension'
var extensionModels = new extensionModel()
var groupMenuModels = new groupMenuModel()
const menuId = 10

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
    req.renderObjects.title = 'Extension'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('extension/extension', req.renderObjects );

});

router.get('/delete/:extensionId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var inActiveextension = await extensionModels.inActive(req)

    res.redirect('/extension');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
         { 
            'db': 'id_extension', 
            'dt' : 0,
            'formatter' : function( d, row ) {
 
                return Number(row.nomor)
 
            }
        }
        ,{ 'db': 'extension', 'dt' : 1 }
        ,{ 
            'db': 'created_by', 
            'dt' : 2,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'updated_by', 
            'dt' : 3,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.updated_by + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 4, 
            'formatter' : function( d, row ) {
                
                var btnEdit =  (checkAccessPage && checkAccessPage.can_update == 'Y') ? helper.btnEdit('/extension/add?id='+row.id_extension) : ''
                var btnDelete =  (checkAccessPage && checkAccessPage.can_delete == 'Y') ? helper.btnDelete('/extension/delete/'+row.id_extension) : ''

                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += btnEdit  
                    html += btnDelete
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await extensionModels.datatable(req, cols)
    
    res.status(200).json(data)

});

router.get('/add',  async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)
    if(!checkAccessPage){  
        res.render('error_cannot_access')
        return false
    }

    var data_update = { extension : '' }
    
    if(req.session.dataUpdate){

        data_update.extension = req.session.dataUpdate.extension

    }

    let flashMessage = await helper.flashMessage(req, extensionModels,  data_update)
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Extension'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session

    res.render('extension/add-extension', req.renderObjects );
  
});

router.post('/save',  
    body('extension').not().isEmpty().withMessage('Extension required').isLength({min:3, max:5}).withMessage('Extension length min:3 max:5')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        req.session.dataUpdate = req.body
        res.redirect('/extension/add');
        return false
    }

    var savePhone = await extensionModels.insertDataIgnore(req)

    req.session.resultMessage = (savePhone) ? helper.MessageSuccess('Success save extension') : helper.MessageFailed('Failed save extension')

    res.redirect('/extension/add');

});

router.post('/update',  
    body('extension').not().isEmpty().withMessage('Extension required').isLength({min:3, max:5}).withMessage('Extension length min:3 max:5')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        req.session.dataUpdate = req.body
        res.redirect('/extension/add');
        return false
    }
    
    var updatePhone = await extensionModels.update_data(req)

    req.session.resultMessage = (updatePhone) ? helper.MessageSuccess('Success update extension') : helper.MessageFailed('Failed update extension')

    res.redirect('/extension/add');

});

module.exports = router;

