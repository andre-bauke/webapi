const db = require("../../db/public/suppliers");

const express = require("express");

const router = express.Router();

//routes suppliers db

router.get("/", async (req, res) => {
    const results = await db.selectSuppliers();
    res.json(results);
})

router.get("/:cnpj", async (req, res) => {
    const cnpj = parseInt(req.params.cnpj);
    const results = await db.selectSupplier(cnpj);
    res.json(results);
})

router.post("/", async (req, res) => {
    const suppliers = req.body;
    await db.insertSuppliers(suppliers);
    res.sendStatus(201);
})

router.patch("/:cnpj", async (req, res) => {
    const cnpj = parseInt(req.params.cnpj);
    const suppliers = req.body;
    await db.updateSuppliers(cnpj, suppliers);
    res.sendStatus(200);
})

router.delete("/:cnpj", async (req, res) => {
    const cnpj = parseInt(req.params.cnpj);
    await db.deleteSuppliers(cnpj);
    res.sendStatus(204);
})


module.exports = router