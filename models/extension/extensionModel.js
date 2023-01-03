const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class extensionModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_extension'
        this.prmaryKey = 'id_extension'

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
                  values : [req.body.extension, req.session.id_user, new Date()]
                , table : this.tableName
                , fields : 'extension, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    inActive( req ) {

        return new Promise((resolve, reject) => {

            var param = {
                  sets : {
                    'active' : 'N'
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.extensionId
            }

            this.updateData(param).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    activate( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'Y'
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : body.extensionId
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
                    
                     'extension' : req.body.extension
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

        const query = `select a.* , concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by
            from `+this.tableName+` as a 
            left join m_users b on b.id_user = a.user_created
            left join m_users c on c.id_user = a.user_updated 
            where a.active = "`+active+`" order by `+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}