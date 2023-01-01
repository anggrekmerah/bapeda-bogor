var express = require('express');
const dashboardModel = require('../models/dashboard/dashboardModel');
var router = express.Router();

require('dotenv').config({path:'../env'})
const env = process.env;

const axios = require('axios');

var dashboardModels = new dashboardModel()

/* GET home page. */
router.get('/',  async (req, res, next) => {

  if(!req.session.loggedin)                
    res.render('error')

  var counter = await dashboardModels.getAllData()

  var users = await dashboardModels.getUsers()

  delete counter.meta

  req.renderObjects.controller = 'dashboard'
  req.renderObjects.title = 'Dashboard'
  req.renderObjects.counters = counter
  req.renderObjects.agentList = users

  res.render('dashboard/dashboard', req.renderObjects);

});

router.post('/spy',  async (req, res, next) => {

  // if(!req.session.loggedin)                
  //   res.render('error')

  axios.post('http://'+env.ARI_USER+':'+env.ARI_PASS+'@'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels/'+req.body.channel+'/snoop?spy=out&whisper=none&app=Voipstasis')
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

    axios.post('http://'+env.ARI_USER+':'+env.ARI_PASS+'@'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels/'+req.body.channel+'/snoop?spy=none&whisper=out&app=Voipstasis')
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

    axios.post('http://'+env.ARI_USER+':'+env.ARI_PASS+'@'+env.ARI_HOST+':'+env.ARI_PORT+'/ari/channels/'+req.body.channel+'/snoop?spy=both&whisper=both&app=Voipstasis')
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
