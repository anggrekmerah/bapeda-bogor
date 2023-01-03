var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { io } = require("socket.io-client");
const helper = require('../config/helper');
const userModel = require('../models/user/userModels');
var bcrypt = require('bcryptjs');
var amis = require('asterisk-manager')

require('dotenv').config({path:'.env'})

const env = process.env;

var userModels = new userModel()

const socket = io('http://localhost:3000',{
    transports: ["websocket", "polling"] // use WebSocket first, if available
});

/* GET home page. */
router.get('/',  async (req, res, next) => {

    let flashMessage = await helper.flashMessage(req, userModels, { username : '' } )
    
    req.renderObjects.alert = flashMessage

    res.render('auth/form-auth', req.renderObjects);

});

router.get('/logout',  async (req, res, next) => {

    var amiManager = new amis(env.AMI_PORT, env.AMI_HOST, env.AMI_USER, env.AMI_PASS, true);

    var queueOut  ={
        'action':'QueueRemove',
        "queue": 'qbapenda',
        "interface": 'SIP/'+req.session.extension
    }
    
    console.log(queueOut)
    
    amiManager.action(queueOut, async (err, ress) => {
        
        if(ress.response == 'Success'){
             
            var update_users = await userModels.execQuery("update m_users set last_logout = ? , active_login = ? where email = ? ",[new Date(), 'N', req.session.email])

            socket.emit('userLogOut', {element : helper.dashboardAgent({
                active_login : 'N'
               ,in_call : 'N'
               ,extension : req.session.extension
               ,photo : req.session.photo
               ,first_name : req.session.firstName
               ,last_name : req.session.lastName
               ,total_receive : 0
           }), extension : req.session.extension})

            req.session.destroy()

            res.redirect('/auth')

        }
        
    });

});

router.post('/authenticate', body('username').not().isEmpty(), body('password').not().isEmpty(), async (req, res, next) => {

    var amiManager = new amis(env.AMI_PORT, env.AMI_HOST, env.AMI_USER, env.AMI_PASS, true);

    var sql = `select a.*, b.extension, 
    (
        SELECT COUNT(*) FROM t_incoming_call_log WHERE call_receive_number = b.extension AND call_date BETWEEN CONCAT (DATE(NOW()),' 00:00:00') AND CONCAT (DATE(NOW()),' 23:59:59') 
    ) AS total_receive 
    from m_users a 
    left join m_extension b on a.id_extension = b.id_extension 
    where a.email = ? and a.active = ?`

    var users = await userModels.execQuery(sql,[req.body.username, 'Y'])
     
    if( '0' in users) {

        delete users.meta

        var data_user = users[0]

       
        var validate = bcrypt.compareSync(req.body.password, data_user.password); // true

        if(validate) {

            if(data_user.is_agent == 'Y') {
                
                var queueIn  ={
                    'action':'QueueAdd',
                    'queue': 'qbapenda',
                    'interface': 'SIP/'+data_user.extension,
                    'penalty': 1,
                    'paused': 'no',
                    'membername' : 'Bapenda CC',
                    'stateinterface' : 'SIP/'+data_user.extension
                }
                console.log(queueIn)
                
                amiManager.action(queueIn, async (err, ress) => {
                   
                    console.log(ress)
    
                    if(ress.response == 'Success') {
    
                        req.session.loggedin = true
                        req.session.groupId = data_user.id_group
                        req.session.extension = data_user.extension
                        req.session.email = data_user.email
                        req.session.firstName = data_user.first_name
                        req.session.lastName = data_user.last_name
                        req.session.ages = data_user.ages
                        req.session.photo = data_user.photo
                        req.session.parentUser = data_user.parent_user
                        req.session.id_user = data_user.id_user
                        
                        socket.emit('userLogin', {element : helper.dashboardAgent({
                             active_login : 'Y'
                            ,in_call : 'N'
                            ,extension : data_user.extension
                            ,photo : data_user.photo
                            ,first_name : data_user.first_name
                            ,last_name : data_user.last_name
                            ,total_receive : data_user.total_receive
                        }), extension : data_user.extension})
    
                        var update_users = await userModels.execQuery("update m_users set last_login = ? , active_login = ? where email = ? ",[new Date(), 'Y', req.body.username])
    
                        res.redirect('/dashboard');
                        
                    } else {
    
                        req.session.resultMessage = helper.MessageFailed(ress.message)
    
                        res.redirect('/auth');
    
                    }
    
                });

            } else {

                req.session.loggedin = true
                req.session.groupId = data_user.id_group
                req.session.extension = data_user.extension
                req.session.email = data_user.email
                req.session.firstName = data_user.first_name
                req.session.lastName = data_user.last_name
                req.session.ages = data_user.ages
                req.session.photo = data_user.photo
                req.session.parentUser = data_user.parent_user
                req.session.id_user = data_user.id_user
                
                socket.emit('userLogin', {element : helper.dashboardAgent({
                        active_login : 'Y'
                    ,in_call : 'N'
                    ,extension : data_user.extension
                    ,photo : data_user.photo
                    ,first_name : data_user.first_name
                    ,last_name : data_user.last_name
                    ,total_receive : data_user.total_receive
                }), extension : data_user.extension})

                var update_users = await userModels.execQuery("update m_users set last_login = ? , active_login = ? where email = ? ",[new Date(), 'Y', req.body.username])

                res.redirect('/dashboard');
                

            }
            

        } else {

            req.session.resultMessage = helper.MessageFailed('Username or Password Failed')

            res.redirect('/auth');

        }

    } else {

        req.session.resultMessage = helper.MessageFailed('Username Not Found')

        res.redirect('/auth');

    }

});


module.exports = router;
