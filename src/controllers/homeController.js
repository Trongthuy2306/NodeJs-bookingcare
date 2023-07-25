import db from '../models/index'
import CRUDSevices from '../services/CRUDSevices';

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        console.log('----------------')
        console.log(data)
        console.log('----------------')
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}
let getAboutPage = (req, res) => {
    return res.render('about/test.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDSevices.createNewUser(req.body);
    console.log(message);
    return res.send('Helloo post');
}
let displayCRUD = async (req, res) => {
    let data = await CRUDSevices.getAllUser();
    console.log('--------------------------')
    console.log(data);
    console.log('--------------------------')

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
}