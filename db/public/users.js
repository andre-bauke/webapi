const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONNECTION_STRING);
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//crud users
async function selectUsers() {
    const results = await client.query("SELECT * FROM users");
    return results[0];
}

async function selectUser(id){
    try {
        const userid= id;
        const query = "SELECT U.id_users, U.user_fullname, U.email FROM users AS U WHERE id_users=?";
        const [user] = await client.query(query,userid,);

        if (user.length > 0){
            const response = {
                status: 200,
                message: "usuario encontrado",
                id: user[0].id_users,
                fullname: user[0].user_fullname,
                email: user[0].email
            }
            return response;

        }
        else {
            const response = {
                status: 404,
                message:"usuario nao existe"
            }
            return response;
        }
    }
    catch{
        const response = {
            status: 500,
            message: "Database Request error"
        }
        return response;
    }
}

async function insertUser(user){//insert new user
    try{
        const email = user.email;
        const selectEmailQuery = "SELECT email FROM users WHERE email=? LIMIT 1;";
        const [EmailCheck] = await client.query(selectEmailQuery, email,);
        
        if (EmailCheck.length > 0){
            const response = {
                status : 400,
                message: "email ja cadastrado"
            }
            return response;
            
        }
            
        const queryValues = [
            user.fullname,
            user.password,
            user.email
        ]
        const queryNewUser = "INSERT INTO users (user_fullname, user_password, email) VALUES (?, ?, ?)";
        const insertNewUser = await client.query(queryNewUser ,queryValues);

        const response = {
            status : 201,
            message: "usuario criado com sucesso",
            newUser: insertNewUser[0]
        }    
        return response;    
    }
    catch {
        const response = {
            status: 500,
            message: "erro no servidor"
        }
        return response;
    }
    
}

async function updateUser(id_user, user){//atualizar
    const values = [user.fullname, user.password, user.email, id_user];
    const query = "UPDATE users SET user_fullname=?, user_password=?, email=? WHERE id_users=?";
    const update = await client.query(query, values);
    return update;
}

async function deleteUser(id_user) {//delete
    const values = [id_user];
    const querySelect = "SELECT * FROM users WHERE id_users=? LIMIT 1";
    const [selectFunction] = await client.query(querySelect, values);

    

    if(selectFunction.length > 0){
        const queryDelete = "DELETE FROM users WHERE id_users=?";
        const deleteFunction = await client.query(queryDelete, values);
    }else {
        const response = {//usuario nao encontrado
            status: 500,
            message: "erro no servidor, usuario nao excluido"
        }
        return response;
    }
    const response = {
        status: 204,
        message: "usuario excluido com sucesso"
    }
    return response;
}

async function loginUser (user) {
    try {
        const email = user.email;
        const password = user.password;
        const query = "SELECT U.id_users, U.user_password, U.user_fullname, U.email FROM users AS U WHERE email=? LIMIT 1";
        const [ rows ] = await client.query(query, email);

        
        if ( rows.length === 0 ) {
            return  {
                status: 401,
                message: "login ou senha incorretos"
            }

        }else {
            const hash = rows[0].user_password;
            const ismatch = await bcrypt.compare(password, hash);
            if (!ismatch){
                const response = {
                    status: 401,
                    message: "login ou senha incorretos"
                }
                return response;
            }
            
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const id = rows[0].id_users;
        const fullname = rows[0].user_fullname;
        const token = jwt.sign(
            {
                userid: id,
                fullname: fullname,
                email: email
            },
            JWT_SECRET, 
            {
                expiresIn: '2d'
            })
        const response = {
            status: 200,
            token: token,
            message: "login realizado"
        }
        return response;



    }catch (error) {
        console.error(error);
        const response = {
            status: 500,
            message: "erro no servidor"
        }
        return response;
    }
}

module.exports = {
    selectUsers,
    selectUser,
    insertUser,
    updateUser,
    deleteUser,
    loginUser
}