const mariadb = require('mariadb');

const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class r_receiveModel {

    datatable(req, cols) {
    
        var d = new Date()

        var df = (req.body.fromDate == '') ? d.toISOString().slice(0,10) : req.body.fromDate 
        var dt = (req.body.toDate == '') ? d.toISOString().slice(0,10) : req.body.toDate


        df += ' 00:00:00'
        dt += ' 23:59:59'

        const query = `SELECT 
            DATE(a.call_date) AS date_call, 
            TIME(a.call_date) AS time_call,
            a.call_number,
            a.call_receive_number,
            b.duration
            
        FROM bapenda.t_incoming_call_log a 
        LEFT JOIN  ast_bapenda.cdr b ON a.caller_id = b.uniqueid
        WHERE a.call_event = 'ANSWER' AND a.call_date BETWEEN '`+df+`' AND '`+dt+`'
        GROUP BY a.caller_id`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}