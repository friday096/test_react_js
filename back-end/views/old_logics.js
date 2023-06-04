//.................................. Login controller ........................................//




// const express = require("express");
// var multer = require('multer');
// const databse = require('../../database/db')
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const constant = require('../../config/constant')
// var randtoken = require('rand-token').generator(); //for genrate random passwords
// const nodemailer = require('nodemailer');
// const EMAIL = require('../../config/config')
// var jwt = require('jsonwebtoken');
// var secret = "mySuperSecret"
// var uuid = require('uuid');
// const e = require("express");


// /////////////////////////////////// DB CONNECTIONS//////////////////////////////////////
// const con = mysql.createConnection({ //connect mySql Function
//     host: databse.host,
//     user: databse.user,
//     password: databse.password,
//     database: databse.database,
// });

// con.connect();

// function queryDb(query) {
//     return new Promise((resolve, reject) => {
//         con.query(query, (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(result);
//         });
//     })
// }




// ////////////////////////////////////// API's ////////////////////////
// exports.registration = async (req, res) => {
//     try {
//         let IDs = uuid.v1().toString()
//         let data = req.body
//         var id = IDs
//         var company_name = data.company_name;
//         var device_serial_id = data.serial_id;
//         var contact_name = data.contact_name;
//         var email = data.email;
//         var telephone = data.cell;
//         var password = bcrypt.hashSync(data.password, 10);
//         let checkEmail = await queryDb("select * from users where email = "  + con.escape( email ))
//         console.log('1111111111111111111')
//         if (checkEmail.length != 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Email ID is already exist"
//             })
//         } else {
//             let checkserialId = await queryDb("select * from users where device_serial_id = " + con.escape(device_serial_id ))
//         console.log('22222222222222')
//         // if (checkserialId.length == 0) {
//             //     res.send({
//             //         code: constant.ERROR_CODE,
//             //         msg: "Invalid Device Serial ID"
//             //     })
//             // } else {

//                 let insertQuery = "INSERT INTO `users` (`company_name`, `device_serial_id`, `email`, `password`,`contact_name`, `telephone`,`id`) VALUES  (" + con.escape(company_name) + ", " + con.escape(device_serial_id) + "," + con.escape(email) + ", " + con.escape(password) + ", " + con.escape(contact_name) + "," + con.escape(telephone) + "," + con.escape(id) + ");" ;
//                 let saveUser = await queryDb(insertQuery)
//         console.log('333333333333333')
//         if (!insertQuery) {
//                     res.send({
//                         code: constant.ERROR_CODE,
//                         msg: "Unable to save the data"
//                     })
//                 } else {
//                     var transporter = nodemailer.createTransport({
//                         service: 'gmail',
//                         port: 465,
//                         auth: {
//                             user: EMAIL.EMAIL,
//                             pass: EMAIL.PASSWORD
//                         },
//                         tls: {
//                             // do not fail on invalid certs
//                             rejectUnauthorized: false
//                         }
//                     });
//                     var mailOptions = {
//                         from: 'anil@codenomad.net',
//                         to: data.email,
//                         subject: 'Your Vetrine Security Code',
//                         html: `<!DOCTYPE html>
//                         <html lang="en">
                       
//                         <head>
//                             <meta charset="UTF-8">
//                             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                             <title>Vetrine.com</title>
//                         </head>
                       
//                         <body>
//                             <div class="email-content" style="max-width: 500px;margin: auto;background: #f7f8fb;border: 1px solid #d6d6d6;
//                             padding: 20px;">
//                               <div class="logo"style="text-align:center;">
//                                   <h3>Vetrine.com</h3>
//                               </div>
//                                <h5 style="font-family: 'arial','helvetica',sans-serif;font-size: 24px;line-height: 32px;margin: 0;
//                                color: #3c4858;">Your account is almost ready</h5>
//                                 <a href="http://localhost:8080/authchecker/${id}" style="text-decoration: none;border-radius: 4px; background-color: #f9423a; margin-top:30px; display: inline-block; padding: 0px 16px; ">
//                                   <p style="height: 40px; line-height: 40px;text-align: center;color: #ffffff;font-size: 16px; background-color: #f9423a; margin: 0;">Confirm Email</p>
//                               </a>
//                               <h5 class=""style="font-size: 16px;line-height: 24px;color: #3c4858;font-weight: 500">Don't be too late, this email will be valid for 48 hours.</h5>
//                                 <p style="color: #717e8f;font-size: 14px;line-height: 21px;margin: 0px;">This email is automatically generated.</p>
//                                 <p style="color: #717e8f;font-size: 14px;line-height: 21px;margin: 0px;">If you need help registering please <a href="#"class="contact"style="text-decoration: none;
//                                   color: #717e8f;">contact us.</a></p>
//                                 <h5 class=""style="border-collapse: collapse; font-family: 'arial','helvetica',sans-serif; font-size: 16px; line-height: 24px; color: #3c4858; font-weight: 500">The Vetrine staff</h5>
//                             </div>
//                         </body>
                       
//                         </html>`,
//                         //   body: answer
//                     };
//                     transporter.sendMail(mailOptions);
//                     let userData = await queryDb("select id, email, contact_name from users where email = " + con.escape(email) )
//                     const jwtToken = jwt.sign({ userId: IDs }, secret, { expiresIn: "365d" });
//                     let updateQuery = "UPDATE users SET registration_token = " + con.escape(jwtToken) + " WHERE email = " + con.escape(email) ;
//                     let updateToken = await queryDb(updateQuery)
//                     console.log('jwt token ++++++++++++++++++',jwtToken)
//                     res.send({
//                         code: constant.SUCCESS_CODE,
//                         msg: "Registered Successfully, Please check your email and activate your account ",
//                         'data': userData[0],
//                         "jwtToken": jwtToken
//                     })
//                 }
//             // }
//         }
//     } catch (err) {
//         res.send({
//             'status': 400,
//             message: err.message
//         })
//     }
// }

// exports.login = async (req, res) => {
//     try {
//         let data = req.body
//         let emailQuery = "select * from users where email = " +con.escape( data.email )
//         let checkEmail = await queryDb(emailQuery)
//         if (checkEmail.length == 0) {
//                 console.log('121313131313')
//                 res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Email ID and password does not match"
//             })
//         } else {
//         let id = checkEmail[0].id
//             let checkPassword = await bcrypt.compare(req.body.password, checkEmail[0].password)
//             if (!checkPassword) {
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Email ID and password does not match"
//                 })
//             } else {
//                 if (checkEmail[0].status == 1) {
//                     const jwtToken = jwt.sign({ userId: checkEmail[0].id }, secret, { expiresIn: "365d" });
//                     res.send({
//                         code: constant.SUCCESS_CODE,
//                         msg: "Logged in successfully",
//                         'data': checkEmail[0],
//                         'jwtToken': jwtToken
//                     })
//                 } else {
//                     var transporter = nodemailer.createTransport({
//                         service: 'gmail',
//                         port: 465,
//                         auth: {
//                             user: EMAIL.EMAIL,
//                             pass: EMAIL.PASSWORD
//                         },
//                         tls: {
//                             // do not fail on invalid certs
//                             rejectUnauthorized: false
//                         }
//                     });
//                     var mailOptions = {
//                         from: 'anil@codenomad.net',
//                         to: data.email,
//                         subject: 'Your Vetrine Security Code',
//                         html: `<!DOCTYPE html>
//                     <html lang="en">
             
//                     <head>
//                         <meta charset="UTF-8">
//                         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                         <title>Document</title>
//                     </head>
                   
//                     <body>
//                         <div class="email-content" style="text-align: center;">
//                             <p style="color: #000;">Here is your activation link to login to your Vetrine account.</p>
//                             <a href="http://localhost:8080/authchecker/${id}">
//                               <button style=
//                               "background-color: #d32f2f;
//                               font-weight: 400;
//                               font-size: 0.75rem;
//                               line-height: 1.66;
//                               letter-spacing: 0.03333em;
//                               text-align: left;
//                               margin-top: 3px;
//                               margin-right: 14px;
//                               margin-bottom: 0;
//                               margin-left: 14px;
//                               ">Activate Account</button>
//                           </a>
//                             <p style="color: #000;">Please click on button to activate account.</p>
//                             <p style="color: #000;">From <span style="font-weight: bold;">Vetrine Support</span></p>
//                         </div>
//                     </body>
                   
//                     </html>`,
//                     };
//                     transporter.sendMail(mailOptions);
//                     const jwtToken = jwt.sign({ userId: checkEmail[0].id }, secret, { expiresIn: "365d" });
//                     let updateQuery = "UPDATE users SET registration_token = " + con.escape(jwtToken) + " WHERE email = " + con.escape(checkEmail[0].email);
//                     let updateToken = await queryDb(updateQuery)
//                     res.send({
//                         code: constant.SUCCESS_CODE,
//                         msg: "Logged in successfully",
//                         'data': checkEmail[0],
//                         'jwtToken': jwtToken
//                     })
//                 }
//             }
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.sendOtp = async (req, res) => {
//     try {
//         let data = req.body
//         let emailQuery = "select * from users where email = " + con.escape(data.email)
//         let checkUser = await queryDb(emailQuery)
//         if (checkUser.length == 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "User not found with this email ID"
//             })
//         } else {
//             // const verify_code = Math.random().toString(16).slice(2, 8);
//             // console.log(verify_code, 'verify_code')
//             var otp = Math.random().toString(16).slice(2, 8);
//             let updateQuery = "UPDATE users SET forgot_password_token = " + con.escape(otp) + " WHERE email = " + con.escape(data.email) ;
//             let updateUser = await queryDb(updateQuery)
//             if (!updateUser) {
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Unable to send the OTP code , try again"
//                 })
//             } else {
//                 var transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     port: 465,
//                     auth: {
//                         user: EMAIL.EMAIL,
//                         pass: EMAIL.PASSWORD
//                     },
//                     tls: {
//                         // do not fail on invalid certs
//                         rejectUnauthorized: false
//                     }
//                 });
//                 var mailOptions = {
//                     from: 'anil@codenomad.net',
//                     to: data.email,
//                     subject: 'Your Vetrine Security Code',
//                     html: `<!DOCTYPE html>
//                       <html lang="en">

//                       <head>
//                           <meta charset="UTF-8">
//                           <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                           <title>Document</title>
//                       </head>

//                       <body>
//                           <div class="email-content" style="text-align: center;">
//                               <p style="color: #000;">Here is your security code to login to your Massimo account.</p>
//                               <span style="background: #e7e7e7;
//                               width: fit-content;
//                               padding: 15px 40px;
//                               font-size: 16px;
//                               display: block;
//                               margin:  20px auto;
//                               font-weight: bold;
//                               text-decoration: underline;">${otp}</span>
//                               <p style="color: #000;">Please use the above code to verify the ownership of your account.</p>
//                               <p style="color: #000;">From <span style="font-weight: bold;">Massimo Support</span></p>
//                           </div>
//                       </body>

//                       </html>`,
//                     //   body: answer
//                 };
//                 transporter.sendMail(mailOptions);
//                 let updatedUser = await queryDb(emailQuery)
//                 res.send({
//                     code: constant.SUCCESS_CODE,
//                     msg: "Check your email for OTP",
//                     'data': updatedUser[0]
//                 })
//             }
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.forgotPassword = async (req, res) => {
//     try {
//         let data = req.body
//         let emailQuery = "select * from users where forgot_password_token = " + con.escape(data.security_code) 
//         let findUser = await queryDb(emailQuery)
//         if (findUser.length == 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to find the user"
//             })
//         } else {
//             // if (findUser[0].forgot_password_token != data.otp) {
//             //     res.send({
//             //         code: constant.ERROR_CODE,
//             //         msg: "Invalid OTP"
//             //     })
//             // } else {
//                 let hash = bcrypt.hashSync(data.password, 10);
//                 var password = hash
//                 let updatePassword = await queryDb("update users SET password = " + con.escape(password) + " where forgot_password_token = " + con.escape(data.security_code) )
//                 if (!updatePassword) {
//                     res.send({
//                         code: constant.ERROR_CODE,
//                         msg: "Unable to update the password"
//                     })
//                 } else {
//                     res.send({
//                         code: constant.SUCCESS_CODE,
//                         msg: "Password Updated Successully"
//                     })
//                 }
//             // }
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.emailVerification = async (req, res) => {
//     try {
//         let data = req.body
//         let checkStatus = await queryDb("select * from users where id = " + con.escape(req.body.id) )
//         if (checkStatus[0].length == 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to process your request, please try again"
//             })
//         } else {
//             if (checkStatus[0].status == 1) {
//                 res.send({
//                     msg: "This verification link is expired"
//                 })
//             } else {
//                 let updateUser = await queryDb("UPDATE users SET status ='1' where id = " + con.escape(req.body.id) )
//                 if (!updateUser) {
//                     res.send({
//                         code: constant.ERROR_CODE,
//                         msg: "Not Verified"
//                     })
//                 } else {
//                     res.send({
//                         code: constant.SUCCESS_CODE,
//                         msg: "Email Verified",
//                         jwtToken: checkStatus[0].registration_token
//                     })
//                 }
//             }
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.getUserTokenData = async (req, res) => {
//     try {


//         let data = req.body
//         let userId = req.userId

//         let getUserData = await queryDb("select * from users where id =" + con.escape(userId) )
//         if (getUserData.length == 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to find the user data"
//             })
//         } else {
//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 msg: "Success",
//                 'data': getUserData[0]
//             })
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }



let x =0


//.................................. Project controller ........................................//



// var multer = require('multer');
// const path = require('path')
// const mysql = require('mysql');
// const constant = require('../../config/constant')
// const nodemailer = require('nodemailer');
// const EMAIL = require('../../config/config')
// const database = require('../../database/db')
// var uuid = require('uuid')
// var moment = require('moment');




// /////////////////////////////////// DB CONNECTIONS//////////////////////////////////////
// const con = mysql.createConnection({ //connect mySql Function
//     host: database.host,
//     user: database.user,
//     password: database.password,
//     database: database.database,
// });

// con.connect();

// function queryDb(query) {
//     return new Promise((resolve, reject) => {
//         con.query(query, (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(result);
//         });
//     })
// }

// /////////////////////////////// PROJECT API's ///////////////////////////////////////

// exports.addProject = async (req, res) => {
//     console.log('api running ++++++++++++++++++++++++++++++++')
//     try {
//         let Data = req.body
//         const INTERVALS = [];
//         let getDate = new Date()
//         let tdate = getDate.getDate();
//         let month = getDate.getMonth() + 1;
//         let year = getDate.getFullYear();
//         let check = (year + "-" + month + "-" + tdate).toLocaleString(undefined, {
//             timeZone: 'Asia/Kolkata'
//         });
//         let templates = Data.templates
//         var sum = 0;



//         /////////////////////////////// ADD PROJECT CODES ///////////////////////////////////////
//         let projectId = uuid.v1().toString()
//         var project_name = Data.project_name
//         var date = check
//         var id = projectId
//         var user_id = req.userId
//         console.log('sjdfkhdfkhskldfhkls')
//         let insertProjectQuery = "INSERT into `projects`(`project_name`,`id`, `user_id`,`created_at`) VALUES (" + con.escape(project_name) + "," + con.escape(id) + "," + con.escape(user_id) + " ," + con.escape(check) + " )"
//         let saveProject = await queryDb(insertProjectQuery)
//         /////////////////////////////// ADD TEMPLATES CODES ///////////////////////////////////////
//         for (let i = 0; i < templates.length; i++) {
//             let item = templates[i];
//             var start_time = item.start_time
//             var end_time = item.end_time
//             var speed = item.item_speed ? item.item_speed : 'NORMAL'
//             var temp_value = item.temp_value
//             var logo_image = item.logo_image
//             var call_to_action_image = item.call_to_action_image
//             let id = uuid.v1().toString()
//             var project_id = projectId
//             var data = JSON.stringify(item.data_items)
//             let insertQuery = "INSERT INTO `project_templates` ( `start_time`, `end_time`, `speed`,`logo_image`,`project_id`,`id`, `data`,`temp_value`,`call_to_action_image`) VALUES ( " + con.escape(start_time) + ", " + con.escape(end_time) + ", " + con.escape(speed) + "," + con.escape(logo_image) + "," + con.escape(project_id) + "," + con.escape(id) + "," + con.escape(data) + "," + con.escape(temp_value) + "," + con.escape(call_to_action_image) + ");";
//             let saveTemplate = await queryDb(insertQuery)
//         }
//         res.send({
//             code: constant.SUCCESS_CODE,
//             msg: "Project Add Successfully"
//         })
//         return
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.checkTemplateDateTime = async (req, res) => {
//     try {
//         let Data = req.body
//         ////////////////////////////////// Dates Check ////////////////////////////////////////////
//         let getDate = new Date()
//         let tdate = getDate.getDate();
//         let month = getDate.getMonth() + 1;
//         let year = getDate.getFullYear();
//         let check = (year + "-" + month + "-" + tdate).toLocaleString(undefined, {
//             timeZone: 'Asia/Kolkata'
//         });
//         let checkQuery = "select * from projects where created_at = " + con.escape(check) + "and user_id = " + con.escape(req.userId) 
//         let checkProject = await queryDb(checkQuery)
//         if (checkProject.length != 0) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "You already added a project on this same date"
//             })
//         } else {
//             let templates = Data.templates

//             var sum = 0;
//             for (let index in templates) {

//                 let current_start = new Date(`${check} ${templates[index].start_time}`);
//                 let current_end = new Date(`${check} ${templates[index].end_time}`);

//                 function diff_hours(dt2, dt1) {

//                     var diff = (dt2.getTime() - dt1.getTime()) / 1000;
//                     diff /= (60 * 60);
//                     return Math.abs(Math.round(diff));

//                 }
//                 sum += diff_hours(current_start, current_end)
//                 console.log(current_start, current_end, sum, getDate)



//                 for (let inner_index in templates) {

//                     let check_from = new Date(`${check} ${templates[inner_index].start_time}`);
//                     let check_to = new Date(`${check} ${templates[inner_index].end_time}`);

//                     if (index != inner_index) {
//                         console.log('index------', index, inner_index)
//                         if (check_from < current_start && check_to > current_start || check_from < current_end && check_to > current_start) {
//                             console.log('yes conflicting------')
//                             res.send({
//                                 code: constant.ERROR_CODE,
//                                 msg: "Please check your times"
//                             })

//                         }
//                     }
//                 }
//             }
//             if (sum == 24) {
//                 res.send({
//                     code: constant.SUCCESS_CODE,
//                     msg: "Your Booking Complete 24 hours. Please click on generate Button to confirm"
//                 })
//             } else {
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Please make sure your templates is completing the min 24 hours"
//                 })
//             }
//             return
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.checkEditTemplateDateTime = async (req, res) => {
//     try {
//         let Data = req.body
//         // const INTERVALS = [];
//         ////////////////////////////////// Dates Check ////////////////////////////////////////////
//         let getDate = new Date()
//         let tdate = getDate.getDate();
//         let month = getDate.getMonth() + 1;
//         let year = getDate.getFullYear();
//         let check = (year + "-" + month + "-" + tdate).toLocaleString(undefined, {
//             timeZone: 'Asia/Kolkata'
//         });
//         let checkQuery = "select * from projects where created_at = " + con.escape(check) + " and user_id = " + con.escape(req.userId) + ""
//         let checkProject = await queryDb(checkQuery)
//         // if (checkProject.length != 0) {
//         // res.send({
//         // code: constant.ERROR_CODE,
//         // msg: "You already added a project on this same date"
//         // })
//         // } else {
//         let templates = Data.templates

//         // console.log('templates---', templates)
//         var sum = 0;
//         for (let index in templates) {

//             let current_start = new Date(`${check} ${templates[index].start_time}`);
//             let current_end = new Date(`${check} ${templates[index].end_time}`);

//             function diff_hours(dt2, dt1) {

//                 var diff = (dt2.getTime() - dt1.getTime()) / 1000;
//                 diff /= (60 * 60);
//                 return Math.abs(Math.round(diff));

//             }
//             sum += diff_hours(current_start, current_end)
//             // INTERVALS.push(diff_hours(current_start, current_end))
//             // let ab = diff_hours(current_start, current_end)



//             for (let inner_index in templates) {

//                 let check_from = new Date(`${check} ${templates[inner_index].start_time}`);
//                 let check_to = new Date(`${check} ${templates[inner_index].end_time}`);

//                 if (index != inner_index) {
//                     console.log('index------', index, inner_index)
//                     if (check_from < current_start && check_to > current_start || check_from < current_end && check_to > current_start) {
//                         console.log('yes conflicting------')
//                         res.send({
//                             code: constant.ERROR_CODE,
//                             msg: "Please check your times"
//                         })

//                     }
//                 }
//             }
//         }
//         console.log('adding data +++++++++++++++++', sum)
//         if (sum == 24) {
//             /////////////////////////////// ADD PROJECT CODES ///////////////////////////////////////
//             // let projectId = uuid.v1().toString()
//             // var project_name = Data.project_name
//             // var date = check
//             // var id = projectId
//             // var user_id = req.userId
//             // let insertProjectQuery = "INSERT into `projects`(`project_name`,`id`, `user_id`,`date`) VALUES ('" + project_name + "','" + id + "','" + user_id + "' ,'" + date + "' )"
//             // let saveProject = await queryDb(insertProjectQuery)
//             /////////////////////////////// ADD TEMPLATES CODES ///////////////////////////////////////
//             // let templates = Data.templates

//             // for (let i = 0; i < templates.length; i++) {
//             // let item = templates[i];
//             // // var start_time = item.start_time
//             // // var end_time = item.start_time
//             // // var speed = item.item_speed
//             // // var logo_image = item.upload_logo
//             // // let id = uuid.v1().toString()
//             // // var project_id = projectId
//             // // var data = JSON.stringify(item.data_items)
//             // // dt1 = new Date("October 13, 2014 08:11:00");
//             // // dt2 = new Date("October 13, 2014 11:13:00");

//             // // let insertQuery = "INSERT INTO `project_templates` ( `start_time`, `end_time`, `speed`,`logo_image`,`project_id`,`id`, `data`) VALUES ( '" + start_time + "', '" + end_time + "', '" + speed + "','" + logo_image + "','" + project_id + "','" + id + "','" + data + "');";
//             // // let saveTemplate = await queryDb(insertQuery)

//             // }
//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 msg: "Your Booking Complete 24 hours. Please click on generate Button to confirm"
//             })
//         } else {

//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Please make sure your templates is completing the min 24 hours"
//             })
//         }
//         return


//         // res.send({
//         // code: constant.SUCCESS_CODE,
//         // msg: "updated"
//         // })
//         // }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.getProject = async (req, res) => {
//     try {
//         console.log('userId======================', req.userId)
//         let data = req.body
//         let today = Date.now();
//         let getDate = new Date(today);
//         let tdate = getDate.getDate();
//         let month = getDate.getMonth();
//         let year = getDate.getFullYear();
//         let check = year + "-" + month + "-" + tdate
//         let checkQuery = "select * from projects where user_id = " + con.escape( req.userId )
//         let checkProject = await queryDb(checkQuery)
//         console.log('project data++++++++++++++++++=', checkQuery)
//         if (checkProject) {
//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 'data': checkProject
//             })
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.deleteProject = async (req, res) => {
//     try {
//         let data = req.params
//         let deleteQuery = "DELETE FROM projects WHERE id = " + con.escape(data.project_id) 
//         let deleteProject = await queryDb(deleteQuery)
//         if (!deleteProject) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to delete the project"
//             })
//         } else {
//             let templateQuery = "DELETE FROM project_templates WHERE project_id = " + con.escape(data.project_id)
//             let checkAndRemoveTemlate = await queryDb(templateQuery)
//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 msg: "Deleted successfully"
//             })
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.updateProject = async (req, res) => {
//     try {
//         let Data = req.body
//         let templates = Data.templates
//         ////////////////////////////////// Dates Check ////////////////////////////////////////////
//         let getDate = new Date();
//         let tdate = getDate.getDate() + 1;
//         let month = getDate.getMonth() + 1;
//         let year = getDate.getFullYear();
//         let check = year + "-" + month + "-" + tdate
//         let checkQuery = "select * from projects where created_at = " + con.escape(check) + "and user_id = " + con.escape(req.userId) + ""
//         let checkProject = await queryDb(checkQuery)
//         let udpateQuery = "UPDATE projects SET project_name = " + con.escape(Data.project_name) + ", date = " + con.escape(check) + " where id = " + con.escape(Data.projectId)
//         let updateProject = await queryDb(udpateQuery)

//         let clearTemplateData = await queryDb("DELETE FROM `project_templates` WHERE project_id = " + con.escape(Data.projectId))
//         for (let i = 0; i < templates.length; i++) {
//             let item = templates[i];

//             var start_time = item.start_time
//             var end_time = item.end_time
//             var speed = item.item_speed ? item.item_speed : 'NORMAL'
//             var temp_value = item.temp_value
//             var logo_image = item.logo_image
//             var call_to_action_image = item.call_to_action_image
//             let id = uuid.v1().toString()
//             var project_id = Data.projectId
//             var data = JSON.stringify(item.data_items)
//             let insertQuery = "INSERT INTO `project_templates` ( `start_time`, `end_time`, `speed`,`logo_image`,`project_id`,`id`, `data`,`temp_value`,`call_to_action_image`) VALUES ( " + con.escape(start_time) + ", " + con.escape(end_time) + ", " + con.escape(speed) + "," + con.escape(logo_image) + "," + con.escape(project_id) + "," + con.escape(id) + "," + con.escape(data) + "," + con.escape(temp_value) + "," + con.escape(call_to_action_image) + ");";
//             let saveTemplate = await queryDb(insertQuery)

//             if (!saveTemplate) {
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Unable to update the data"
//                 })
//             }
//         }
//         res.send({
//             code: constant.SUCCESS_CODE,
//             msg: "Updated Successfully"
//         })
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// /////////////////////////////// TEMPLATE API's ///////////////////////////////////////

// exports.editProjectTemp = async (req, res) => {
//     try {
//         let data = req.body
//         let project_id = data.project_id
//         let projectQuery = "select * from projects where id = '" + project_id + "'"
//         let getProjectData = await queryDb(projectQuery)
//         console.log(getProjectData)
//         let templatesQuery = ("select start_time,end_time,speed,logo_image,call_to_action_image,id,data,temp_value,created_at from project_templates where project_id = " + con.escape(data.project_id) )
//         let getTemplateData = await queryDb(templatesQuery)
//         if (!getProjectData) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to get project"
//             })
//         } else {
//             let project_name = getProjectData[0].project_name
//             let project_date = getProjectData[0].date
//             let projectId = getProjectData[0].id
//             let templates = getTemplateData


//             updatedarry = templates.map(item => {
//                 return {
//                     ...item,
//                     item_speed: item.speed,
//                     data_items: item.data
//                 };
//             }); //Rename Keys

//             updatedarry.forEach(object => {
//                 delete object['speed'];
//             }); //Delete Keys
//             templates = updatedarry


//             for (let i = 0; i < templates.length; i++) {

//                 if (templates[i].data) {
//                     templates[i].data_items = JSON.parse(templates[i].data_items)
//                 }

//             }


//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 msg: "Success",
//                 data: {
//                     project_name,
//                     project_date,
//                     projectId,
//                     templates
//                 }
//             })
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// exports.deleteTemplate = async (req, res) => {
//     try {
//         let data = req.params
//         let deleteQuery = "DELETE from project_templates WHERE id = " + con.escape(data.template_id) ;
//         let deleteTemplate = await queryDb(deleteQuery)
//         if (!deleteTemplate) {
//             res.send({
//                 code: constant.ERROR_CODE,
//                 msg: "Unable to delete the template"
//             })
//         } else {
//             res.send({
//                 code: constant.SUCCESS_CODE,
//                 msg: "Project Deleted Successfully"
//             })
//         }
//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message
//         })
//     }
// }

// var Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../../uploads/template_image'));
//     },
//     filename: function (req, file, cb) {
//         console.log('file++++++++++', file)
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// var upload = multer({
//     storage: Storage,
//     limits: {
//         fileSize: '100M'
//     }
// }).single("file")


// exports.uploadTemplateImage = async (req, res) => {
//     try {
//         upload(req, res, async (err) => {
//             let file = req.file
//             if (err) {
//                 console.error(err)
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Unable to upload the image"
//                 })
//             } else {
//                 res.send({
//                     code: constant.SUCCESS_CODE,
//                     msg: "Uploaded",
//                     data: file.filename
//                 })
//             }
//         })

//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message,

//         })
//     }
// }

// var callToActionImage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../../uploads/template_image'));
//     },
//     filename: function (req, file, cb) {
//         console.log('file++++++++++', file)
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// var uploadActionImage = multer({
//     storage: callToActionImage,
//     limits: {
//         fileSize: '100M'
//     }
// }).single("action_image")


// exports.upload_call_to_action_image = async (req, res) => {
//     try {
//         uploadActionImage(req, res, async (err) => {
//             let file = req.file
//             if (err) {
//                 console.error(err)
//                 res.send({
//                     code: constant.ERROR_CODE,
//                     msg: "Unable to upload the image"
//                 })
//             } else {
//                 res.send({
//                     code: constant.SUCCESS_CODE,
//                     msg: "Uploaded",
//                     data: file.filename
//                 })
//             }
//         })

//     } catch (err) {
//         res.send({
//             code: constant.ERROR_CODE,
//             msg: err.message,

//         })
//     }
// }


