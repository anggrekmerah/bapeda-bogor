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

    update_data( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    
                     'menu_name' : body.menuName
                    ,'menu_desc' : body.menuDesc
                    ,'menu_url' : body.menuUrl
                    ,'parent_id' : body.parentId
                    ,'icon' : body.icon
                    ,'order_menu' : body.orderMenu
                    ,'is_agent':body.isAgent
                    ,'update_datetime' : new Date()
                    ,'user_updated' : 1
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : body.id
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