var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const phoneBookModel = require('../models/phone_book/phoneBookModel');
const helper = require('../config/helper')

var controllerName = 'phone_book'
var phoneBookModels = new phoneBookModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Phone Book'
    req.renderObjects.sess = req.session

  res.render('phone_book/phone_book', req.renderObjects );

});

router.get('/delete/:phoneId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }             
        

    var inActiveGroup = await phoneBookModels.inActive(req.params)

    res.redirect('/black-list');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var cols = [
         { 
            'db': 'id_phone_book', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)

            }
        }
        ,{ 'db': 'phone_name', 'dt' : 1 }
        ,{ 'db': 'phone_number', 'dt' : 2 }
        ,{ 'db': 'notes', 'dt' : 3 }
        ,{ 
            'db': 'user_created', 
            'dt' : 4,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 5,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 6, 
            'formatter' : function( d, row ) {
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += '    <a href="/phone-book/add?id='+row.id_phone_book+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/black-list/add?phone_number='+row.phone_number+'" class="btn btn-warning btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Black List"><i class="fas fa-phone-slash"></i></a> '
                    html += '    <a href="/phone-book/delete/'+row.id_phone_book+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fa-solid fa-trash"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await phoneBookModels.datatable(req, cols)
    
    res.status(200).send(data)

});

router.get('/add',  async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var n = ('phone_number' in req.query) ? req.query.phone_number : ''

    var data_update = { phone_name : '', phone_number : n, notes : ''}
    
    if(req.session.dataUpdate){

        data_update.phone_name = req.session.dataUpdate.phoneName
        data_update.phone_number = req.session.dataUpdate.phoneNumber
        data_update.notes = req.session.dataUpdate.notes

    }

    let flashMessage = await helper.flashMessage(req, phoneBookModels,  data_update)
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Phone Book'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session

    res.render('phone_book/add-phone-book', req.renderObjects );
  
});

router.post('/save',  
    body('phoneName').not().isEmpty().withMessage('Phone name required').isLength({min:3, max:100}).withMessage('Phone name length min:3 max:100'),
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
        res.redirect('/phone-book/add');
        return false
    }

    var savePhone = await phoneBookModels.insertDataIgnore(req.body)

    req.session.resultMessage = (savePhone) ? helper.MessageSuccess('Success save phone book') : helper.MessageFailed('Failed save phone book')

    res.redirect('/phone-book/add');

});

router.post('/update',  
    body('phoneName').not().isEmpty().withMessage('Phone name required').isLength({min:3, max:100}).withMessage('Phone name length min:3 max:100'),
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
        res.redirect('/phone_book/add');
        return false
    }
    
    var updatePhone = await phoneBookModels.update_data({ ...req.body, ...req.query})

    req.session.resultMessage = (updatePhone) ? helper.MessageSuccess('Success update phone book') : helper.MessageFailed('Failed update phone book')

    res.redirect('/phone-book/add');

});

module.exports = router;
