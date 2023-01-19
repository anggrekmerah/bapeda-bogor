var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const r_kpiModel = require('../models/reports/r_kpiModel');

var controllerName = 'r_kpi'
var groupMenuModels = new groupMenuModel()

var r_kpiModels = new r_kpiModel()

const menuId = 19

/* GET home page. */
router.get('/kpi-call',  async (req, res, next) => {

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
    req.renderObjects.title = 'Report KPI Call Frequency'
    req.renderObjects.sess = req.session
    res.render('reports/kpi', req.renderObjects );

});

router.post('/chart',  async (req, res, next) => {

    // if(!req.session.loggedin)                
    //   res.render('error')
  
    var chart = await r_kpiModels.getChartKpi({id : 25})
  
    delete chart.meta
  
    var c = []
    for (const key in chart) {
     
      c.push({
         'total_receive' : Number(chart[key].total_receive)
        ,'tanggal' : chart[key].tanggal
        ,'call_receive_number' : chart[key].call_receive_number
        ,'tahun' : Number(chart[key].tahun)
        ,'bulan' : chart[key].bulan
        ,'user' : chart[key].first_name +' '+chart[key].last_name
      })
  
    }
  
    res.status(200).json({
      err:false , 
      msg: 'sucess', 
      data: c
    })
    
    // res.status(200).json({err:true , msg: error})
  
  });

module.exports = router;