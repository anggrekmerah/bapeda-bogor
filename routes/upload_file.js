var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const fs = require('fs');

const uploadFileModel = require('../models/upload/uploadFileModel')
const helper = require('../config/helper');
const groupMenuModel = require('../models/group_menu/groupMenuModel');
const path = require("path");

var controllerName = 'upload_file'
var uploadFileModels = new uploadFileModel()
var groupMenuModels = new groupMenuModel()
const menuId = 29

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.dirname(path.dirname(__filename)) + '/public/document/')
  },
  size: function (req, file, cb) {
    cb(null, 500000000)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replaceAll(' ','-') )
  }
})

const upload = multer({storage })

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


    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Upload FIle'
    req.renderObjects.sess = req.session
    req.renderObjects.btnadd = (checkAccessPage.can_insert == 'Y') ? true : false

  res.render('upload/uploadFile', req.renderObjects );

});

router.get('/delete/:id_document',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var inActiveGroup = await uploadFileModels.inActive(req)

    res.redirect('/upload');

});

router.get('/datatable',  async (req, res, next) => {

    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)

    var cols = [
         { 
            'db': 'id_document', 
            'dt' : 0,
            'formatter' : function( d, row ) {

                return Number(row.nomor)
            }
        }
        ,{ 'db': 'document', 'dt' : 1 }
        ,{ 
            'db': 'user_created', 
            'dt' : 2,
            'formatter' : function( d, row ) {
                var created_datetime = new Date(row.created_datetime).toISOString().split('T')
                return row.created_by + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
            }
        }
        ,{ 
            'db': 'user_updated', 
            'dt' : 3,
            'formatter' : function( d, row ) {

                var update_datetime = new Date(row.update_datetime).toISOString().split('T')
                return row.updated_by + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 
 
            }
        }
        ,{ 
            'db': 'update_datetime', 
            'dt' : 4, 
            'formatter' : function( d, row ) {
                
                var btnEdit =  (checkAccessPage && checkAccessPage.can_update == 'Y') ? helper.btnEdit('/upload/add?id='+row.id_document) : ''
                var btnDelete =  (checkAccessPage && checkAccessPage.can_delete == 'Y') ? helper.btnDelete('/upload/delete/'+row.id_document) : ''
                var btnDownload =  helper.btnDownload('/upload/preview/'+row.id_document)
                var btnView =  helper.btnModalView('Description of ' + row.document, row.descriptions)
               
                var html = ''
                    html += '<div class="btn-group" role="group" aria-label="Basic example">'
                    html += btnEdit  
                    html += btnDelete
                    html += btnDownload
                    html += btnView
                    html += '</div>'
                
                return html;
            }
        }
    ]

    var data = await uploadFileModels.datatable(req, cols)

    res.status(200).json(data)

});

router.get('/add',  async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    var checkAccessPage = await helper.checkAccessPage({id_group:req.session.groupId, id_menu : menuId}, groupMenuModels)
    if(!checkAccessPage){  
        res.render('error_cannot_access')
        return false
    }
    // console.log(checkAccessPage)
    var data_update = { document : '', descriptions : '' }

    if(req.session.dataUpdate){

        data_update.document = req.session.dataUpdate.document
        data_update.descriptions = req.session.dataUpdate.descriptions
     
    }
    
    let flashMessage = await helper.flashMessage(req, uploadFileModels, data_update )
    
    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Upload File'
    req.renderObjects.alert = flashMessage
    req.renderObjects.sess = req.session
   

    res.render('upload/add', req.renderObjects );
  
});

router.post('/save',  
    upload.single('document')
,async (req, res, next) => {
  
    
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        req.session.dataUpdate = req.body
        res.redirect('/upload/add');
        return false
    }

    if('file' in req)
        req.body.fileName = req.file.originalname.replaceAll(' ','-')


    var saveDocument = await uploadFileModels.insertDataIgnore(req)

    req.session.resultMessage = (saveDocument) ? helper.MessageSuccess('Success upload') : helper.MessageFailed('Failed upload')

    res.redirect('/upload/add');

});

router.post('/update/:id',  
    upload.single('document')
,async (req, res, next) => {
  
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.resultMessage = errors.array()
        req.session.dataUpdate = req.body
        res.redirect('/upload/add?id=' + req.params.id);
        return false
    }
    
    if('file' in req)
        req.body.fileName = req.file.originalname.replaceAll(' ','-')


    var saveDocument = await uploadFileModels.update_data(req)

    req.session.resultMessage = (saveDocument) ? helper.MessageSuccess('Success upload') : helper.MessageFailed('Failed upload')

    res.redirect('/upload');

});

router.get('/preview/:id', async function(req, res, next) {
    
    if(!req.session.loggedin)   {  
        res.render('error')
        return false
    }
    
    const dataModel = await uploadFileModels.getDataById(req.params.id)

    delete dataModel.meta


    var stream = '';
    var filename = '';
    var stat = '';


    if(dataModel.length > 0) {

        for (const key in dataModel) {
            
            filename = dataModel[key]['document'];
            stream = fs.readFileSync('/home/bapeda-bogor/public/document/' + filename);
            stat = fs.statSync('/home/bapeda-bogor/public/document/' + filename)
        } 

    }

    if(stream != '') {
        console.log(filename)
        filename = encodeURIComponent(filename);
        // Ideally this should strip them
    
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
    
        res.send(stream);
        
    } else {
        res.redirect('/upload');
    }
    
    

  });

module.exports = router;
