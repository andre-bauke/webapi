const db = require("../../db/public/users");
const express = require("express");


const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const user = req.body;
        const loginResults = await db.loginUser(user);
        return res.status(loginResults.status).json(loginResults);

    }
    catch {
        const response = {
            status: 500,
            message: "Verifique seus dados e tente novamente",
          };
          res.status(500).send(response);
    }
})

module.exports = router;