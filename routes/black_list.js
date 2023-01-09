var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const helper = require('../config/helper');
const phoneBookModel = require('../models/phone_book/phoneBookModel');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var phoneBookModels = new phoneBookModel()
var groupMenuModels = new groupMenuModel()

const controllerName = 'black_list'
const menuId = 9

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
    req.renderObjects.title = 'Number Black List'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('black_list/black_list', req.renderObjects );

});


router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
        { 
           'db': 'id_phone_book', 
           'dt' : 0,
           'formatter' : function( d, row ) {

               return Number(row.nomor)

           }
       }
       ,{ 'db': 'phone_number', 'dt' : 1 }
       ,{ 'db': 'notes', 'dt' : 2 }
       ,{ 
           'db': 'user_created', 
           'dt' : 3,
           'formatter' : function( d, row ) {
               var created_datetime = new Date(row.created_datetime).toISOString().split('T')
               return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
           }
       }
       ,{ 
           'db': 'user_updated', 
           'dt' : 4,
           'formatter' : function( d, row ) {

               var update_datetime = new Date(row.update_datetime).toISOString().split('T')
               return row.updated_by + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 

           }
       }
       ,{ 
           'db': 'update_datetime', 
           'dt' : 5, 
           'formatter' : function( d, row ) {
               
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    if(checkAccessPage && checkAccessPage.can_update == 'Y')
                        html += '    <a href="/black-list/activate/'+row.id_phone_book+'" class="btn btn-success btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Activate"><i class="fas fa-check"></i></a> '
                    html += '</div>'
               
               return html;
           }
       }
   ]

   var data = await phoneBookModels.datatableBlackList(req, cols, 'N')
    
    res.status(200).send(data)

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

    var n = ('phone_number' in req.query) ? req.query.phone_number : ''

    var data_update = { phone_number : n, notes : '', pid : req.query.pid}
    
    if(req.session.dataUpdate){

        data_update.phone_number = req.session.dataUpdate.phoneNumber
        data_update.notes = req.session.dataUpdate.notes
        
    }


    let flashMessage = await helper.flashMessage(req, phoneBookModels, data_update )
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Black List Number'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session

    res.render('black_list/add-black-list', req.renderObjects );
  
});

router.post('/save',  
    body('phoneNumber').not().isEmpty().withMessage('Phone number required').isLength({min:10, max:15}).withMessage('Phone number length min:10 max:15'),
    body('notes').isLength({min:10, max:255}).withMessage('Phone notes length min:10 max:255')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        req.session.dataUpdate = req.body
        res.redirect('/black-list/add');
        return false
    }

    req.body.phoneName = ''

    if(req.body.pid != '')
        var savePhone = await phoneBookModels.updateDataBlackList(req)
    else
        var savePhone = await phoneBookModels.insertDataBlackList(req) 

    req.session.resultMessage = (savePhone) ? helper.MessageSuccess('Success save') : helper.MessageFailed('Failed save')

    res.redirect('/black-list/add');

});

router.get('/activate/:phoneId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
        
        
    var inActiveGroup = await phoneBookModels.activateBlackList(req)

    res.redirect('/black-list');

});



module.exports = router;
