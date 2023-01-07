const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');


module.exports = class websocketModel extends crud_model  {

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

    insertData( value ) {

        return new Promise((resolve, reject) => {

            console.log(value)

            var params = {
                  values : value
                , table : 't_incoming_call_log'
                , fields : 'caller_id, peer_id, call_event, call_date, call_number, call_receive_number'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }


    update_counter( id_counter ) {

        return new Promise((resolve, reject) => {

            var sql = 'UPDATE t_counter '
	
                sql += ' set call_counter = if(update_date < CURDATE() , 1, call_counter + 1), update_date = CURDATE() '
                sql += ' WHERE id_counter = ? '

            console.log(sql)

            this.execQuery(sql, [ id_counter ]).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    update_incall( ext, isCall = 'N' ) {

        return new Promise((resolve, reject) => {

            var sql = 'UPDATE m_users a'
                sql += 'INNER JOIN m_extension b ON a.id_extension = b.id_extension'
                sql += ' set in_call = ?, incall_datetime = now() '
                sql += ' WHERE extension = ? '

            console.log(sql)

            this.execQuery(sql, [ isCall, ext ]).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    check_phone_number( phoneNumber ) {

        return new Promise((resolve, reject) => {

            this.execQuery('select * from m_phone_book where phone_number = ? ', [ phoneNumber ]).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

}