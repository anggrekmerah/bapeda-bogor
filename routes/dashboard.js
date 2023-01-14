var express = require('express');
const dashboardModel = require('../models/dashboard/dashboardModel');
var router = express.Router();
const helper = require('../config/helper')
require('dotenv').config({path:'../env'})
const env = process.env;

const axios = require('axios');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
var groupMenuModels = new groupMenuModel()
const dashboardModels = new dashboardModel()
const menuId = 11
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

  var counter = await dashboardModels.getAllData()

  var users = await dashboardModels.getUsers({ 'id' : req.session.id_user }) 

  delete counter.meta

  req.renderObjects.controller = 'dashboard'
  req.renderObjects.title = 'Dashboard'
  req.renderObjects.counters = counter
  req.renderObjects.agentList = users
  req.renderObjects.sess = req.session

  // console.log(req.renderObjects)
  
  res.render('dashboard/dashboard', req.renderObjects);

});

router.post('/spy',  async (req, res, next) => {

  // if(!req.session.loggedin)                
  //   res.render('error')

  var config = {
    method: 'post',
    url: 'http://'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels?endpoint=SIP/'+req.session.extension+'&extension=222'+req.body.ext+'&context=bapeda&priority=1',
    headers: { 
      'Authorization': 'Basic QmFwZW5kYTpCYXBlbmRh'
    }
  };

  axios(config)
    .then(function (response) {
      // handle success)
      res.status(200).json({err:false , msg: 'sucess', data:response.data})
    })
    .catch(function (error) {
      // handle error
      res.status(200).json({err:true , msg: error})
    })

});

router.post('/whisp',  async (req, res, next) => {

  // if(!req.session.loggedin)                
  //   res.render('error')

  var config = {
    method: 'post',
    url: 'http://'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels?endpoint=SIP/'+req.session.extension+'&extension=223'+req.body.ext+'&context=bapeda&priority=1',
    headers: { 
      'Authorization': 'Basic QmFwZW5kYTpCYXBlbmRh'
    }
  };

  axios(config)
    .then(function (response) {
      // handle success)
      res.status(200).json({err:false , msg: 'sucess', data:response.data})
    })
    .catch(function (error) {
      // handle error
      res.status(200).json({err:true , msg: error})
    })

});

router.post('/barge',  async (req, res, next) => {

  // if(!req.session.loggedin)                
  //   res.render('error')

  var config = {
    method: 'post',
    url: 'http://'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels?endpoint=SIP/'+req.session.extension+'&extension=224'+req.body.ext+'&context=bapeda&priority=1',
    headers: { 
      'Authorization': 'Basic QmFwZW5kYTpCYXBlbmRh'
    }
  };

  axios(config)
    .then(function (response) {
      // handle success)
      res.status(200).json({err:false , msg: 'sucess', data:response.data})
    })
    .catch(function (error) {
      // handle error
      res.status(200).json({err:true , msg: error})
    })

});

router.post('/chart',  async (req, res, next) => {

  // if(!req.session.loggedin)                
  //   res.render('error')

  var chart = await dashboardModels.getChart()
  var chartTahun = await dashboardModels.getChartTahun() 

  delete chart.meta

  var c = []
  var t = []
  // console.log(chart)
  for (const key in chart) {
   
    c.push({
       'total' : Number(chart[key].total)
      ,'tanggal' : chart[key].tanggal
      ,'call_event' : chart[key].call_event
      ,'tahun' : Number(chart[key].tahun)
      ,'bulan' : chart[key].bulan
    })

  }

  for (const k in chartTahun) {
   
    if(chartTahun[k].total != null){

      t.push({
        'total' : Number(chartTahun[k].total)
        ,'tanggal' : chartTahun[k].tanggal
        ,'call_event' : chartTahun[k].call_event
        ,'tahun' : Number(chartTahun[k].tahun)
        ,'bulan' : Number(chartTahun[k].bulan)
      })
      
    }

  }

  res.status(200).json({
    err:false , 
    msg: 'sucess', 
    data: {
      'bulan' : c,
      'tahun' : t
    }
  })
  
  // res.status(200).json({err:true , msg: error})

});

module.exports = router;
