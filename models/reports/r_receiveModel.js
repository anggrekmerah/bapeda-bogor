const mariadb = require('mariadb');
const crud_model = require('../../config/crud_model');
const helper = require('../../config/helper');

const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class r_receiveModel extends crud_model {

    get_data(req) {

        return new Promise((resolve, reject) => {
        
            var df = (req.params.fromDate == '') ? helper.dateNow() : req.params.fromDate 
            var dt = (req.params.toDate == '') ? helper.dateNow() : req.params.toDate


            df += ' 00:00:00'
            dt += ' 23:59:59'

            const query = `SELECT 
                a.call_date AS datecalls, 
                TIME(a.call_date) AS timecalls,
                a.call_number,
                a.call_receive_number,
                b.duration
                
            FROM bapenda.t_incoming_call_log a 
            LEFT JOIN  ast_bapenda.cdr b ON a.caller_id = b.uniqueid
            WHERE a.call_event = 'ANSWER' AND a.call_date BETWEEN '`+df+`' AND '`+dt+`'
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
            a.call_date AS datecalls, 
            TIME(a.call_date) AS timecalls,
            a.call_number,
            a.call_receive_number,
            b.duration,
            a.id
            
        FROM bapenda.t_incoming_call_log a 
        LEFT JOIN  ast_bapenda.cdr b ON a.caller_id = b.uniqueid
        WHERE a.call_event = 'ANSWER' AND a.call_date BETWEEN '`+df+`' AND '`+dt+`'
        GROUP BY a.caller_id
        ORDER BY a.id desc`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}