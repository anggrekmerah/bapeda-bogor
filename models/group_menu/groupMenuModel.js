const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class groupMenuModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_group_menu'
        this.prmaryKey = 'id_group_menu'

    }

    insertData( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.groupId, body.menuId, body.can_select, body.can_delete, body.can_insert, body.can_update , body.id_user, new Date()]
                , table : this.tableName
                , fields : 'id_group, id_menu, can_select, can_delete, can_insert, can_update, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    datatable(req, cols, active = 'Y') {

        var query = `select a.id_group, a.group_name, a.user_created, a.created_datetime , concat(b.first_name,' ', b.last_name) as created_by
        from m_group a
        left join m_users b on b.id_user = a.user_created
        where a.active = "Y"`
              
        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}