var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const sitemapModel = require('../models/sitemap/sitemapModel');
const groupModel = require('../models/group/groupModel');
const helper = require('../config/helper')
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var groupMenuModels = new groupMenuModel()
var groupModels = new groupModel()

var controllerName = 'sitemap'
var sitemapModels = new sitemapModel()
const menuId = 6

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
    req.renderObjects.title = 'Sitemap'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('sitemap/sitemap', req.renderObjects );

});

router.get('/delete/:sitemapId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var inActiveGroup = await sitemapModels.inActive(req)

    res.redirect('/sitemap');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
         { 
            'db': 'id_sitemap', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)

            }
        }
        ,{ 'db': 'group_name', 'dt' : 1 }
        ,{ 'db': 'hirarcy_ordered', 'dt' : 2 }
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
                
                var btnEdit =  (checkAccessPage && checkAccessPage.can_update == 'Y') ? helper.btnEdit('/sitemap/add?id='+row.id_sitemap) : ''
                var btnDelete =  (checkAccessPage && checkAccessPage.can_delete == 'Y') ? helper.btnDelete('/sitemap/delete/'+row.id_sitemap) : ''

                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += btnEdit   
                    html += btnDelete
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await sitemapModels.datatable(req, cols)
    
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

    let flashMessage = await helper.flashMessage(req, sitemapModels, { id_group : '', hirarcy_ordered : '' } )
    
    var q = req.query

    if('id' in q){
        
        var dataUpdate = req.renderObjects.dataUpdate
        var dataGroups = await groupModels.getDataById(dataUpdate.id_group)

    } else {
        
        var sql = 'select a.id_group, a.group_name from m_group a '
            sql += 'left join m_sitemap b on a.id_group = b.id_group AND b.active = "Y" where ((a.active = "Y" AND b.id_group IS NULL) OR b.active = "N")'
            
        var dataGroups = await groupModels.execQuery(sql)
    
    }

    delete dataGroups.meta
    req.renderObjects.groupList = dataGroups
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Sitemap'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session

    res.render('sitemap/add-sitemap', req.renderObjects );
  
});

router.post('/save',  
    body('groupId').not().isEmpty().withMessage('Group required'),
    body('order').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/sitemap/add');
        return false
    }

    var savesitemapModels = await sitemapModels.insertDataIgnore(req)

    req.session.resultMessage = (savesitemapModels) ? helper.MessageSuccess('Success save sitemap') : helper.MessageFailed('Failed save sitemap')

    res.redirect('/sitemap/add');

});

router.post('/update',  
    body('groupId').not().isEmpty().withMessage('Group required'),
    body('order').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/sitemap/add');
        return false
    }
    
    var update_data = await sitemapModels.update_data()

    req.session.resultMessage = (update_data) ? helper.MessageSuccess('Success update sitemap') : helper.MessageFailed('Failed update sitemap')

    res.redirect('/sitemap/add');

});

module.exports = router;


