
const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

//customers functions db
async function selectCustomers () {//selecionar
    const results = await client.query("SELECT * FROM customers");
    return results[0];
}

async function selectCustomer(cod_cliente){//selecionar 1
    const results = await client.query("SELECT * FROM customers WHERE cod_cliente=?",[cod_cliente]);
    return results[0];
}

async function insertCustomer(customer){//inserir
    const values = [customer.nome, customer.idade, customer.cidade];
    await client.query("INSERT INTO customers(nome, idade, cidade) VALUES(?, ?, ?)",values);
}

async function updateCustomer(cod_cliente, customer){//atualizar
    const values = [customer.nome, customer.idade, customer.cidade, cod_cliente];
    await client.query("UPDATE customers SET nome=?, idade=?, cidade=? WHERE cod_cliente=?", values);
    
}

async function deleteCustomer(cod_cliente) {//delete
    const values = [cod_cliente];
    await client.query("DELETE FROM customers WHERE cod_cliente=?", values)   
}



module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}