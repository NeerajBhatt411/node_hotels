const express = require("express");
const app  = express();
const db = require("./db");
const Person = require("./model/person");
const MenuItem = require("./model/MenuItem")
const dotenv = require("dotenv");
personRoutes = require('./routes/personRoutes');
menuItemRoutes = require("./routes/menuItemRoutes")

require('dotenv').config()
app.use(express.json());
const PORT = process.env.PORT||3000;

app.get("/" ,(req,res)=>{
res.send("hi this is working let's go bro ")
})


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);





app.listen(PORT, ()=>{
    console.log(`Server is workin on http://127.0.0.1:${PORT}`);
    
});
