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
    return res.redirect("/get-crud");
}
let displayCRUD = async (req, res) => {
    let data = await CRUDSevices.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDSevices.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            userEdit: userData
        })

    } else {
        return res.send('User not found!')

    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDSevices.updateUserData(data);
    return res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDSevices.deleteUserById(id);
        return res.redirect("/get-crud");
    } else {
        return res.send('User not found !');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}