var express = require('express');
const dashboardModel = require('../models/dashboard/dashboardModel');
var router = express.Router();

require('dotenv').config({path:'../env'})
const env = process.env;

const axios = require('axios');

var dashboardModels = new dashboardModel()

/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)   {  
    res.render('error')
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

  console.log(req.renderObjects)
  
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

module.exports = router;
