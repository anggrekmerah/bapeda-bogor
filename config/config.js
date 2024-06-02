
require('dotenv').config()

// require('dotenv').config({path:'/home/bapeda-bogor/.env'})

const mariadb = require('mariadb');

const env = process.env;

switch (env.ENV) {
  case 'production':
    var dbconfig = { /* don't expose password or any sensitive info, done only for demo */
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      connectionLimit: 5
    }
    break;

  case 'development':
    var dbconfig = { /* don't expose password or any sensitive info, done only for demo */
      host: env.DB_HOST_DEV,
      user: env.DB_USER_DEV,
      password: env.DB_PASSWORD_DEV,
      database: env.DB_NAME_DEV,
      connectionLimit: 5
    }
    break;

  case 'local':
    var dbconfig = { /* don't expose password or any sensitive info, done only for demo */
      host: env.DB_HOST_LOCAL,
      user: env.DB_USER_LOCAL,
      password: env.DB_PASSWORD_LOCAL,
      database: env.DB_NAME_LOCAL,
      connectionLimit: 5
    }
    break;
}

const config = {
  db: dbconfig,
  
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
