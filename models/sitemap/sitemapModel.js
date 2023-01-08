const mariadb = require('mariadb');

const crud_model = require('../../config/crud_model');
const ssp = require('../../config/ssp');

const datatable = new ssp();

module.exports = class sitemapModel extends crud_model  {

    tableName

    prmaryKey

    constructor() {
        super()

        this.tableName = 'm_sitemap'
        this.prmaryKey = 'id_sitemap'

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
                  values : [req.body.groupId, req.body.order, req.session.id_user, new Date()]
                , table : this.tableName
                , fields : 'id_group, hirarcy_ordered, user_created, created_datetime'
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
                values : [req.body.groupId, req.body.order, req.session.id_user, new Date()]
              , search : {'id_group' : req.body.groupId, 'active' : 'Y'}
              , table : this.tableName
              , fields : 'id_group, hirarcy_ordered, user_created, created_datetime'
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
                , id_val : req.params.sitemapId
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
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
                  }
                , table : this.tableName
                , id_key : this.prmaryKey
                , id_val : req.params.sitemapId
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
                     'id_group' : req.body.groupId
                    ,'hirarcy_ordered' : req.body.order
                    ,'update_datetime' : new Date()
                    ,'user_updated' : req.session.id_user
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

        var query = `select a.id_group, b.group_name, a.hirarcy_ordered, a.id_sitemap, a.user_created, a.user_updated, a.update_datetime, a.created_datetime,
            concat(c.first_name,' ', c.last_name) as created_by, concat(d.first_name,' ', d.last_name) as updated_by  
            from `+this.tableName+` a 
            left join m_group b on a.id_group = b.id_group 
            left join m_users c on c.id_user = a.user_created
            left join m_users d on d.id_user = a.user_updated
            where a.active = "`+active+`" order by a.`+this.prmaryKey+` desc`

        return datatable.simple(query, req, this.prmaryKey, cols)

    }

}