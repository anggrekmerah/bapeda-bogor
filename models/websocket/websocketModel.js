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

    insertData( body ) {

        return new Promise((resolve, reject) => {

            console.log(body)

            var params = {
                  values : [
                    body.parentUser,
                    body.passHash, 
                    body.groupId, 
                    body.fileName,
                    body.extensionId, 
                    body.username, 
                    body.firstName, 
                    body.lastName,
                    body.ages,
                    1,
                    new Date()]
                , table : this.tableName
                , fields : 'parent_user, password, id_group, photo, id_extension, email, first_name, last_name, ages, user_created, created_datetime'
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