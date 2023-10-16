const sql = require('mssql');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { emit } = require('nodemon');
dotenv.config()
 
const config = {
    user: process.env.AZURE_SQL_USER, // better stored in an app setting such as process.env.DB_USER
    password: process.env.AZURE_SQL_PASS, // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.AZURE_SQL_SERVER, // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: process.env.AZURE_SQL_DATABASE, // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

console.log("AZURE SQL CONNECTED");
connectAndQuery();

async function connectAndQuery() {
    try {
      await sql.connect(config);
        // close connection only when we're certain application is finish

        sql.close()
    } catch (err) {
        console.error(err.message);
    }
}

/* 
async function getAllusers(){

    try {

        const pool = await sql.connect(config)
        let result = await pool.request().query('SELECT * FROM users')
       return result.recordset
    } catch (error) {
        console.error('Error buscuando usuarios', error);
        return[]
    }
} */


//GET ALL USERS
const getAllusers = async ()=>{
    try {

        const pool = await sql.connect(config)
        let result = await pool.request().query('SELECT * FROM users')
       return result.recordset
    } catch (error) {
        console.error('Error buscuando usuarios', error);
        return[]
    }
} 




// CREATE USER
//hash
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

async function createUser (email, password){
    const hashedPassword = await hashPassword(password); 
   
    //funcion para crear el usuario
    
    const query =
    "insert into users(email, password) values(@email, @password)";    

    try {
    
        const pool = await sql.connect(config)
        let request = await pool.request()    
    .input("email", sql.NVarChar(60), email)
    .input("password", sql.VarChar(255), hashedPassword)

    const result = await request.query(query);
    console.log(result);
      
    } catch (error) {
      console.error('Error Registrando',error);
    }
  };
//LOGIN
  async function Login(email, password){
   
    try {
        const pool = await sql.connect(config)
        let result = await pool.request().query`SELECT * FROM users WHERE email=${email}`

        const user = result.recordset[0]
        
       if(!user){
        return null;
       }

       const isPaswordValid = await bcrypt.compare(password, user.password);

       if(!isPaswordValid){
        return null;
       }

       const token =jwt.sign({userId:user.id}, process.env.SECRET_KEY,{expiresIn:"1h"})
       return (token)

    } catch (err) {
        console.error('Login error',err)
        return null;
    }
  }

  //ADD USER
async function addUser(email, password){
  try {
    const pool = await sql.connect(config)
    const result = await pool.request()
    pool.input('email', sql.NVarChar(60),email);
    pool.input('password', sql.NVarChar(60), password);    
    await pool.query(`INSERT INTO users(email,password) VALUES('${email}', '${password}')`) 
    console.log(result);
  } catch (error) {
    throw error;
  }
}

//UPDATE USERS

async function updateUsers(userId,newEmail, newPassword){
 try {
  const pool = await sql.connect(config)
  const result =await pool.request()
  pool.input('id', sql.Int, userId);
  pool.input('email', sql.NVarChar(60), newEmail);
  pool.input ('password', sql.NVarChar(60), newPassword)
  await pool.query('UPDATE user SET email=@email, password=@password WHERE id=@id');
 } catch (error) {
  throw error;
 }
}

//DELETE USER

async function deleteUser(userId){
  try {
    const pool = await sql.connect(config)
    const result =await pool.request()
    pool.input('id', sql.Int, userId);
    await pool.query('DELETE FROM users WHERE id = @id');
      } catch (error) {
    throw error;
  }
}
  
///===AUTHENTICATION FUNCIATIONS
/* const match = async function correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }; */
  
  //duplicate user
  const checkDuplicateUser = async (email) => {
    try {
      await new sql.ConnectionPool(config);
      const result =
        await sql.query`SELECT 1 AS count FROM users WHERE email = ${email}`;
  
      if (result.recordset[0].count > 0) {
        // User already exists
        return true;
      } else {
        // User does not exist
        return false;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error while checking for duplicate user");
    }
  };

module.exports={connectAndQuery, getAllusers, createUser, Login, addUser, deleteUser, updateUsers}