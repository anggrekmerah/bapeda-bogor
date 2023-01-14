var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

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

router.post('/abandon-datatable',  async (req, res, next) => {

    // if(!req.session.loggedin)   {  
    //     res.render('error')
    //     return false
    // }

    // var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
         { 
            'db': 'id', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 
            'db': 'date_call', 
            'dt' : 1,
            'formatter' : function (d, row) {
                return row.date_call.toISOString().slice(0,10)
            }
        }
        ,{ 'db': 'time_call', 'dt' : 2 }
        ,{ 'db': 'call_number', 'dt' : 3 }
        ,{ 'db': 'call_receive_number', 'dt' : 4 }
        ,{ 'db': 'duration', 'dt' : 5 }
       
    ]

    var data = await r_abandonModels.datatable(req, cols)

    res.status(200).json(data)

});

module.exports = router;