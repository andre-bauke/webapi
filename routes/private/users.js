const db = require("../../db/public/users");
const bcrypt = require("bcryptjs");
const express = require("express");

const router = express.Router();

// users routes
router.get("/", async (req, res) => {// pesquisa todos os users
    const results = await db.selectUsers();
    res.json(results);
})

router.get("/:id", async (req, res) => {
    const id_user = parseInt(req.params.id);
    const results = await db.selectUser(id_user);
    res.json(results);
})

router.post("/", async (req, res) => {
    const user = req.body;   
    try {
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(user.password, salt);
        //monta user com a hash
        const newUser = {
            fullname: user.fullname,
            password: hashPassword,
            email: user.email
        }
        const insertNewUser = await db.insertUser(newUser);

        res.status(insertNewUser.status).json(insertNewUser);
    }
    catch {
        const response = {
            status: 500,
            mensagem: "Erro no servidor.",
    };

    res.status(response.status).json(response);
  }

});

router.patch("/:id_user", async (req, res) => {
    const id_user = parseInt(req.params.id_user);
    const user = req.body;

    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(user.password, salt);
    
    const newUserUpdate = {
        fullname: user.fullname,
        email: user.email,
        password: hashPassword
    }
    await db.updateUser(id_user, newUserUpdate);

    const response = {
        status: 200,
        message: "usuario atualizado",
        fullname: user.fullname,
        email: user.email,
        password: hashPassword
    }
    return res.status(201).json(response);
})

router.delete("/:id_user", async (req, res) => {
    const id_user = parseInt(req.params.id_user);
    await db.deleteUser(id_user);
    res.sendStatus(204);
})



module.exports = router;