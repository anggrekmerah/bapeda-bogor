var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const groupMenuModel = require('../models/group_menu/groupMenuModel');
const helper = require('../config/helper')
const groupModel = require('../models/group/groupModel');
const navbar_model = require('../config/navbar_model');

var groupModels = new groupModel()

var controllerName = 'group_menu'
var groupMenuModels = new groupMenuModel()

var navbar_models = new navbar_model()
const menuId = 5

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
    req.renderObjects.title = 'Group Menu'
    req.renderObjects.sess = req.session

  res.render('group_menu/group_menu', req.renderObjects );

});

router.get('/datatable',  async (req, res, next) => {
    
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
        { 
           'db': 'id_group', 
           'dt' : 0,
           'formatter' : function( d, row ) {

               return Number(row.nomor)
           }
       }
       ,{ 'db': 'group_name', 'dt' : 1 }
       ,{ 
           'db': 'user_created', 
           'dt' : 2,
           'formatter' : function( d, row ) {
               var created_datetime = new Date(row.created_datetime).toISOString().split('T')
               return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
           }
       }
       ,{ 
           'db': 'update_datetime', 
           'dt' : 3, 
           'formatter' : function( d, row ) {
               
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'

                    if (checkAccessPage && checkAccessPage.can_update == 'Y')
                        html += '    <a href="/group-menu/add?id='+row.id_group+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                
                        //    html += '    <a href="/group-menu/delete/'+row.id_group+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                
                    html += '</div>'
               
               return html;
           }
       }
   ]

    var data = await groupMenuModels.datatable(req, cols)
    
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

    let flashMessage = await helper.flashMessage(req, groupModels, { id_group : '', id_menu : '' } )
    
    var q = req.query

    var sql = 'SELECT a.id_menu, a.menu_name, a.parent_id, b.id_menu as menu_id, if(b.id_menu IS NULL , "N", "Y") AS checklist, b.can_select, b.can_delete, b.can_update, b.can_insert  FROM m_menu a'
        sql += ' LEFT JOIN m_group_menu b ON a.id_menu = b.id_menu AND b.id_group = ?'
        sql += ' where a.active = "Y" order by a.order_menu asc'
        
    var dataMenu = await groupMenuModels.execQuery(sql, [q.id])

    var refactorMenu = navbar_models.nestedChildren2(dataMenu)
    var bikinMenu = navbar_models.bikinGroupMenu(refactorMenu)

    req.renderObjects.dataMenuList = bikinMenu
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Group Menu'
    req.renderObjects.alert = flashMessage
    req.renderObjects.groupId = q.id
    req.renderObjects.sess = req.session


    res.render('group_menu/add-group-menu', req.renderObjects );
  
});

router.post('/save', async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var menus = req.body['menu[]']
    var groupId = req.body.groupId
    // console.log(req.body)
    var save = false
    if(menus.length > 0) {

        var deleteGroup = await groupMenuModels.execQuery('delete from m_group_menu where id_group = ?', [groupId]) 

        if(deleteGroup) {

            for (const key in menus) {
                var b = { 'groupId' :  groupId, 'menuId' : menus[key], 'can_select' : 'N', 'can_delete' : 'N', 'can_insert' : 'N', 'can_update' : 'N', 'id_user':req.session.id_user }
     
                if ('can_select' in req.body) {
    
                    if(typeof req.body.can_select == 'object'){
                        b['can_select'] = (req.body.can_select.indexOf(menus[key]) > -1) ? 'Y' : 'N'
                    } else {
                        b['can_select'] = (menus[key] == req.body.can_select) ? 'Y' : 'N'        
                    }
    
                }
    
                if ('can_delete' in req.body) {
    
                    if(typeof req.body.can_delete == 'object'){
                        b['can_delete'] = (req.body.can_delete.indexOf(menus[key]) > -1) ? 'Y' : 'N'
                    } else {
                        b['can_delete'] = (menus[key] == req.body.can_delete) ? 'Y' : 'N'        
                    }
    
                }
    
                if ('can_insert' in req.body) {
    
                    if(typeof req.body.can_insert == 'object'){
                        b['can_insert'] = (req.body.can_insert.indexOf(menus[key]) > -1) ? 'Y' : 'N'
                    } else {
                        b['can_insert'] = (menus[key] == req.body.can_insert) ? 'Y' : 'N'        
                    }
    
                }
    
                if ('can_update' in req.body) {
    
                    if(typeof req.body.can_update == 'object'){
                        b['can_update'] = (req.body.can_update.indexOf(menus[key]) > -1) ? 'Y' : 'N'
                    } else {
                        b['can_update'] = (menus[key] == req.body.can_update) ? 'Y' : 'N'        
                    }
    
                }
                
                save = await groupMenuModels.insertData(b)        
            }

        }
        

    }

    req.session.resultMessage = (save) ? helper.MessageSuccess('Success save group menu') : helper.MessageFailed('Failed save group menu')

    res.redirect('/group-menu/add?id='+groupId);

});


module.exports = router;
