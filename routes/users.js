var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const userModel = require('../models/user/userModels');
const helper = require('../config/helper')
const groupModel = require('../models/group/groupModel');
const extensionModel = require('../models/extension/extensionModel');

var controllerName = 'users'
var userModels = new userModel()
var groupModels = new groupModel()
var extensionModels = new extensionModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'User'

  res.render('user/users', req.renderObjects );

});

router.get('/datatable',  async (req, res, next) => {
    
    var cols = [
         { 
            'db': 'id_user', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'id_group', 'dt' : 1 }
        ,{ 'db': 'id_extension', 'dt' : 2 }
        ,{ 'db': 'first_name', 'dt' : 3 }
        ,{ 'db': 'last_name', 'dt' : 4 }
        ,{ 'db': 'parent_user', 'dt' : 5 }
        ,{ 'db': 'age', 'dt' : 6 }
        ,{ 'db': 'last_login', 'dt' : 7 }
        ,{ 'db': 'last_logout', 'dt' : 8 }
        ,{ 
            'db': 'user_created', 
            'dt' : 9,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 10,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 11, 
            'formatter' : function( d, row ) {
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    // html += '    <a href="/users/add?id='+row.id_user+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/users/delete/'+row.id_user+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await userModels.datatable(req, cols)
    
    res.status(200).send(data)

});

router.get('/delete/:groupId',  async (req, res, next) => {

  var inActiveGroup = await userModels.inActive(req.params)

  res.redirect('/group');

});
router.get('/add',  async (req, res, next) => {

  let flashMessage = await helper.flashMessage(req, userModels, { 

         id_group : ''
        ,id_extension : ''
        ,username : ''
        ,password : ''
        ,first_name : ''
        ,last_name : ''
        ,photo : ''
        ,ages : ''
        ,parent_user : ''
        ,active : ''
        
      })
  
  var dataGroups = await groupModels.getAllData()
  var dataExt = await extensionModels.getAllData()
  var dataUser = await userModels.getAllData()

  req.renderObjects.controller = controllerName
  req.renderObjects.title = 'Add User'
  req.renderObjects.alert = flashMessage

  delete dataGroups.meta
  req.renderObjects.groupList = dataGroups

  delete dataExt.meta
  req.renderObjects.extList = dataExt

  delete dataUser.meta
  req.renderObjects.userList = dataUser

  res.render('user/add-user', req.renderObjects );

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

  var saveGroup = await userModels.insertData(req.body)

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
  
  var saveGroup = await userModels.update_data({ ...req.body, ...req.query})

  req.session.resultMessage = (saveGroup) ? helper.MessageSuccess('Success update group') : helper.MessageFailed('Failed update group')

  res.redirect('/group/add');

});

module.exports = router;
