const db = require("../../db/public/products");

const express = require("express");

const router = express.Router();

//products routes

router.get("/", async (req, res) => {
    const results = await db.selectProducts();
    res.json(results);
})

router.get("/:cod_produto", async (req, res) => {
    const cod_produto = parseInt(req.params.cod_produto);
    const results = await db.selectProduct(cod_produto);
    res.json(results);
})

router.post("/", async (req, res) => {
    const products = req.body;
    await db.insertProducts(products);
    res.sendStatus(201);
})

router.patch("/:cod_produto", async (req, res) => {
    const cod_produto = parseInt(req.params.cod_produto);
    const products = req.body;
    await db.updateProducts(cod_produto, products);
    res.sendStatus(200);
})

router.delete("/:cod_produto", async (req, res) => {
    const cod_produto = parseInt(req.params.cod_produto);
    await db.deleteProducts(cod_produto);
    res.sendStatus(204);
})


module.exports = router;