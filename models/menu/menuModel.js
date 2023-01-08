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

    insertData( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  values : [req.body.menuName, req.body.menuDesc, req.body.menuUrl, req.body.parentId, req.body.icon, req.body.orderMenu , req.session.id_user, new Date()]
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

    insertDataIgnore( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                values : [req.body.menuName, req.body.menuDesc, req.body.menuUrl, req.body.parentId, req.body.icon, req.body.orderMenu , req.session.id_user, new Date()]
              , search : {'menu_name' : req.body.menuName, 'menu_url':req.body.menuUrl, 'active' : 'Y'}
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
                , id_val : req.params.menuId
            }

            this.updateData(params).then( (res) => {
            
                resolve( true )
        
            }).catch( (err) => {
                
                reject (err)
        
            })

        })
        

    }

    activate( req ) {

        return new Promise((resolve, reject) => {

            var params = {
                  sets : {
                    'active' : 'Y'
                    ,'user_updated' : req.session.id_user
                    ,'update_datetime' : new Date()
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.menuId
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

                      'menu_name' : req.body.menuName
                    , 'menu_desc' : req.body.menuDesc
                    , 'menu_url' : req.body.menuUrl
                    , 'parent_id' : req.body.parentId
                    , 'icon' : req.body.icon
                    , 'order_menu' : req.body.orderMenu
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

        const query = `select a.*, concat(b.first_name,' ', b.last_name) as created_by, concat(c.first_name,' ', c.last_name) as updated_by 
        from `+this.tableName+` a 
        left join m_users b on b.id_user = a.user_created
        left join m_users c on c.id_user = a.user_updated
        where a.active = "`+active+`" order by a.`+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}