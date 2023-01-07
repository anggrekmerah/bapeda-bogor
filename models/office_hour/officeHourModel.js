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

    insertData( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.officeDay, body.officeOpenHour, body.officeCloseHour, 1, new Date()]
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

    insertDataIgnore( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [body.officeDay, body.officeOpenHour, body.officeCloseHour, 1, new Date()]
              , search : {'office_day' : body.officeDay}
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

    inActive( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : body.officeHourId
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

        const query = 'select * from m_office_hour where active = "Y" order by id_office_hour desc'

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}