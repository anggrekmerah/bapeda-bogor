var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const menuModel = require('../models/menu/menuModel');
const helper = require('../config/helper')

var controllerName = 'menu'
var menuModels = new menuModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Menus'

  res.render('menu/menu', req.renderObjects );

});

router.get('/delete/:menuId',  async (req, res, next) => {

    var inActiveGroup = await menuModels.inActive(req.params)

    res.redirect('/menu');

});

router.get('/datatable',  async (req, res, next) => {
    
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
                return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 7,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 8, 
            'formatter' : function( d, row ) {
                
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += '    <a href="/menu/add?id='+row.id_menu+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/menu/delete/'+row.id_menu+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await menuModels.datatable(req, cols)

    res.status(200).send(data)

});


router.get('/add',  async (req, res, next) => {
  
    let flashMessage = await helper.flashMessage(req, menuModels, { menu_name : '', menu_desc : '', menu_url : '', parent_id : '', icon : '', order_menu : '' } )
    let menus = await menuModels.getAllData()

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Menu'
    req.renderObjects.alert = flashMessage

    delete menus.meta
    req.renderObjects.menuList = menus

    res.render('menu/add-menu', req.renderObjects );
  
});

router.post('/save',  
    body('menuName').not().isEmpty().withMessage('Menu name required'), 
    body('menuUrl').not().isEmpty().withMessage('Menu url required'), 
    body('parentId').not().isEmpty().withMessage('Parent required'), 
    body('icon').not().isEmpty().withMessage('Icon required'), 
    body('orderMenu').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/menu/add');
        return false
    }

    var savemenu = await menuModels.insertData(req.body)

    req.session.resultMessage = (savemenu) ? helper.MessageSuccess('Success save menu') : helper.MessageFailed('Failed save menu')

    res.redirect('/menu/add');

});

router.post('/update',  
    body('menuName').not().isEmpty().withMessage('Menu name required'), 
    body('menuUrl').not().isEmpty().withMessage('Menu url required'), 
    body('parentId').not().isEmpty().withMessage('Parent required'), 
    body('icon').not().isEmpty().withMessage('Icon required'), 
    body('orderMenu').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/menu/add');
        return false
    }
    
    var savemenu = await menuModels.update_data({ ...req.body, ...req.query})

    req.session.resultMessage = (savemenu) ? helper.MessageSuccess('Success update menu') : helper.MessageFailed('Failed update menu')

    res.redirect('/menu/add');

});

module.exports = router;
