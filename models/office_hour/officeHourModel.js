const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class officeHourModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {

        super()

        this.tableName = 'm_office_hour'
        this.prmaryKey = 'id_office_hour' 

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

    insertData( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [req.body.officeDay, req.body.officeOpenHour, req.body.officeCloseHour, req.session.id_user, new Date()]
                , table : this.tableName
                , fields : 'office_day, office_open_hour, office_close_hour, user_created, created_datetime'
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
                values : [req.body.officeDay, req.body.officeOpenHour, req.body.officeCloseHour, req.session.id_user, new Date()]
              , search : {'office_day' : req.body.officeDay, 'active' : 'Y'}
              , table : this.tableName
              , fields : 'office_day, office_open_hour, office_close_hour, user_created, created_datetime'
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
                , id_val : req.params.officeHourId
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
                    'office_day' : body.officeDay
                    ,'office_open_hour' : body.officeOpenHour
                    ,'office_close_hour' : body.officeCloseHour
                    ,'update_datetime':new Date()
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

        const query = `select a.* , concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by 
        from m_office_hour a 
        left join m_users b on b.id_user = a.user_created
        left join m_users c on c.id_user = a.user_updated
        where a.active = "Y" order by a.id_office_hour desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}