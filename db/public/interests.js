const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

//interests functions db

async function selectInterests(){
    const results =  await client.query("SELECT * FROM interesses");
    return results[0];
}

async function selectInterest(cod_interesses){
    const results = await client.query("SELECT * FROM interesses WHERE cod_interesses=?", [cod_interesses]);
    return results [0];
    
}

async function insertInterests(interests){
    const values = [interests.cod_cliente, interests.cod_produto];
    await client.query("INSERT INTO interesses (cod_cliente, cod_produto) VALUES (?, ?)", values);
}

async function updateInterests(cod_interesses, interests){
    const values = [interests.cod_cliente, interests.cod_produto, cod_interesses];
    await client.query("UPDATE interesses SET cod_cliente=?, cod_produto=? WHERE cod_interesses=?", values);
}


async function deleteInterests(cod_interesses){
    const values = [cod_interesses];
    await client.query("DELETE FROM interesses WHERE cod_interesses=?", values);
}

module.exports = {
    selectInterests,
    selectInterest,
    insertInterests,
    updateInterests,
    deleteInterests
}
