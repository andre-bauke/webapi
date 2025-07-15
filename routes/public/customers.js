const db = require("../../db/public/customers");

const express = require("express");

const router = express.Router();

// customers routes
router.get("/", async (req, res) => {
    const results = await db.selectCustomers();
    res.json(results);
})

router.get("/:cod_cliente", async (req, res) => {
    const codCliente = parseInt(req.params.cod_cliente);
    const results = await db.selectCustomer(codCliente);
    res.json(results);
})


router.post("/", async (req, res) => {
    const customer = req.body;
    await db.insertCustomer(customer);
    res.sendStatus(201);
});



router.patch("/:cod_cliente", async (req, res) => {
    const codCliente = parseInt(req.params.cod_cliente);
    const customer = req.body;
    await db.updateCustomer(codCliente, customer);
    res.sendStatus(200);
})

router.delete("/:cod_cliente", async (req, res) => {
    const cod_cliente = parseInt(req.params.cod_cliente);
    await db.deleteCustomer(cod_cliente);
    res.sendStatus(204);
})




module.exports = router;