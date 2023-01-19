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

    getListParent(currentParent){

        return new Promise((resolve, reject) => {
        
            var sql = `SELECT a.id_user, a.first_name, a.last_name, b.group_name FROM m_users a
            LEFT JOIN m_group b ON a.id_group = b.id_group and b.active = 'Y'
            where a.active = ? AND b.group_name IS NOT NULL AND b.id_group != ? and a.is_agent = ?`

            if(currentParent != '' && currentParent != null)
                sql += ` or a.id_user = ` + currentParent

            console.log(sql)

            this.execQuery(sql,['Y','7','N']).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => { 
                
                reject (err)
        
            })
        
        })

    }

    getListExtension(currentExt){

        return new Promise((resolve, reject) => {
        
            var sql =`SELECT a.extension, a.id_extension FROM m_extension a
            LEFT JOIN m_users b ON b.id_extension = a.id_extension AND b.active = 'Y'
            WHERE a.active = ? AND b.id_extension IS null ` 
            
            if(currentExt != '' && currentExt != null)
                sql += `or a.id_extension = `+ currentExt

            console.log(sql)

            this.execQuery(sql,['Y']).then( (res) => {
            
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

    insertData( req ) {

        return new Promise((resolve, reject) => {

            // console.log(req)

            var params = {
                  values : [
                    req.body.parentUser,
                    req.body.passHash, 
                    req.body.groupId, 
                    ('fileName' in req.body) ? req.body.fileName : '',
                    req.body.extensionId, 
                    req.body.username, 
                    req.body.firstName, 
                    req.body.lastName,
                    req.body.ages,
                    req.body.isAgent,
                    req.session.id_user,
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

    insertDataIgnore( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [
                  req.body.parentUser,
                  req.body.passHash, 
                  req.body.groupId, 
                  ('fileName' in req.body) ? req.body.fileName : '',
                  req.body.extensionId, 
                  req.body.username, 
                  req.body.firstName, 
                  req.body.lastName,
                  req.body.ages,
                  req.body.isAgent,
                  req.session.id_user,
                  new Date()]
              , table : this.tableName
              , search : {'email' : req.body.username, 'active' : 'Y'}
              , fields : 'parent_user, password, id_group, photo, id_extension, email, first_name, last_name, ages, is_agent, user_created, created_datetime'
            }

            this.saveDataIgnore(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })

    }

    inActive( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.userId
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

            var s = {
                'parent_user':req.body.parentUser
               ,'id_group':req.body.groupId
               ,'photo':('fileName' in req.body) ? req.body.fileName : ''
               ,'id_extension':req.body.extensionId
               ,'email':req.body.username
               ,'first_name':req.body.firstName
               ,'last_name':req.body.lastName
               ,'ages':req.body.ages
               ,'is_agent':req.body.isAgent
               ,'update_datetime' : new Date()
               ,'user_updated' : req.session.id_user
             }

             if('passHash' in req.body)
                s['password'] = req.body.passHash

            var params = {
                  sets : s
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

    update_profile( req ) {

        return new Promise((resolve, reject) => {

            var s = {
                'email':req.body.username
               ,'first_name':req.body.firstName
               ,'last_name':req.body.lastName
               ,'ages':req.body.ages
               ,'update_datetime' : new Date()
               ,'user_updated' : req.session.id_user
            }

            if('passHash' in req.body)
                s['password'] = req.body.passHash

            if('fileName' in req.body)
                s['photo'] = req.body.fileName 

            var params = {
                  sets : s
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.session.id_user
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    datatable(req, cols) {

        const query = `select a.*, b.group_name , c.extension,
        concat(d.first_name,' ', d.last_name) as created_by, concat(e.first_name,' ', e.last_name) as updated_by  
        from ${this.tableName} a 
        left join m_group b on a.id_group = b.id_group  
        left join m_extension c on c.id_extension = a.id_extension
        left join m_users d on d.id_user = a.user_created
        left join m_users e on e.id_user = a.user_updated
        where a.active = "Y" order by ${this.prmaryKey} asc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}