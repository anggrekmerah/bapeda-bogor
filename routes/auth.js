var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const helper = require('../config/helper');
const userModel = require('../models/user/userModels');
var bcrypt = require('bcryptjs');

var userModels = new userModel()

/* GET home page. */
router.get('/',  async (req, res, next) => {

    let flashMessage = await helper.flashMessage(req, userModels, { username : '' } )
    
    req.renderObjects.alert = flashMessage

    res.render('auth/form-auth', req.renderObjects);

});

router.post('/authenticate', body('username').not().isEmpty(), body('password').not().isEmpty(), async (req, res, next) => {

    var users = await userModels.execQuery("select * from bapenda.m_users where email = ? and active = ?",[req.body.username, 'Y'])
     
    if( '0' in users) {

        delete users.meta

        var data_user = users[0]

        var validate = bcrypt.compareSync(req.body.password, data_user.password); // true

        if(validate) {

            req.session.loggedin = true
            req.session.groupId = data_user.id_group
            req.session.extensionId = data_user.id_extension
            req.session.email = data_user.email
            req.session.firstName = data_user.first_name
            req.session.lastName = data_user.last_name
            req.session.ages = data_user.ages
            req.session.parentUser = data_user.parent_user
            
            res.redirect('/dashboard');

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
