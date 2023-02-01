const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const helper = require('../../config/helper');

module.exports = class dashboardModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 't_counter'
        this.prmaryKey = 'id_counter'

    }

    getAllData(){

        return new Promise((resolve, reject) => {
        
            var params = {
                 table : this.tableName
                ,id_field : this.prmaryKey
                ,order : 'asc'
            }

            this.getAll(params).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    getChart(){

        return new Promise((resolve, reject) => {
            
            
            var sql = `SELECT 
                    COUNT(*) AS total
                    , DAY(a.call_date) AS tanggal
                    , a.call_event
                    , YEAR(CURDATE()) AS tahun
                    , MONTHNAME(CURDATE()) AS bulan
                FROM t_incoming_call_log a 
                WHERE a.call_date BETWEEN concat(DATE_FORMAT(CURDATE(),'%Y-%m'),'-','01',' ','00:00:00') AND concat(DATE_FORMAT(CURDATE(),'%Y-%m'),'-','31',' ','23:59:59') 
                GROUP BY DAY(a.call_date), a.call_event`
            
            
            this.execQuery(sql, []).then( (res) => {
                
                resolve(res)
                
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    getChartTahun(){

        return new Promise((resolve, reject) => {
            
            
            var sql = `SELECT 
                COUNT(*) AS total
                , DAY(a.call_date) AS tanggal
                , a.call_event
                , YEAR(CURDATE()) AS tahun
                , MONTH(CURDATE()) AS bulan
            FROM t_incoming_call_log a 
            WHERE a.call_date BETWEEN concat(DATE_FORMAT(CURDATE(),'%Y-01'),'-','01',' ','00:00:00') AND concat(DATE_FORMAT(CURDATE(),'%Y-12'),'-','31',' ','23:59:59') 
            GROUP BY month(a.call_date), if(a.call_event = 'BUSY' , 'NOANSWER', a.call_event)`
            
            
            this.execQuery(sql, []).then( (res) => {
                
                resolve(res)
                
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    getAgentCall(){

        return new Promise((resolve, reject) => {
            
            var sql = `SELECT a.call_number, a.call_receive_number as ext, IF( b.phone_name IS NULL , 'Unknown', b.phone_name) AS phone_name, b.notes 
            FROM t_incoming_call_tmp a
            LEFT JOIN m_phone_book b ON a.call_number = b.phone_number`
            
    
            this.execQuery(sql, []).then( (res) => {
                
                delete res.meta
                
                resolve( res )

            
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }
    

    getUsers(params){

        return new Promise((resolve, reject) => {
            
            if(params.id == 2){

                var sql = `select a.*, b.extension,
                (
                    SELECT COUNT(*) FROM t_incoming_call_log WHERE call_receive_number = b.extension AND call_date BETWEEN CONCAT (DATE(NOW()),' 00:00:00') AND CONCAT (DATE(NOW()),' 23:59:59') 
                ) AS total_receive  
                from m_users a 
                left join m_extension b on a.id_extension = b.id_extension and b.active = ? 
                where a.active = ? and a.is_agent = ?`
                
                var bindings = ['Y','Y','Y']
            } else {

                var i = (params.id == undefined) ? 0 : params.id
                var sql = 'CALL bapenda.agent_dashboard_role('+i+')'
                
                var bindings = []

            }

            this.execQuery(sql, bindings).then( (res) => {
                
                var html = ''

                if(helper.isArray(res[0])) {

                    delete res[0].meta

                    for (const key in res[0]) {
                    
                        html += helper.dashboardAgent(res[0][key]) 
    
                    }
                    
                    resolve( html )

                } else {

                    delete res.meta

                    for (const key in res) {
                    
                        html += helper.dashboardAgent(res[key]) 
    
                    }

                    resolve( html )

                }
                
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    getDataById(id) {
        
        return new Promise((resolve, reject) => {
        
            var params = {
                table : this.tableName
                ,id_key :  this.prmaryKey
                ,id_value : id
            }

            this.getById(params).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }


}