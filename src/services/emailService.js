import nodemailer from 'nodemailer';
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    let transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    //send mail with define transport object
    let info = await transpoter.sendMail({
        from: '"Booking Care"<thuynguyen.23062002@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: getBodyHTMLEmail(dataSend),
    })
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care.</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin là đúng sự thật vui lòng nhấn vào link dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh. </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a>
        </div>

        <div>Xin chân thành cảm ơn!!!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Booking Care.</p>
        <p>Information to schedule an appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the information is true, please click on the link below to confirm completion of the medical appointment procedure. </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here.</a>
        </div>

        <div>Sincerely thank you!!!</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}

