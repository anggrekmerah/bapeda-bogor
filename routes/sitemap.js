var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const sitemapModel = require('../models/sitemap/sitemapModel');
const groupModel = require('../models/group/groupModel');
const helper = require('../config/helper')

var groupModels = new groupModel()

var controllerName = 'sitemap'
var sitemapModels = new sitemapModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Sitemap'

  res.render('sitemap/sitemap', req.renderObjects );

});

router.get('/delete/:sitemapId',  async (req, res, next) => {

    var inActiveGroup = await sitemapModels.inActive(req.params)

    res.redirect('/sitemap');

});

router.get('/datatable',  async (req, res, next) => {

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
                    html += '    <a href="/sitemap/add?id='+row.id_sitemap+'" class="btn btn-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="left" title="Edit"><i class="fas fa-edit"></i></a> '  
                    html += '    <a href="/sitemap/delete/'+row.id_sitemap+'" class="btn btn-danger btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Delete"><i class="fas fa-trash-alt"></i></a> '
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await sitemapModels.datatable(req, cols)
    
    res.status(200).send(data)

});


router.get('/add',  async (req, res, next) => {
  
    let flashMessage = await helper.flashMessage(req, sitemapModels, { id_group : '', hirarcy_ordered : '' } )
    
    var dataGroups = await groupModels.execQuery('select a.id_group, a.group_name from bapenda.m_group a left join bapenda.m_sitemap b on a.id_group = b.id_group AND b.active = "Y" where ((a.active = "Y" AND b.id_group IS NULL) OR b.active = "N")')
    
    delete dataGroups.meta
    req.renderObjects.groupList = dataGroups
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Sitemap'
    req.renderObjects.alert = flashMessage

    res.render('sitemap/add-sitemap', req.renderObjects );
  
});

router.post('/save',  
    body('groupId').not().isEmpty().withMessage('Group required'),
    body('order').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/sitemap/add');
        return false
    }

    var savesitemapModels = await sitemapModels.insertData(req.body)

    req.session.resultMessage = (savesitemapModels) ? helper.MessageSuccess('Success save sitemap') : helper.MessageFailed('Failed save sitemap')

    res.redirect('/sitemap/add');

});

router.post('/update',  
    body('groupId').not().isEmpty().withMessage('Group required'),
    body('order').not().isEmpty().withMessage('Order required')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/sitemap/add');
        return false
    }
    
    var update_data = await sitemapModels.update_data({ ...req.body, ...req.query})

    req.session.resultMessage = (update_data) ? helper.MessageSuccess('Success update sitemap') : helper.MessageFailed('Failed update sitemap')

    res.redirect('/sitemap/add');

});

module.exports = router;


