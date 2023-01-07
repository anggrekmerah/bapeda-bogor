var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const userModel = require('../models/user/userModels');
const helper = require('../config/helper')
const groupModel = require('../models/group/groupModel');
const extensionModel = require('../models/extension/extensionModel');
var bcrypt = require('bcryptjs');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/user-photo/')
  },
  size: function (req, file, cb) {
    cb(null, 500000)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replaceAll(' ','-') )
  }
})

const upload = multer({storage })

var controllerName = 'users'
var userModels = new userModel()
var groupModels = new groupModel()
var extensionModels = new extensionModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'User'
    req.renderObjects.sess = req.session

  res.render('user/users', req.renderObjects );

});

router.get('/datatable',  async (req, res, next) => {
    
  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

    var cols = [
         { 
            'db': 'id_user', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'email', 'dt' : 1 }
        ,{ 'db': 'group_name', 'dt' : 2 }
        ,{ 'db': 'extension', 'dt' : 3 }
        ,{ 'db': 'first_name', 'dt' : 4 }
        ,{ 'db': 'last_name', 'dt' : 5 }
        ,{ 'db': 'parent_user', 'dt' : 6 }
        ,{ 'db': 'ages', 'dt' : 7 }
        ,{ 'db': 'last_login', 'dt' : 8 }
        ,{ 'db': 'last_logout', 'dt' : 9 }
        ,{ 
            'db': 'user_created', 
            'dt' : 10,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 11,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 12, 
            'formatter' : function( d, row ) {
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += '    <a href="/users/add?id='+row.id_user+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/users/delete/'+row.id_user+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await userModels.datatable(req, cols)
    
    res.status(200).send(data)

});

router.get('/delete/:userId',  async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

  var inActiveGroup = await userModels.inActive(req.params)

  res.redirect('/users');

});

router.get('/add',  async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

        
  var data_update = { 

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
   ,is_agent : ''
   
  }

  if(req.session.dataUpdate){

    data_update.id_group = req.session.dataUpdate.groupId
    data_update.id_extension = req.session.dataUpdate.extensionId
    data_update.username = req.session.dataUpdate.username
    data_update.password = req.session.dataUpdate.password
    data_update.first_name = req.session.dataUpdate.firstName
    data_update.last_name = req.session.dataUpdate.lastName
    data_update.ages = req.session.dataUpdate.ages
    data_update.parent_user = req.session.dataUpdate.parentUser
    data_update.is_agent = req.session.dataUpdate.isAgent

  }

  let flashMessage = await helper.flashMessage(req, userModels, data_update)
  
  var dataGroups = await groupModels.getAllData()
  
  var dataUser = await userModels.getListParent()

  if(!('id' in req.query)){
    var dataExt = await userModels.getListExtension()
  } else {
    var dataExt = await extensionModels.getAllData()
  }

  req.renderObjects.controller = controllerName
  req.renderObjects.title = 'Add User'
  req.renderObjects.alert = flashMessage
  req.renderObjects.sess = req.session

  delete dataGroups.meta
  req.renderObjects.groupList = dataGroups

  delete dataExt.meta
  req.renderObjects.extList = dataExt

  delete dataUser.meta
  req.renderObjects.userList = dataUser


  res.render('user/add-user', req.renderObjects );

});

router.post('/save',  
  upload.single('photo'),
  body('firstName').not().isEmpty().withMessage('First name required').isLength({min:3, max:100}).withMessage('First name length min:3 max:100'),
  body('lastName').not().isEmpty().withMessage('Last name required').isLength({min:3, max:100}).withMessage('Last name length min:3 max:100'),
  body('username').not().isEmpty().withMessage('Username required').isLength({min:8, max:30}).withMessage('Email length min:8 max:30'),
  body('password').not().isEmpty().withMessage('Password required').isLength({min:8, max:30}).withMessage('Password length min:8 max:30'),
  body('groupId').not().isEmpty().withMessage('Group required')
,async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      req.session.resultMessage = errors.array()
      req.session.dataUpdate = req.body
      res.redirect('/users/add');
      return false
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  
  req.body.passHash = hash

  if('file' in req)
    req.body.fileName = req.file.originalname.replaceAll(' ','-')

  var save = await userModels.insertDataIgnore(req.body)

  req.session.resultMessage = (save) ? helper.MessageSuccess('Success save user') : helper.MessageFailed('Failed save group')

  res.redirect('/users/add');

});

router.post('/update',  
  upload.single('photo'),
  body('firstName').not().isEmpty().withMessage('First name required').isLength({min:3, max:100}).withMessage('First name length min:3 max:100'),
  body('lastName').not().isEmpty().withMessage('Last name required').isLength({min:3, max:100}).withMessage('Last name length min:3 max:100'),
  body('username').not().isEmpty().withMessage('Username required').isLength({min:8, max:30}).withMessage('Email length min:8 max:30'),
  body('password').not().isEmpty().withMessage('Password required').isLength({min:8, max:30}).withMessage('Password length min:8 max:30'),
  body('groupId').not().isEmpty().withMessage('Group required')
,async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
    return false
}

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      req.session.resultMessage = errors.array()
      req.session.dataUpdate = req.body
      res.redirect('/users/add?id='+req.query.id);
      return false
  }
  
  if('file' in req)
    req.body.fileName = req.file.originalname.replaceAll(' ','-')

  if(req.body.password != '') {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    
    req.body.passHash = hash
    
  }

  var udpate = await userModels.update_data(req)

  req.session.resultMessage = (udpate) ? helper.MessageSuccess('Success update user') : helper.MessageFailed('Failed update user')

  res.redirect('/users/add');

});

module.exports = router;
