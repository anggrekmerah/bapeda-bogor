const mariadb = require('mariadb');
const crud_model = require('../../config/crud_model');
const helper = require('../../config/helper');

const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class r_receiveModel extends crud_model {

    get_data(req) {

        return new Promise((resolve, reject) => {
        
            var df = (req.params.fromDate == 'null') ? helper.dateNow() : req.params.fromDate 
            var dt = (req.params.toDate == 'null') ? helper.dateNow() : req.params.toDate


            df += ' 00:00:00'
            dt += ' 23:59:59'

            const query = `SELECT 
                a.calldate, 
                TIME(a.calldate) AS timecalls,
                a.src,
                a.dstchannel,
                a.disposition,
                a.billsec,
                SUBSTRING_INDEX(SUBSTRING_INDEX(a.dstchannel, '-',1), '/',-1)  AS extension,
                b.phone_name,
                CONCAT(d.first_name, ' ', d.last_name) AS agent_name
                
            FROM ast_bapenda.cdr a
            LEFT JOIN bapenda.m_phone_book b ON b.phone_number = a.src
            LEFT JOIN bapenda.m_extension c ON c.extension = SUBSTRING_INDEX(SUBSTRING_INDEX(dstchannel, '-',1), '/',-1)
            LEFT JOIN bapenda.m_users d ON d.id_extension = c.id_extension
            WHERE calltype = 'Incoming' AND disposition = 'ANSWERED' AND dstchannel != ''  AND calldate BETWEEN '`+df+`' AND '`+dt+`'
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
            dstchannel,
            disposition,
            billsec,
            recid
             
        FROM ast_bapenda.cdr
        WHERE calltype = 'Incoming' AND disposition = 'ANSWERED' AND dstchannel != '' AND calldate BETWEEN '`+df+`' AND '`+dt+`'
        ORDER BY recid desc`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}