import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view Engine", "ejs");
    app.set("views", "./src/views")
}


module.exports = configViewEngine;