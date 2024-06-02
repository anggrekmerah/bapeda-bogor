const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class uploadFileModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {

        super()

        this.tableName = 't_document'
        this.prmaryKey = 'id_document' 

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
                ,id_key : this.prmaryKey
                ,id_value : id
            }

            this.getById(params).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }


    inActive( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                    ,'user_updated' : req.session.id_user
                    ,'update_datetime' : new Date()
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.id_document
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    insertData( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [req.body.fileName, req.session.id_user, new Date()]
                , table : this.tableName
                , fields : 'document, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })

    }

    insertDataIgnore( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [req.body.fileName, req.session.id_user, new Date()]
                , search : { 'document' : req.body.fileName }
                , table  : this.tableName
                , fields : 'document, user_created, created_datetime'
            }

            this.saveDataIgnore(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })

    }

    
    update_data( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'document' : req.body.fileName
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

    datatable(req, cols) {
        
        const query = `select a.*, concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by 
        from t_document a 
        left join m_users b on b.id_user = a.user_created
        left join m_users c on c.id_user = a.user_updated
        where a.active = 'Y' order by a.id_document desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}