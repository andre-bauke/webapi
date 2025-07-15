require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const auth = require("./middlewares/auth");

//module public
const routerCustomer = require("./routes/public/customers");
const routerInterests = require("./routes/public/interests");
const routerProducts = require("./routes/public/products");
const routerSales = require("./routes/public/sales");
const routerSuppliers = require("./routes/public/suppliers");
const routerLogin = require("./routes/public/login");
 
//module private
const routerUser = require("./routes/private/users");

//routes public
app.use("/customers", routerCustomer);
app.use("/interesses", routerInterests);
app.use("/products", routerProducts);
app.use("/sales", routerSales);
app.use("/suppliers", routerSuppliers);
app.use("/login", routerLogin);

//routes private
app.use("/user", auth, routerUser);

//router default
app.get("/", (request, response) => {
    response.json({
        message : "It's alive!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})

