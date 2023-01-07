const config = require('./config');

module.exports = class crud_model  {

    
    async execQuery(sql, binding = []) {     
  
      let conn;

      try {
      
          // establish a connection to MariaDB
          conn = await config.getConnection();

          // create a new query
          var data = await conn.query(sql, binding); 

          return data 

      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }
      
    }

    async getAll(params) {

      let conn;
      try {
          // establish a connection to MariaDB
          conn = await config.getConnection();

          var sql = "SELECT * FROM " + params.table  + " where active = 'Y' order by " + params.id_field + " " + params.order  
    
          var data = await conn.query(sql);
          
          return data 

      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }
    
    }

    async getById(params) {

      let conn;
      try {
          // establish a connection to MariaDB
          conn = await config.getConnection();

          var sql = "SELECT * FROM " + params.table + " where " + params.id_key + " = ? "    
    
          var data = await conn.query( sql, [params.id_value] );

          return data 

      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }
    
    }

    async saveData(params) {

      let conn;
      try {
          // establish a connection to MariaDB
          conn = await config.getConnection();

          const vals = []

          for (let index = 0; index < params.values.length; index++) {

            vals.push('?')
            
          }

          var sql = "insert into " + params.table + " ( " + params.fields + " ) values ( "+  vals.join(",")  + " ) "

          var data = await conn.query(sql, params.values);

          return data 

      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }

    }

    async saveDataIgnore(params) {

      let conn;
      try {
          // establish a connection to MariaDB
          conn = await config.getConnection();

          const val_w = []
          const val_s = []
          for (const key in params.search) {
            val_w.push( key + '=?')
            val_s.push(params.search[key])
          }

          var check = await this.execQuery("select * from " + params.table + " where " + val_w.join(" and ") , val_s)

          delete check.meta

          if(check.length == 0) {

            const vals = []

            for (let index = 0; index < params.values.length; index++) {

              vals.push('?')
              
            }
            
            var sql = "insert into " + params.table + " ( " + params.fields + " ) values ( "+  vals.join(",")  + " ) "

            var data = await conn.query(sql, params.values);

            return data
          } else {
            return false
          }
            
      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }

    }

    async updateData(params) {

      let conn;
      try {
          // establish a connection to MariaDB
          conn = await config.getConnection();

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

          return data 

      } catch (err) {

          throw err;
      
      } finally {
      
        if (conn) conn.release();
      
      }

    
    }

}