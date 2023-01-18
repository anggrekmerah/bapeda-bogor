var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { Parser } = require('json2csv');

const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const r_outgoingModel = require('../models/reports/r_outgoingModel');

var controllerName = 'r_outgoing'
var groupMenuModels = new groupMenuModel()
var r_outgoingModels = new r_outgoingModel()
const menuId = 15

/* GET home page. */
router.get('/outgoing',  async (req, res, next) => {

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
    req.renderObjects.title = 'Report Outgoing'
    req.renderObjects.sess = req.session
    res.render('reports/outgoing', req.renderObjects );

});

router.get('/outgoing-csv/:fromDate/:toDate',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
    
    const dataModel = await r_outgoingModels.get_data(req)

    delete dataModel.meta

    if(dataModel.length > 0) {

        for (const key in dataModel) {
            
            dataModel[key]['calldate'] = helper.convertDate(dataModel[key]['calldate'])
            
        }

    }

    var df = (req.params.fromDate == '') ? helper.dateNow() : req.params.fromDate 
    var dt = (req.params.toDate == '') ? helper.dateNow() : req.params.toDate

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataModel);

    res.attachment('report-outgoing-'+df+'_'+dt+'.csv');
    res.status(200).send(csv);

});

router.post('/outgoing-datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

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
        ,{ 'db': 'dst', 'dt' : 4 }
        ,{ 'db': 'disposition', 'dt' : 5 }
        ,{ 'db': 'billsec', 'dt' : 6 }
       
    ]

    var data = await r_outgoingModels.datatable(req, cols)

    res.status(200).json(data)

});

module.exports = router;