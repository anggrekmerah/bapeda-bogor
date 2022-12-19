var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const groupModel = require('../models/group/groupModel')
const helper = require('../config/helper')

var controllerName = 'group'
var groupModels = new groupModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Group'

  res.render('group/group', req.renderObjects );

});

router.get('/delete/:groupId',  async (req, res, next) => {

    var inActiveGroup = await groupModels.inActive(req.params)

    res.redirect('/group');

});

router.get('/datatable',  async (req, res, next) => {

    var cols = [
         { 
            'db': 'id_group', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'group_name', 'dt' : 1 }
        ,{ 'db': 'group_desc', 'dt' : 2 }
        ,{ 
            'db': 'user_created', 
            'dt' : 3,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 4,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 5, 
            'formatter' : function( d, row ) {
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += '    <a href="/group/add?id='+row.id_group+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/group/delete/'+row.id_group+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await groupModels.datatable(req, cols)

    res.status(200).json(data)

});

router.get('/add',  async (req, res, next) => {
  
    let flashMessage = await helper.flashMessage(req, groupModels, { group_name : '', group_desc : '' } )
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Group'
    req.renderObjects.alert = flashMessage

    res.render('group/add-group', req.renderObjects );
  
});

router.post('/save',  
    body('groupName').not().isEmpty().withMessage('Group name required').isLength({min:3, max:50}).withMessage('Group name length min:3 max:50')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/group/add');
        return false
    }

    var saveGroup = await groupModels.insertData(req.body)

    req.session.resultMessage = (saveGroup) ? helper.MessageSuccess('Success save group') : helper.MessageFailed('Failed save group')

    res.redirect('/group/add');

});

router.post('/update',  
    body('groupName').not().isEmpty().withMessage('Group name required').isLength({min:3, max:50}).withMessage('Group name length min:3 max:50')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/group/add');
        return false
    }
    
    var saveGroup = await groupModels.update_data({ ...req.body, ...req.query})

    req.session.resultMessage = (saveGroup) ? helper.MessageSuccess('Success update group') : helper.MessageFailed('Failed update group')

    res.redirect('/group/add');

});

module.exports = router;
