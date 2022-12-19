var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const sitemapModel = require('../models/sitemap/sitemapModel');

var controllerName = 'sitemap'
var sitemapModels = new sitemapModel()


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Sitemap'

  res.render('sitemap/sitemap', req.renderObjects );

});

router.get('/delete/:groupId',  async (req, res, next) => {

    var inActiveGroup = await sitemapModels.inActiveGroup(req.params)

    res.redirect('/group');

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
        ,{ 'db': 'id_group', 'dt' : 1 }
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
  
    var q = req.query

    if('id' in q){
        var d = await sitemapModels.getGroupById(q.id)  
        if(d) {
            
            req.renderObjects.dataUpdate = d[0]
        }
    } else {
        req.renderObjects.dataUpdate = { group_name : '', group_desc : '' }
    }

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Group'

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

    var saveGroup = await sitemapModels.saveGroup(req.body)

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
    body('groupName').not().isEmpty().withMessage('Group name required').isLength({min:3, max:50}).withMessage('Group name length min:3 max:50')
,async (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/group/add');
        return false
    }
    
    var saveGroup = await sitemapModels.updateGroup({ ...req.body, ...req.query})

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


