const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class blackListModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'bapenda.m_black_list'
        this.prmaryKey = 'id_black_list'

    }

    getMenuById(id) {
        
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

    saveMenu( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.menuName, body.menuDesc, body.menuUrl, body.parentId, body.icon, body.orderMenu, 1, new Date()]
                , table : 'bapenda.m_menu'
                , fields : 'menu_name, menu_desc, menu_url, parent_id, icon, order_menu, user_created, created_datetime'
            }

            this.saveData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (false)
        
            })

        })
        

    }

    inActiveMenu( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'N'
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : body.menuId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    updateMenu( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    
                     'menu_name' : body.menuName
                    ,'menu_desc' : body.menuDesc
                    ,'menu_url' : body.menuUrl
                    ,'parent_id' : body.parentId
                    ,'icon' : body.icon
                    ,'order_menu' : body.orderMenu
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

        const query = 'select * from '+this.tableName+' order by '+this.prmaryKey+' desc'

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}