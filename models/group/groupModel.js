const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class groupModel extends crud_model  {

    constructor() {
        super()
    }

    getGroupById(id) {
        
        return new Promise((resolve, reject) => {
        
            var params = {
                table : 'bapenda.m_group'
                ,id_key : 'id_group' 
                ,id_value : id
            }

            this.getById(params).then( (res) => {
            
                resolve( res )
        
            }).catch( (err) => {
                
                reject (err)
        
            })
        
        })

    }

    saveGroup( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.groupName, body.groupDesc, 1, new Date()]
                , table : 'bapenda.m_group'
                , fields : 'group_name, group_desc, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })
        

    }

    inActiveGroup( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                  }
                , table : 'bapenda.m_group'
                , id_key : 'id_group'
                , id_val : body.groupId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    updateGroup( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'group_name' : body.groupName
                    ,'group_desc' : body.groupDesc
                    ,'update_datetime' : new Date()
                    ,'user_updated' : 1
                  }
                , table : 'bapenda.m_group'
                , id_key : 'id_group'
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

        const query = 'select * from bapenda.m_group where active = "Y" order by id_group desc'

        return datatable.simple(query, req, 'id_group', cols)

    }

}