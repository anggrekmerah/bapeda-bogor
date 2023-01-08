var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const menuModel = require('../models/menu/menuModel');
const helper = require('../config/helper')
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var groupMenuModels = new groupMenuModel()
var controllerName = 'menu'
var menuModels = new menuModel()
const menuId = 4


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
    req.renderObjects.title = 'Menus'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('menu/menu', req.renderObjects );

});

router.get('/delete/:menuId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var inActiveGroup = await menuModels.inActive(req)

    res.redirect('/menu');

});

router.get('/datatable',  async (req, res, next) => {
    
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
         { 
            'db': 'id_menu', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'menu_name', 'dt' : 1 }
        ,{ 'db': 'menu_desc', 'dt' : 2 }
        ,{ 'db': 'menu_url', 'dt' : 3 }
        ,{ 'db': 'icon', 'dt' : 4 }
        ,{ 'db': 'order_menu', 'dt' : 5 }
        ,{ 
            'db': 'user_created', 
            'dt' : 6,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 7,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.updated_by + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 8, 
            'formatter' : function( d, row ) {
                
                var btnEdit =  (checkAccessPage && checkAccessPage.can_update == 'Y') ? helper.btnEdit('/menu/add?id='+row.id_menu) : ''
                var btnDelete =  (checkAccessPage && checkAccessPage.can_delete == 'Y') ? helper.btnDelete('/menu/delete/'+row.id_menu) : ''

                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += btnEdit  
                    html += btnDelete
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await menuModels.datatable(req, cols)

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

    let flashMessage = await helper.flashMessage(req, menuModels, { menu_name : '', menu_desc : '', menu_url : '', parent_id : '', icon : '', order_menu : '' } )
    let menus = await menuModels.getAllData()

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Menu'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session

    delete menus.meta
    req.renderObjects.menuList = menus

    res.render('menu/add-menu', req.renderObjects );
  
});

router.post('/save',  
    body('menuName').not().isEmpty().withMessage('Menu name required'), 
    body('orderMenu').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/menu/add');
        return false
    }

    var savemenu = await menuModels.insertDataIgnore(req)

    req.session.resultMessage = (savemenu) ? helper.MessageSuccess('Success save menu') : helper.MessageFailed('Failed save menu')

    res.redirect('/menu/add');

});

router.post('/update',  
    body('menuName').not().isEmpty().withMessage('Menu name required'), 
    body('orderMenu').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/menu/add');
        return false
    }
    
    var savemenu = await menuModels.update_data(req)

    req.session.resultMessage = (savemenu) ? helper.MessageSuccess('Success update menu') : helper.MessageFailed('Failed update menu')

    res.redirect('/menu/add');

});

module.exports = router;
