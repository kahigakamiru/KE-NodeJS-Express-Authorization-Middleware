const express = require("express")
const jwt = require("jsonwebtoken");
const authorize = require('./authoraztion-middleware');
const config = require('./config');

const app = express();
const port = process.env.PORT || 5000;

app.get('/token', (req, res)=>{
 const payload ={
     name: "Jim",
     scopes: ["customer:create", "customer:read"]
 };
 const token = jwt.sign(payload, config.JWT_SECRET);
 res.send(token);
});
app.get('/customer', authorize("customer:read"), (req, res) => {
    res.send("Customer information");
});

const server = app.listen(port, () => {
    console.log(`Server is listen on ${server.address().port}`);
});
