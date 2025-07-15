const db = require("../../db/public/interests");

const express = require("express");

const router = express.Router();

//interests routes
router.get("/", async (req,res) => {
    const results = await db.selectInterests();
    res.json(results);
});

router.get("/:cod_interesses", async (req,res) => {
    const cod_interests = parseInt(req.params.cod_interesses);
    const results = await db.selectInterest(cod_interests);
    res.json(results);
})


router.post("/", async (req,res) => {
    const orders = req.body;
    await db.insertInterests(orders);
    res.sendStatus(201);
});

router.patch("/:cod_interesses", async (req, res) => {
    const cod_interesses = parseInt(req.params.cod_interesses);
    const orders = req.body;
    await db.updateInterests(cod_interesses, orders);
    res.sendStatus(200);
})

router.delete("/:cod_interesses", async (req, res) => {
    const cod_interesses = parseInt(req.params.cod_interesses);
    await db.deleteInterests(cod_interesses);
    res.sendStatus(204);
})


module.exports = router;