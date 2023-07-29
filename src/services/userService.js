import { raw } from "body-parser";
import db from "../models/index"
import bcrypt, { hash } from 'bcrypt';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            //kiem tra
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //san sang dang nhap

                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    //compare password  
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = `Ok`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3,
                            userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2,
                        userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1,
                    userData.errMessage = `Pls try  other Email`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,


}