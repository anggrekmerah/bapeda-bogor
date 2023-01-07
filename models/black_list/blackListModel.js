const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class blackListModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_black_list'
        this.prmaryKey = 'id_black_list'

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


    datatable(req, cols) {

        const query = 'select * from '+this.tableName+' where active = "Y" order by '+this.prmaryKey+' desc'

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

    insertData( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.phoneNumber, body.notes, 1, new Date()]
                , table : this.tableName
                , fields : 'phone_number, notes, user_created, created_datetime'
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
                values : [body.phoneNumber, body.notes, 1, new Date()]
              , search : {'phone_number' : body.phoneNumber}
              , table : this.tableName
              , fields : 'phone_number, notes, user_created, created_datetime'
            }

            this.saveDataIgnore(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })

    }

}