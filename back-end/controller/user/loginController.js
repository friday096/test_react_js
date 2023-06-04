


const express = require("express");
var multer = require('multer');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const constant = require('../../config/constant')
var randtoken = require('rand-token').generator(); //for genrate random passwords
const nodemailer = require('nodemailer');
const config = require('../../config/config')
var jwt = require('jsonwebtoken');
var secret = "mySuperSecret"
var uuid = require('uuid');
const e = require("express");


/////////////////////////////////// DB CONNECTIONS//////////////////////////////////////
const con = mysql.createConnection({ //connect mySql Function
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

con.connect();

function queryDb(query) {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
}




////////////////////////////////////// API's ////////////////////////
exports.registration = async (req, res) => {
    try {
        let IDs = uuid.v1().toString()
        let data = req.body
        var id = IDs
        var company_name = data.company_name;
        var device_serial_id = data.device_serial_id;
        console.log('device_serial_id', device_serial_id)
        var contact_name = data.contact_name;
        var email = data.email;
        var telephone = data.cell;
        var password = bcrypt.hashSync(data.password, 10);
        let checkEmail = await queryDb("select * from users where email = " + con.escape(email))
        if (checkEmail.length != 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Email ID is already exist"
            })
        } else {
            let checkQuery = "select * from device_codes where serial_id = " + con.escape(device_serial_id)
            let checkserialId = await queryDb(checkQuery)
            console.log('data++++++++++',data)
            if(checkserialId.length == 0){
                res.send({
                    code:constant.ERROR_CODE,
                    msg:"Invalid device serial id provided"
                })
            }else if (checkserialId[0].used != 0){
                res.send({
                    code:constant.ERROR_CODE,
                    msg:"This device serial Id is already used"
                })
            }else{
            let insertQuery = "INSERT INTO `users` (`company_name`, `device_serial_id`, `email`, `password`,`contact_name`, `telephone`,`id`) VALUES  (" + con.escape(company_name) + ", " + con.escape(device_serial_id) + "," + con.escape(email) + ", " + con.escape(password) + ", " + con.escape(contact_name) + "," + con.escape(telephone) + "," + con.escape(id) + ");";
            let saveUser = await queryDb(insertQuery)
           let updateDeviceCodeQuery = "UPDATE `device_codes` SET `used`=" + con.escape(1) + " WHERE  serial_id = " + con.escape(device_serial_id)
            let updateDeviceCode = await queryDb(updateDeviceCodeQuery)
            if (!insertQuery) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to save the data"
                })
            } else {
                var transporter = nodemailer.createTransport(config.smtp_data);
                var mailOptions = {
                    from: config.from_email,
                    to: data.email,
                    subject: 'Your Vetrine Security Code',
                    html: `<!DOCTYPE html>
                        <html lang="en">
                       
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Vetrine.com</title>
                        </head>
                       
                        <body>
                            <div class="email-content" style="max-width: 500px;margin: auto;background: #f7f8fb;border: 1px solid #d6d6d6;
                            padding: 20px;">
                              <div class="logo"style="text-align:center;">
                                  <h3>Vetrine.com</h3>
                              </div>
                               <h5 style="font-family: 'arial','helvetica',sans-serif;font-size: 24px;line-height: 32px;margin: 0;
                               color: #3c4858;">Your account is almost ready</h5>
                                <a href="${config.base_url}/authchecker/${id}" style="text-decoration: none;border-radius: 4px; background-color: #f9423a; margin-top:30px; display: inline-block; padding: 0px 16px; ">
                                  <p style="height: 40px; line-height: 40px;text-align: center;color: #ffffff;font-size: 16px; background-color: #f9423a; margin: 0;">Confirm Email</p>
                              </a>
                              <h5 class=""style="font-size: 16px;line-height: 24px;color: #3c4858;font-weight: 500">Don't be too late, this email will be valid for 48 hours.</h5>
                                <p style="color: #717e8f;font-size: 14px;line-height: 21px;margin: 0px;">This email is automatically generated.</p>
                                <p style="color: #717e8f;font-size: 14px;line-height: 21px;margin: 0px;">If you need help registering please <a href="#"class="contact"style="text-decoration: none;
                                  color: #717e8f;">contact us.</a></p>
                                <h5 class=""style="border-collapse: collapse; font-family: 'arial','helvetica',sans-serif; font-size: 16px; line-height: 24px; color: #3c4858; font-weight: 500">The Vetrine staff</h5>
                            </div>
                        </body>
                       
                        </html>`,
                };
                transporter.sendMail(mailOptions);
                let userData = await queryDb("select id, email, contact_name from users where email = " + con.escape(email))
                const jwtToken = jwt.sign({ userId: IDs }, secret, { expiresIn: "365d" });
                let updateQuery = "UPDATE users SET registration_token = " + con.escape(jwtToken) + " WHERE email = " + con.escape(email);
                let updateToken = await queryDb(updateQuery)
                console.log('jwt token ++++++++++++++++++', jwtToken)
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Registered Successfully, Please check your email and activate your account ",
                    data: userData[0],
                    jwtToken: jwtToken
                })
            }
        }
        }
    } catch (err) {
        res.send({
            'status': 400,
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        let data = req.body
        let emailQuery = "select * from users where email = " + con.escape(data.email)
        let checkEmail = await queryDb(emailQuery)
        if (checkEmail.length == 0) {
            console.log('121313131313')
            res.send({
                code: constant.ERROR_CODE,
                msg: "Email ID and password does not match"
            })
        } else {
            let id = checkEmail[0].id
            let checkPassword = await bcrypt.compare(req.body.password, checkEmail[0].password)
            if (!checkPassword) {
                console.log('fjahkdjfhjsdhfhsdjh')
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Email ID and password does not match"
                })
            } else {
                if (checkEmail[0].status == 1) {
                    const jwtToken = jwt.sign({ userId: checkEmail[0].id }, secret, { expiresIn: "365d" });
                    res.send({
                        code: constant.SUCCESS_CODE,
                        msg: "Logged in successfully",
                        'data': checkEmail[0],
                        'jwtToken': jwtToken
                    })
                } else {
                    var transporter = nodemailer.createTransport(config.smtp_data);
                    var mailOptions = {
                        from: config.from_email,
                        to: data.email,
                        subject: 'Your Vetrine Security Code',
                        html: `<!DOCTYPE html>
                    <html lang="en">
             
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                   
                    <body>
                        <div class="email-content" style="text-align: center;">
                            <p style="color: #000;">Here is your activation link to login to your Vetrine account.</p>
                            <a href="${config.base_url}/authchecker/${id}">
                              <button style=
                              "background-color: #d32f2f;
                              font-weight: 400;
                              font-size: 0.75rem;
                              line-height: 1.66;
                              letter-spacing: 0.03333em;
                              text-align: left;
                              margin-top: 3px;
                              margin-right: 14px;
                              margin-bottom: 0;
                              margin-left: 14px;
                              ">Activate Account</button>
                          </a>
                            <p style="color: #000;">Please click on button to activate account.</p>
                            <p style="color: #000;">From <span style="font-weight: bold;">Vetrine Support</span></p>
                        </div>
                    </body>
                   
                    </html>`,
                    };
                    transporter.sendMail(mailOptions);
                    const jwtToken = jwt.sign({ userId: checkEmail[0].id }, secret, { expiresIn: "365d" });
                    let updateQuery = "UPDATE users SET registration_token = " + con.escape(jwtToken) + " WHERE email = " + con.escape(checkEmail[0].email);
                    let updateToken = await queryDb(updateQuery)
                    res.send({
                        code: constant.SUCCESS_CODE,
                        msg: "Logged in successfully",
                        'data': checkEmail[0],
                        'jwtToken': jwtToken
                    })
                }
            }
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.sendOtp = async (req, res) => {
    try {
        let data = req.body
        let emailQuery = "select * from users where email = " + con.escape(data.email)
        let checkUser = await queryDb(emailQuery)
        if (checkUser.length == 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "User not found with this email ID"
            })
        } else {
            var otp = Math.random().toString(16).slice(2, 8);
            let updateQuery = "UPDATE users SET forgot_password_token = " + con.escape(otp) + " WHERE email = " + con.escape(data.email);
            let updateUser = await queryDb(updateQuery)
            if (!updateUser) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to send the OTP code , try again"
                })
            } else {
                // var transporter = nodemailer.createTransport(config.smtp_data);
                var transporter = nodemailer.createTransport({
                    service: config.smtp_data.service,
                    port:  config.smtp_data.port,
                    auth: {
                      user:  config.smtp_data.auth.user,
                      pass:  config.smtp_data.auth.pass,
                    },
                    tls: {
                      // do not fail on invalid certs
                      rejectUnauthorized: false,
                    },
                  });
                var mailOptions = {
                    from: config.from_email,
                    to: data.email,
                    subject: 'Your Vetrine Security Code',
                    html: `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Document</title>
                      </head>
                      <body>
                          <div class="email-content" style="text-align: center;">
                              <p style="color: #000;">Here is your security code to login to your Massimo account.</p>
                              <span style="background: #e7e7e7;
                              width: fit-content;
                              padding: 15px 40px;
                              font-size: 16px;
                              display: block;
                              margin:  20px auto;
                              font-weight: bold;
                              text-decoration: underline;">${otp}</span>
                              <p style="color: #000;">Please use the above code to verify the ownership of your account.</p>
                              <p style="color: #000;">From <span style="font-weight: bold;">Massimo Support</span></p>
                          </div>
                      </body>
                      </html>`,
                };
                transporter.sendMail(mailOptions);
                let updatedUser = await queryDb(emailQuery)
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Check your email for OTP",
                    'data': updatedUser[0]
                })
            }
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let data = req.body
        let emailQuery = "select * from users where forgot_password_token = " + con.escape(data.security_code)
        let findUser = await queryDb(emailQuery)
        if (findUser.length == 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to find the user"
            })
        } else {
            let hash = bcrypt.hashSync(data.password, 10);
            var password = hash
            let updatePassword = await queryDb("update users SET password = " + con.escape(password) + " where forgot_password_token = " + con.escape(data.security_code))
            if (!updatePassword) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to update the password"
                })
            } else {
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Password Updated Successully"
                })
            }
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.emailVerification = async (req, res) => {
    try {
        let data = req.body
        let checkStatus = await queryDb("select * from users where id = " + con.escape(req.body.id))
        if (checkStatus[0].length == 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to process your request, please try again"
            })
        } else {
            if (checkStatus[0].status == 1) {
                res.send({
                    msg: "This verification link is expired"
                })
            } else {
                let updateUser = await queryDb("UPDATE users SET status ='1' where id = " + con.escape(req.body.id))
                if (!updateUser) {
                    res.send({
                        code: constant.ERROR_CODE,
                        msg: "Not Verified"
                    })
                } else {
                    res.send({
                        code: constant.SUCCESS_CODE,
                        msg: "Email Verified",
                        jwtToken: checkStatus[0].registration_token
                    })
                }
            }
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.getUserTokenData = async (req, res) => {
    try {
        let data = req.body
        let userId = req.userId

        let getUserData = await queryDb("select * from users where id =" + con.escape(userId))
        if (getUserData.length == 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to find the user data"
            })
        } else {
            res.send({
                code: constant.SUCCESS_CODE,
                msg: "Success",
                'data': getUserData[0]
            })
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}
