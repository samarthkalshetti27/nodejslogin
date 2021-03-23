const express =require("express");
const app = express();
const router = require("./routes/route");
const mongoose = require("mongoose");  
const dotenv = require("dotenv")
const user = require("./models/userSchema");
dotenv.config({path:'./config.env'});




app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))

app.use(router);
app.listen(process.env.PORT,() => {
    console.log("listing")
})