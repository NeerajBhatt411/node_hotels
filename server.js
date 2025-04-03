const express = require("express");
const app = express();
personRoutes = require('./routes/personRoutes');
menuItemRoutes = require("./routes/menuItemRoutes")
const passport = require("./auth")
const bcrypt = require("bcrypt");

require("./db")
require('dotenv').config()
const cors = require("cors")
app.use(express.urlencoded({ extended: true })); // for form data

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;



// middleware function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]Request made to :${req.originalUrl}`);
    next(); // move to next phase 



}

// pura app mai agar middleware usse krna h toh 
app.use(logRequest);
app.use(passport.initialize());
const localAuthenticate = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
    res.send("hi this is working let's go bro ")
})


app.use('/person',personRoutes);
app.use('/menu', menuItemRoutes);





app.listen(PORT, () => {
    console.log(`Server is workin on http://127.0.0.1:${PORT}`);

});
