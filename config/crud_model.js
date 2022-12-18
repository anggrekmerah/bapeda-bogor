const mariadb = require('mariadb');

const config = require('./config');

module.exports = class crud_model  {

    conn

     constructor() {
        
      this.conn =  mariadb.createPool(config.db);
       
    }

    async execQuery(sql, binding = []) {     
  
      var conn = await this.conn.getConnection()

      var data = await conn.query(sql, binding); 
      
      conn.end()

      return data  

    }

    async getAll(params) {

      var conn = await this.conn.getConnection()
      
        var sql = "SELECT * FROM " + params.table  + " order by " + params.id_field + " " + params.order  
    
        var data = await conn.query(sql);

      conn.end()
       
      return data
    
    }

    async getById(params) {

      var conn = await this.conn.getConnection()

        var sql = "SELECT * FROM " + params.table + " where " + params.id_key + " = ? "    
    
        var data = await conn.query( sql, [params.id_value] );
      
      conn.end()

       return data
    
    }

    async saveData(params) {

      var conn = await this.conn.getConnection()
      
        const vals = []

        for (let index = 0; index < params.values.length; index++) {

          vals.push('?')
          
        }

        var sql = "insert into " + params.table + " ( " + params.fields + " ) values ( "+  vals.join(",")  + " ) "

        var data = await conn.query(sql, params.values);

      conn.end()
      
      return data  

    }

    async updateData(params) {

      var conn = await this.conn.getConnection()
      
        const sets = []
        const vals = []
      
        for (const key in params.sets) {
          
          if (Object.hasOwnProperty.call(params.sets, key)) {

            sets.push( key + " = ? " )

            vals.push(params.sets[key])

          }

        }

        vals.push(params.id_val)

        var sql = "update " + params.table + " set " + sets.join(",") + " where " + params.id_key + " = ? "

        var data = await conn.query(sql, vals);
      
      conn.end()

      return data
    
    }

}