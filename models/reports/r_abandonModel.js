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
                calldate, 
                TIME(calldate) AS timecalls,
                src as source,
                billsec as duration
                
            FROM ast_bapenda.cdr
            WHERE calltype = 'Incoming' AND ( disposition IN( 'NO ANSWER', 'BUSY') OR dstchannel = '' ) AND calldate BETWEEN '`+df+`' AND '`+dt+`'
            GROUP BY uniqueid
            ORDER BY recid desc` 

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
            calldate, 
            TIME(calldate) AS timecalls,
            src,
            dst,
            disposition,
            billsec,
            recid
            
        FROM ast_bapenda.cdr
        WHERE calltype = 'Incoming' AND ( disposition IN( 'NO ANSWER', 'BUSY') OR dstchannel = '' ) AND calldate BETWEEN '`+df+`' AND '`+dt+`'
        GROUP BY uniqueid
        ORDER BY recid desc`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}