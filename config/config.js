
require('dotenv').config({path:'D:/bapeda-bogor/.env'})

// require('dotenv').config({path:'/home/bapeda-bogor/.env'})

const mariadb = require('mariadb');

const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 5
  },
  
};
console.log(config.db)
const pool = mariadb.createPool(config.db);

// expose the ability to create new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }
