var nodemailer = require("nodemailer");
module.exports = {

smtpTransport : nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "nkana@tycl.org.in",
        pass: "tyclmughilNkana"
    }
}),
}