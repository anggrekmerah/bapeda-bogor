const mariadb = require('mariadb');

const ssp = require('../../config/ssp');
const helper = require('../../config/helper');
const crud_model = require('../../config/crud_model');

const datatable = new ssp();

module.exports = class r_kpiModel extends crud_model {

    getChartKpi(params){

        return new Promise((resolve, reject) => {
            
            
            var sql = `SELECT * FROM (
                SELECT 
                    COUNT(a.caller_id) AS total_receive, 
                    c.first_name, 
                    c.last_name,
                    DAY(a.call_date) AS tanggal,
                    YEAR(CURDATE()) AS tahun,
                MONTHNAME(CURDATE()) AS bulan,
                    a.call_receive_number,
                    c.parent_user,
                    c.id_user 
                FROM bapenda.t_incoming_call_log a
                LEFT JOIN bapenda.m_extension b ON b.extension = a.call_receive_number
                LEFT JOIN bapenda.m_users c ON c.id_extension = b.id_extension 
                WHERE 
                a.call_event = 'ANSWER' 
                AND c.is_agent = 'Y' 
                AND c.active = 'Y' 
                AND b.active = 'Y' 
                AND a.call_date BETWEEN concat(DATE_FORMAT(CURDATE(),'%Y-%m'),'-','01',' ','00:00:00') AND concat(DATE_FORMAT(CURDATE(),'%Y-%m'),'-','31',' ','23:59:59')
                GROUP BY a.call_receive_number, DATE(a.call_date)
                ORDER BY DAY(a.call_date) asc 
            ) z
            , (select @pv := `+params.id+`) initialisation
            where   
                    FIND_IN_SET(z.parent_user, @pv) > 0
                    and @pv := concat(@pv, ',', z.id_user)`
            
            
            this.execQuery(sql, []).then( (res) => {
                
                resolve(res)
                
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }


}