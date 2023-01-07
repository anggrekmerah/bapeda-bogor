const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class menuModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_menu'
        this.prmaryKey = 'id_menu'

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

    insertData( body ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [body.menuName, body.menuDesc, body.menuUrl, body.parentId, body.icon, body.orderMenu , 1, new Date()]
                , table : this.tableName
                , fields : 'menu_name, menu_desc, menu_url, parent_id, icon, order_menu, user_created, created_datetime'
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
                values : [body.menuName, body.menuDesc, body.menuUrl, body.parentId, body.icon, body.orderMenu , 1, new Date()]
              , search : {'menu_name' : body.menuName, 'menu_url':body.menuUrl}
              , table : this.tableName
              , fields : 'menu_name, menu_desc, menu_url, parent_id, icon, order_menu, user_created, created_datetime'
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
                , id_val : body.menuId
            }

            this.updateData(params).then( (res) => {
            
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
                , id_val : body.menuId
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

                      'menu_name' : body.menuName
                    , 'menu_desc' : body.menuDesc
                    , 'menu_url' : body.menuUrl
                    , 'parent_id' : body.parentId
                    , 'icon' : body.icon
                    , 'order_menu' : body.orderMenu
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

    datatable(req, cols, active = 'Y') {

        const query = 'select * from '+this.tableName+' where active = "'+active+'" order by '+this.prmaryKey+' desc'

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}