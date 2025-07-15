
const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

//products functions db

async function selectProducts() {
    const results = await client.query("SELECT * FROM produtos");
    return results[0];
}

async function selectProduct(cod_produto){
    const results = await client.query("SELECT * FROM produtos WHERE cod_produto=?",[cod_produto]);
    return results[0];
}

async function insertProducts(products){
    const values = [products.nome, products.estoque, products.descricao, products.cod_fornecedor];
    await client.query("INSERT INTO produtos (nome, estoque, descricao, cod_fornecedor) VALUES (?, ?, ?, ?)", values);
}

async function updateProducts(cod_produto, products) {
    const values = [products.nome, products.estoque, products.descricao, products.cod_fornecedor, cod_produto];
    await client.query("UPDATE produtos SET nome=?, estoque=?, descricao=?, cod_fornecedor=? WHERE cod_produto=?", values);
}
async function deleteProducts(cod_produto) {
    const values = [cod_produto];
    await client.query("DELETE FROM produtos WHERE cod_produto=?",values);
}


module.exports = {
    selectProducts,
    selectProduct,
    insertProducts,
    updateProducts,
    deleteProducts
}