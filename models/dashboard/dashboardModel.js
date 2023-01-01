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

    getUsers(){

        return new Promise((resolve, reject) => {
        
            var sql = `select a.*, b.extension,
            (
                SELECT COUNT(*) FROM t_incoming_call_log WHERE call_receive_number = b.extension AND call_date BETWEEN CONCAT (DATE(NOW()),' 00:00:00') AND CONCAT (DATE(NOW()),' 23:59:59') 
            ) AS total_receive  
            from m_users a 
            left join m_extension b on a.id_extension = b.id_extension and b.active = ? 
            where a.active = ? `

            this.execQuery(sql, ['Y','Y']).then( (res) => {
            
                delete res.meta

                var html = ''

                for (const key in res) {
                    
                    html += helper.dashboardAgent(res[key])

                }
                
                resolve( html )
        
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