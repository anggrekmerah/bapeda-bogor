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

             
        const query = `select a.*, concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by 
                        from `+this.tableName+` as a 
                        left join m_users b on b.id_user = a.user_created
                        left join m_users c on c.id_user = a.user_updated
                        where a.active = "Y" order by a.`+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

    insertData( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [req.body.phoneNumber, req.body.notes, req.session.id_user, new Date()]
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

    insertDataIgnore( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [req.body.phoneNumber, req.body.notes, req.session.id_user, new Date()]
              , search : {'phone_number' : req.body.phoneNumber, 'active' : 'Y'}
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