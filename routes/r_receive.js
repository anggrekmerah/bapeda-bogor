var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

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

router.post('/receive-datatable',  async (req, res, next) => {

    // if(!req.session.loggedin)   {  
    //     res.render('error')
    //     return false
    // }

    // var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)
    console.log('ok')
    var cols = [
         { 
            'db': 'id', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 
            'db': 'datecalls', 
            'dt' : 1,
            'formatter' : function (d, row) {
                return row.datecalls.toISOString().slice(0,10)
            }
        }
        ,{ 'db': 'timecalls', 'dt' : 2 }
        ,{ 'db': 'call_number', 'dt' : 3 }
        ,{ 'db': 'call_receive_number', 'dt' : 4 }
        ,{ 'db': 'duration', 'dt' : 5 }
       
    ]

    var data = await r_receiveModels.datatable(req, cols)

    res.status(200).json(data)

});

module.exports = router;