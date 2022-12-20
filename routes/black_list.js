var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const phoneBookModel = require('../models/phone_book/phoneBookModel');

var phoneBookModels = new phoneBookModel()

var controllerName = 'black_list'


/* GET home page. */
router.get('/',  async (req, res, next) => {

    req.renderObjects.controller = controllerName
    req.renderObjects.title = 'Number Black List'

  res.render('black_list/black_list', req.renderObjects );

});


router.get('/datatable',  async (req, res, next) => {

    var cols = [
        { 
           'db': 'id_phone_book', 
           'dt' : 0,
           'formatter' : function( d, row ) {

               return Number(row.nomor)

           }
       }
       ,{ 'db': 'phone_name', 'dt' : 1 }
       ,{ 'db': 'phone_number', 'dt' : 2 }
       ,{ 'db': 'notes', 'dt' : 3 }
       ,{ 
           'db': 'user_created', 
           'dt' : 4,
           'formatter' : function( d, row ) {
               var created_datetime = new Date(row.created_datetime).toISOString().split('T')
               return row.user_created + ' <small style="font-size:11px">(' + created_datetime[0] +' '+ created_datetime[1].slice(0, 8)  + ')</small>' 
           }
       }
       ,{ 
           'db': 'user_updated', 
           'dt' : 5,
           'formatter' : function( d, row ) {

               var update_datetime = new Date(row.update_datetime).toISOString().split('T')
               return row.user_updated + ' <small style="font-size:11px">(' + update_datetime[0] +' '+ update_datetime[1].slice(0, 8)  + ')</small>' 

           }
       }
       ,{ 
           'db': 'update_datetime', 
           'dt' : 6, 
           'formatter' : function( d, row ) {
               
               var html = ''
                   html += '<div class="btn-group" role="group" aria-label="Basic example">'
                   html += '    <a href="/phone-book/activate/'+row.id_phone_book+'" class="btn btn-success btn-sm " data-bs-toggle="tooltip" data-bs-placement="right" title="Activate"><i class="fas fa-check"></i></a> '
                   html += '</div>'
               
               return html;
           }
       }
   ]

   var data = await phoneBookModels.datatable(req, cols, 'N')
    
    res.status(200).send(data)

});


module.exports = router;
