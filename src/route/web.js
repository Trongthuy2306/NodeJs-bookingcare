import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)


    router.get('/bytrongthuy', (req, res) => {
        return res.send('Router with Trongthuy')
    })


    return app.use("/", router);
}

module.exports = initWebRoutes;