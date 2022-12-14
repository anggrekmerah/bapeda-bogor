const mariadb = require('mariadb');

const config = require('./config');

module.exports = class crud_model  {

    conn

     constructor() {
        
      this.conn =  mariadb.createPool(config.db);
       
    }

    async execQuery(sql) {    
  
      return await this.conn.query(sql); 
    
    }

    async getAll(params) {

      var sql = "SELECT * FROM " + params.table  + " order by " + params.id_field + " " + params.order  
  
      return await this.conn.query(sql); 
    
    }

    async getById(params) {

      var sql = "SELECT * FROM " + params.table + " where " + params.id_key + " = ? "    
  
      return await this.conn.query( sql, [params.id_value] ); 
    
    }

    async saveData(params) {

      const vals = []

      for (let index = 0; index < params.values.length; index++) {

        vals.push('?')
        
      }

      var sql = "insert into " + params.table + " ( " + params.fields + " ) values ( '" +  vals.join("','")  + "' ) "

      return await this.conn.query(sql, params.values);
    
    }

    async updateData(params) {

      const sets = []
      const vals = []
     
      for (const key in params.sets) {
        
        if (Object.hasOwnProperty.call(params.sets, key)) {

          sets.push( key + " = ? " )

          vals.push(params.sets[key])

        }

      }

      var sql = "update " + params.table + " set " + sets.join("','") + " where " + params.id_key + " = ? "

      return await this.conn.query(sql, params.id_value);
    
    }

}