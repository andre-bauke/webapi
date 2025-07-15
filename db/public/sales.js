const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);
//sales functions db
async function selectSales(){
    const results = await client.query("SELECT * FROM vendas");
    return results[0];
}

async function selectSale(cod_venda){
    const results = await client.query("SELECT * FROM vendas WHERE cod_venda=?", [cod_venda])
    return results[0];
}

async function insertSales(sales){
    const values = [sales.cod_cliente, sales.cod_produto];
    await client.query("INSERT INTO vendas (cod_cliente, cod_produto) VALUES (?, ?)",values);
    
}

async function updateSales(cod_venda, sales){
    const values = [sales.cod_cliente, sales.cod_produto, cod_venda];
    await client.query("UPDATE vendas SET cod_cliente=?, cod_produto=? WHERE cod_venda=?", values);
}

async function deleteSales(cod_venda){
    const values = [cod_venda];
    await client.query("DELETE FROM vendas WHERE cod_venda=?", values);
}

module.exports = {
    selectSales,
    selectSale,
    insertSales,
    updateSales,
    deleteSales
}
