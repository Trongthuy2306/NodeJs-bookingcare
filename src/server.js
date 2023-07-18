import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';
require('dotenv').config();

let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);
connectDB();


let port = process.env.PORT || 8000;
//port === undefined => port =8000
app.listen(port, () => {
    //callback
    console.log("Back-end by trong thuy port :" + port)
});