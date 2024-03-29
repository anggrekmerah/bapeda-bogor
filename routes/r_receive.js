var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { Parser } = require('json2csv');

const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const r_receiveModel = require('../models/reports/r_receiveModel');

var controllerName = 'r_receive'
var groupMenuModels = new groupMenuModel()
var r_receiveModels = new r_receiveModel()
const menuId = 15

/* GET home page. */
router.get('/receive',  async (req, res, next) => {

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
    req.renderObjects.title = 'Report Receive'
    req.renderObjects.sess = req.session
    res.render('reports/receive', req.renderObjects );

});

router.get('/receive-csv/:fromDate/:toDate',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
    
    const dataModel = await r_receiveModels.get_data(req)

    delete dataModel.meta

    if(dataModel.length > 0) {

        for (const key in dataModel) {
            
            dataModel[key]['Date'] = helper.convertDate(dataModel[key]['Date'])

            // if(dataModel[key]['dstchannel'] != '') {

            //     var dst = dataModel[key]['dstchannel'].split('-')
            //     var s = dst[0].slice(4, dst[0].length)

            //     dataModel[key]['dstchannel'] = s

            // }
            
            
        } 

    }

    var df = (req.params.fromDate == 'null') ? helper.dateNow() : req.params.fromDate 
    var dt = (req.params.toDate == 'null') ? helper.dateNow() : req.params.toDate

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(dataModel);

    res.attachment('report-receive-'+df+'_'+dt+'.csv');
    res.status(200).send(csv);

});

router.post('/receive-datatable',  async (req, res, next) => {

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
        ,{ 'db': 'agent_name', 'dt' : 3 }
        ,{ 'db': 'extension', 'dt' : 4 }
        ,{ 'db': 'phone_name', 'dt' : 5 }
        ,{ 'db': 'src', 'dt' : 6 }
        ,{ 'db': 'notes', 'dt' : 7 }
        ,{ 'db': 'billsec', 'dt' : 8 }
        
    ]

    var data = await r_receiveModels.datatable(req, cols)

    res.status(200).json(data)

});

module.exports = router;