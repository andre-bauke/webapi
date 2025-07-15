const db = require("../../db/public/sales");

const express = require("express");

const router = express.Router();

//routes sales

router.get("/", async (req, res) => {
    const results = await db.selectSales();
    res.json(results);
})

router.get("/:cod_venda", async (req, res) => {
    const cod_venda = parseInt(req.params.cod_venda);
    const results = await db.selectSale(cod_venda);
    res.json(results);
})

router.post("/", async (req, res) => {
    const sales = req.body;
    await db.insertSales(sales);
    res.sendStatus(201);
})

router.patch("/:cod_venda", async (req, res) => {
    const cod_venda = parseInt(req.params.cod_venda);
    const sales = req.body;
    await db.updateSales(cod_venda, sales);
    res.sendStatus(200);
})

router.delete("/:cod_venda", async (req, res) => {
    const cod_venda = parseInt(req.params.cod_venda);
    await db.deleteSales(cod_venda);
    res.sendStatus(204);
})



module.exports = router;


