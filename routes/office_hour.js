var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const helper = require('../config/helper');
const officeHourModel = require('../models/office_hour/officeHourModel');
const groupMenuModel = require('../models/group_menu/groupMenuModel');

var groupMenuModels = new groupMenuModel()
var controllerName = 'office_hour'
var officeHourModels = new officeHourModel()
const menuId = 20

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
    req.renderObjects.title = 'Office Hour'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('office_hour/office_hour', req.renderObjects );

});

router.get('/delete/:officeHourId',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var inActiveGroup = await officeHourModels.inActive(req)

    res.redirect('/office-hour');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)
    
    var cols = [
         { 
            'db': 'id_office_hour', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'office_day', 'dt' : 1 }
        ,{ 'db': 'office_open_hour', 'dt' : 2 }
        ,{ 'db': 'office_close_hour', 'dt' : 3 }
        ,{ 
            'db': 'user_created', 
            'dt' : 4,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 5,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.updated_by + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 6, 
            'formatter' : function( d, row ) {
                
                var btnEdit =  (checkAccessPage && checkAccessPage.can_update == 'Y') ? helper.btnEdit('/office-hour/add?id='+row.id_office_hour) : ''
                var btnDelete =  (checkAccessPage && checkAccessPage.can_delete == 'Y') ? helper.btnDelete('/office-hour/delete/'+row.id_office_hour) : ''

                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += btnEdit  
                    html += btnDelete
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await officeHourModels.datatable(req, cols)

    res.status(200).json(data)

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

    let flashMessage = await helper.flashMessage(req, officeHourModels, { office_day : '', office_open_hour : '', office_close_hour : '' } )
    
    var d = {
        'mondays' : 'Mondays', 
        'tuesdays': 'Tuesdays', 
        'wednesday': 'Wednesday', 
        'thursday' : 'Thursday', 
        'fridays' : 'Fridays', 
        'saturdays' : 'Saturdays', 
        'sundays': 'Sundays'}

    var o = ''
    for (const key in d) {
        var s= ''
        if(req.renderObjects.dataUpdate) {
            s = (req.renderObjects.dataUpdate.office_day == key) ? 'selected' : ''
        }
        o += '<option value="'+key+'" '+s+'> ' + d[key] + '</option>' 
    }

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Add Office Hour'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session
    req.renderObjects.opt = o

    res.render('office_hour/add', req.renderObjects );
  
});

router.post('/save',  
    body('officeDay').not().isEmpty().withMessage('Office Day required')
    ,body('officeOpenHour').not().isEmpty().withMessage('office Open Hour required')
    ,body('officeCloseHour').not().isEmpty().withMessage('Office Close Hour required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/office-hour/add');
        return false
    }

    // console.log(req.body)

    var saveGroup = await officeHourModels.insertDataIgnore(req)

    req.session.resultMessage = (saveGroup) ? helper.MessageSuccess('Success save office hour') : helper.MessageFailed('Failed save office hour')

    res.redirect('/office-hour/add');

});

router.post('/update',  
body('officeDay').not().isEmpty().withMessage('Office Day required')
,body('officeOpenHour').not().isEmpty().withMessage('office Open Hour required')
,body('officeCloseHour').not().isEmpty().withMessage('Office Close Hour required')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        res.redirect('/office-hour/add');
        return false
    }
    
    var save = await officeHourModels.update_data(req)

    req.session.resultMessage = (save) ? helper.MessageSuccess('Success update office hour') : helper.MessageFailed('Failed update office hour')

    res.redirect('/office-hour/add');

});

module.exports = router;
