var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const extensionModel = require('../models/extension/extensionModel');
const helper = require('../config/helper')

var controllerName = 'extension'
var extensionModels = new extensionModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    if(!req.session.loggedin)                
        res.render('error')

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Extension'

  res.render('extension/extension', req.renderObjects );

});

router.get('/delete/:extensionId',  async (req, res, next) => {

    if(!req.session.loggedin)                
        res.redirect('/auth')

    var inActiveextension = await extensionModels.inActive(req)

    res.redirect('/extension');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)                
        res.redirect('/auth')

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
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += '    <a href="/extension/add?id='+row.id_extension+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/extension/delete/'+row.id_extension+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await extensionModels.datatable(req, cols)
    
    res.status(200).json(data)

});

router.get('/add',  async (req, res, next) => {
  
    if(!req.session.loggedin)                
        res.render('error')

    let flashMessage = await helper.flashMessage(req, extensionModels, { extension : '' } )
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Extension'
    req.renderObjects.alert = flashMessage

    res.render('extension/add-extension', req.renderObjects );
  
});

router.post('/save',  
    body('extension').not().isEmpty().withMessage('Extension required').isLength({min:3, max:5}).withMessage('Extension length min:3 max:5')
,async (req, res, next) => {
  
    if(!req.session.loggedin)                
        res.redirect('/auth')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/extension/add');
        return false
    }

    var savePhone = await extensionModels.insertData(req)

    req.session.resultMessage = (savePhone) ? helper.MessageSuccess('Success save extension') : helper.MessageFailed('Failed save extension')

    res.redirect('/extension/add');

});

router.post('/update',  
    body('extension').not().isEmpty().withMessage('Extension required').isLength({min:3, max:5}).withMessage('Extension length min:3 max:5')
,async (req, res, next) => {
  
    if(!req.session.loggedin)                
        res.redirect('/auth')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/extension/add');
        return false
    }
    
    var updatePhone = await extensionModels.update_data(req)

    req.session.resultMessage = (updatePhone) ? helper.MessageSuccess('Success update extension') : helper.MessageFailed('Failed update extension')

    res.redirect('/extension/add');

});

module.exports = router;

