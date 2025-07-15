const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

//suppliers functions db


async function selectSuppliers(){
    const results = await client.query("SELECT * FROM fornecedores");
    return results[0];
}

async function selectSupplier(cnpj){
    const results = await client.query("SELECT * FROM fornecedores WHERE cnpj=?", [cnpj])
    return results[0];
}

async function insertSuppliers(suppliers){
    const values = [suppliers.cnpj, suppliers.nome, suppliers.endereco];
    await client.query("INSERT INTO fornecedores (cnpj, nome, endereco) VALUES (?, ?, ?)",values);
    
}

async function updateSuppliers(cnpj, suppliers ){
    const values = [suppliers.nome, suppliers.endereco, cnpj];
    await client.query("UPDATE fornecedores SET nome=?, endereco=? WHERE cnpj=?", values);
}

async function deleteSuppliers(cnpj){
    const values = [cnpj];
    await client.query("DELETE FROM fornecedores WHERE cnpj=?", values);
}

module.exports = {
    selectSuppliers,
    selectSupplier,
    insertSuppliers,
    updateSuppliers,
    deleteSuppliers
}
