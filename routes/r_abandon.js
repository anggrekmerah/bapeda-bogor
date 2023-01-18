var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { Parser } = require('json2csv');

const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const r_abandonModel = require('../models/reports/r_abandonModel');

var controllerName = 'r_abandon'
var groupMenuModels = new groupMenuModel()
var r_abandonModels = new r_abandonModel()
const menuId = 16

/* GET home page. */
router.get('/abandon',  async (req, res, next) => {

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
    req.renderObjects.title = 'Report Abandon'
    req.renderObjects.sess = req.session
    res.render('reports/abandon', req.renderObjects );

});

router.get('/abandon-csv/:fromDate/:toDate',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
    
    const dataModel = await r_abandonModels.get_data(req)

    delete dataModel.meta

    if(dataModel.length > 0) {

        for (const key in dataModel) {
            
            dataModel[key]['calldate'] = helper.convertDate(dataModel[key]['calldate'])
            dataModel[key]['dst'] = ''
        }

    }

    var df = (req.params.fromDate == 'null') ? helper.dateNow() : req.params.fromDate 
    var dt = (req.params.toDate == 'null') ? helper.dateNow() : req.params.toDate

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataModel);

    res.attachment('report-abandon-'+df+'_'+dt+'.csv');
    res.status(200).send(csv);

});

router.post('/abandon-datatable',  async (req, res, next) => {

    // if(!req.session.loggedin)   {  
    //     res.render('error')
    //     return false
    // }

    // var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
        { 
            'db': 'recid', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 
            'db': 'calldate', 
            'dt' : 1,
            'formatter' : function (d, row) {
                return helper.convertDate(row.calldate)
            }
        }
        ,{ 'db': 'timecalls', 'dt' : 2 }
        ,{ 'db': 'src', 'dt' : 3 }
        ,{ 
            'db': 'dst', 
            'dt' : 4,
            'formatter' : function (d, row) {
                return ''
            } }
        ,{ 'db': 'billsec', 'dt' : 5 }
       
    ]

    var data = await r_abandonModels.datatable(req, cols)

    res.status(200).json(data)

});

module.exports = router;