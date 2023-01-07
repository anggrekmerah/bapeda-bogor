const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class userModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_users'
        this.prmaryKey = 'id_user'

    }

    getListParent(){

        return new Promise((resolve, reject) => {
        
            var sql = `SELECT a.id_user, a.first_name, a.last_name, b.group_name FROM m_users a
            LEFT JOIN m_group b ON a.id_group = b.id_group 
            where a.active = ? AND b.group_name IS NOT NULL AND b.id_group != ? and a.is_agent = ?`

            this.execQuery(sql,['Y','7','N']).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    getListExtension(){

        return new Promise((resolve, reject) => {
        
            var sql =`SELECT a.extension, a.id_extension FROM m_extension a
            LEFT JOIN m_users b ON b.id_extension = a.id_extension 
            WHERE a.active = ? AND b.id_extension IS null`

            this.execQuery(sql,['Y','7','N']).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })
        
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
                    ('fileName' in body) ? body.fileName : '',
                    body.extensionId, 
                    body.username, 
                    body.firstName, 
                    body.lastName,
                    body.ages,
                    body.isAgent,
                    1,
                    new Date()]
                , table : this.tableName
                , fields : 'parent_user, password, id_group, photo, id_extension, email, first_name, last_name, ages, is_agent, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    insertDataIgnore( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [
                  body.parentUser,
                  body.passHash, 
                  body.groupId, 
                  ('fileName' in body) ? body.fileName : '',
                  body.extensionId, 
                  body.username, 
                  body.firstName, 
                  body.lastName,
                  body.ages,
                  body.isAgent,
                  1,
                  new Date()]
              , table : this.tableName
              , search : {'email' : body.username}
              , fields : 'parent_user, password, id_group, photo, id_extension, email, first_name, last_name, ages, is_agent, user_created, created_datetime'
            }

            this.saveDataIgnore(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })

    }

    inActive( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : body.userId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    update_data( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                     'parent_user':req.body.parentUser
                    ,'password':req.body.passHash
                    ,'id_group':req.body.groupId
                    ,'photo':('fileName' in req.body) ? req.body.fileName : ''
                    ,'id_extension':req.body.extensionId
                    ,'email':req.body.username
                    ,'first_name':req.body.firstName
                    ,'last_name':req.body.lastName
                    ,'ages':req.body.ages
                    ,'is_agent':req.body.isAgent
                    ,'update_datetime' : new Date()
                    ,'user_updated' : 1
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.query.id
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    datatable(req, cols) {

        const query = `select a.*, b.group_name , c.extension
        from ${this.tableName} a 
        left join m_group b on a.id_group = b.id_group  
        left join m_extension c on c.id_extension = a.id_extension
        where a.active = "Y" order by ${this.prmaryKey} asc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}