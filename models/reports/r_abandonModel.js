const mariadb = require('mariadb');

const ssp = require('../../config/ssp');
const helper = require('../../config/helper');
const crud_model = require('../../config/crud_model');

const datatable = new ssp();

module.exports = class r_abandonModel extends crud_model {

    get_data(req) {

        return new Promise((resolve, reject) => {
        
            var df = (req.params.fromDate == 'null') ? helper.dateNow() : req.params.fromDate 
            var dt = (req.params.toDate == 'null') ? helper.dateNow() : req.params.toDate


            df += ' 00:00:00'
            dt += ' 23:59:59'

            const query = `SELECT 
                a.call_date AS date_call, 
                TIME(a.call_date) AS time_call,
                a.call_number,
                a.call_receive_number,
                b.duration
                
            FROM bapenda.t_incoming_call_log a 
            LEFT JOIN  ast_bapenda.cdr b ON a.caller_id = b.uniqueid
            WHERE a.call_event IN('NOANSWER','BUSY','CANCEL') calltype = 'Incoming' AND a.call_date BETWEEN '`+df+`' AND '`+dt+`'
            GROUP BY a.caller_id
            ORDER BY a.id desc`

            console.log(query)
    
            this.execQuery(query, []).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    datatable(req, cols) {
    
        var df = (req.body.fromDate == '') ? helper.dateNow() : req.body.fromDate 
        var dt = (req.body.toDate == '') ? helper.dateNow() : req.body.toDate


        df += ' 00:00:00'
        dt += ' 23:59:59'

        const query = `SELECT 
            a.call_date AS date_call, 
            TIME(a.call_date) AS time_call,
            a.call_number,
            a.call_receive_number,
            b.duration,
            a.id
            
        FROM bapenda.t_incoming_call_log a 
        LEFT JOIN  ast_bapenda.cdr b ON a.caller_id = b.uniqueid
        WHERE a.call_event IN('NOANSWER','BUSY','CANCEL') AND b.calltype = 'Incoming' AND a.call_date BETWEEN '`+df+`' AND '`+dt+`'
        GROUP BY a.caller_id
        ORDER BY a.id desc`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}