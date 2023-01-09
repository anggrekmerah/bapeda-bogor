const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class phoneBookModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_phone_book'
        this.prmaryKey = 'id_phone_book'

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

            var params = {
                  values : [req.body.phoneName, req.body.phoneNumber, req.body.notes, req.session.id_user, new Date()]
                , table : this.tableName
                , fields : 'phone_name, phone_number, notes, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    insertDataBlackList( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                sets : {
                  
                   'black_list' : 'Y'
                  ,'black_list_notes' : req.body.notes
                  ,'update_datetime' : new Date()
                  ,'user_updated' : req.session.id_user
                }
              , table : this.tableName
              , id_key : this.prmaryKey
              , id_val : req.body.pid
          }

          console.log(params)

          this.updateData(params).then( (res) => {
          
              resolve( true )
      
          }).catch( (err) => {
              
              reject (err)
      
          })

        })
        

    }

    insertDataIgnore( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [req.body.phoneName, req.body.phoneNumber, req.body.notes, req.session.id_user, new Date()]
                , search : {'phone_number' : req.body.phoneNumber, 'active' : 'Y'}
                , table : this.tableName
                , fields : 'phone_name, phone_number, notes, user_created, created_datetime'
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
                , id_val : req.params.phoneId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    activate( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'Y'
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.phoneId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    activateBlackList( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'black_list' : 'N'
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.phoneId
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
                    
                     'phone_name' : req.body.phoneName
                    ,'phone_number' : req.body.phoneNumber
                    ,'notes' : req.body.notes
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
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

    datatable(req, cols, active = 'Y') {

        const query = `select a.*, concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by  
        from `+this.tableName+` a 
        left join m_users b on b.id_user = a.user_created
        left join m_users c on c.id_user = a.user_updated
        where a.active = "`+active+`" and a.black_list = 'N' order by a.`+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

    datatableBlackList(req, cols, active = 'Y') {

        const query = `select a.*, concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by  
        from `+this.tableName+` a 
        left join m_users b on b.id_user = a.user_created
        left join m_users c on c.id_user = a.user_updated
        where a.black_list = "Y" order by a.`+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

    

}