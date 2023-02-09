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
                date(a.calldate) as \`Date\`, 
                TIME(a.calldate) AS \`Time\`,
                CONCAT(d.first_name, ' ', d.last_name) AS 'Agent_Name',
                SUBSTRING_INDEX(SUBSTRING_INDEX(a.dstchannel, '-',1), '/',-1)  AS 'Agent_Ext',
                b.phone_name as 'WP_Name',
                a.src as 'WP_Phone',
                b.notes as 'Description',
                a.billsec as 'Duration_(second)'
                
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
            a.calldate, 
            TIME(a.calldate) AS timecalls,
            CONCAT(d.first_name, ' ', d.last_name) AS agent_name,
            SUBSTRING_INDEX(SUBSTRING_INDEX(a.dstchannel, '-',1), '/',-1)  AS extension,
            b.phone_name,
            a.src,
            b.notes,
            a.billsec,
            a.recid
            
        FROM ast_bapenda.cdr a
        LEFT JOIN bapenda.m_phone_book b ON b.phone_number = a.src
        LEFT JOIN bapenda.m_extension c ON c.extension = SUBSTRING_INDEX(SUBSTRING_INDEX(dstchannel, '-',1), '/',-1)
        LEFT JOIN bapenda.m_users d ON d.id_extension = c.id_extension
        WHERE calltype = 'Incoming' AND disposition = 'ANSWERED' AND dstchannel != '' AND calldate BETWEEN '`+df+`' AND '`+dt+`'
        GROUP BY a.calldate
        ORDER BY recid desc`

        console.log(query)

        return datatable.simple(query, req, 'a.id', cols)

    }

}