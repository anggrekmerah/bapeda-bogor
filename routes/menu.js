var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const menuModel = require('../models/menu/menuModel');

var controllerName = 'menu'
var menuModels = new menuModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Menus'

  res.render('menu/menu', req.renderObjects );

});

router.get('/delete/:menuId',  async (req, res, next) => {

    var inActiveGroup = await menuModels.inActiveGroup(req.params)

    res.redirect('/menu');

});

router.get('/datatable',  async (req, res, next) => {
    
    var cols = [
         { 
            'db': 'id_menu', 
            'dt' : 0,
            'formatter' : function( d, row ) {
                return row.nomor
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
   
    res.json(data)

});

router.get('/add',  async (req, res, next) => {
    

    var q = req.query

    if('id' in q){
        var d = await menuModels.getMenuById(q.id)  
        if(d) {
            
            req.renderObjects.dataUpdate = d[0]
        }
    } else {
        req.renderObjects.dataUpdate = { menu_name : '', menu_desc : '', menu_url : '', icon : '', active : '' }
    }

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Menu'

    var resultMessage = (req.session.resultMessage) ? req.session.resultMessage : '' 

    delete req.session.resultMessage

    var alert = ''
    if (resultMessage != '') {

        for (const key in resultMessage) {
            
            if (resultMessage[key].param == 'success') {
              
                alert += '<div class="alert alert-success d-flex align-items-center" role="alert">'
                alert += '<i class="fas fa-check me-1"></i>'
                alert += '<div>'
                alert += resultMessage[key].msg
                alert += '</div>'
                alert += '</div>'
              
            } else {
                alert += '<div class="alert alert-danger d-flex align-items-center" role="alert">'
                alert += '<i class="fas fa-exclamation-triangle me-1"></i>'
                alert += '<div>'
                alert +=  resultMessage[key].msg
                alert += '</div>'
                alert += '</div>'
            }

        }

    }

    req.renderObjects.alert = alert

    res.render('menu/add-menu', req.renderObjects );
  
});

router.post('/save',
    body('menuName').not().isEmpty().withMessage('Menu name required').isLength({min:3, max:100}).withMessage('Group name length min:3 max:100'),
    body('menuDesc').not().isEmpty().withMessage('Descrition Menu required').isLength({min:3, max:100}).withMessage('Descrition Menu length min:3 max:100'),
    body('menuUrl').not().isEmpty().withMessage('Url Menu required').isLength({min:3, max:255}).withMessage('Descrition Menu length min:3 max:255')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/group/add');
        return false
    }

    var saveGroup = await menuModels.saveGroup(req.body)

    if(saveGroup) {

        req.session.resultMessage = [{
            value:''
           ,msg:'Success save group'
           ,param:'success'
           ,location:''
       }]

    } else {

        req.session.resultMessage = [{
            value:''
           ,msg:'Failed save group'
           ,param:'failed'
           ,location:''
       }]

    }

    res.redirect('/group/add');

});

router.post('/update',  
    body('menuName')
        .not().isEmpty()
        .withMessage('Group name required')
        .isLength({min:3, max:100})
        .withMessage('Group name length min:3 max:50')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/group/add');
        return false
    }
    
    var saveGroup = await menuModels.updateGroup({ ...req.body, ...req.query})

    if(saveGroup) {

        req.session.resultMessage = [{
            value:''
           ,msg:'Success update group'
           ,param:'success'
           ,location:''
       }]

    } else {

        req.session.resultMessage = [{
            value:''
           ,msg:'Failed update group'
           ,param:'failed'
           ,location:''
       }]

    }

    res.redirect('/group/add');

});

module.exports = router;
